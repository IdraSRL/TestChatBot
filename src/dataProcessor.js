export class DataProcessor {
    constructor(data) {
        this.data = data;
        this.searchableFields = this.buildSearchableFields();
        this.apartmentIndex = this.buildApartmentIndex();
    }

    buildApartmentIndex() {
        const index = new Map();
        
        // Index all apartments from different sections
        const apartmentSections = ['irene', 'cerrano', 'lorenza', 'molino'];
        
        apartmentSections.forEach(section => {
            const sectionData = this.data[section];
            if (sectionData && sectionData[section]) {
                sectionData[section].forEach(apartment => {
                    if (apartment.nome) {
                        const normalizedName = apartment.nome.toLowerCase()
                            .replace(/[_\s-]/g, '')
                            .replace(/le_mura/g, 'lemura')
                            .replace(/casa_di_rosa/g, 'casadirosa')
                            .replace(/casa_lia/g, 'casalia');
                        
                        index.set(normalizedName, {
                            ...apartment,
                            section: section,
                            searchTerms: this.generateSearchTerms(apartment)
                        });
                        
                        // Also index by original name
                        index.set(apartment.nome.toLowerCase(), {
                            ...apartment,
                            section: section,
                            searchTerms: this.generateSearchTerms(apartment)
                        });
                    }
                });
            }
        });

        // Also index apartments from the general apartments list
        if (this.data.appartamenti && this.data.appartamenti.appartamenti) {
            this.data.appartamenti.appartamenti.forEach(apartment => {
                if (apartment.name) {
                    const normalizedName = apartment.name.toLowerCase()
                        .replace(/[_\s-]/g, '')
                        .replace(/le_mura/g, 'lemura');
                    
                    index.set(normalizedName, {
                        ...apartment,
                        nome: apartment.name,
                        section: 'appartamenti',
                        searchTerms: this.generateSearchTerms(apartment)
                    });
                }
            });
        }

        return index;
    }

    generateSearchTerms(apartment) {
        const terms = [];
        
        // Add name variations
        if (apartment.nome) {
            terms.push(apartment.nome.toLowerCase());
            terms.push(apartment.nome.toLowerCase().replace(/[_\s-]/g, ''));
        }
        if (apartment.name) {
            terms.push(apartment.name.toLowerCase());
            terms.push(apartment.name.toLowerCase().replace(/[_\s-]/g, ''));
        }
        
        // Add address terms
        if (apartment.indirizzo) {
            const addressWords = apartment.indirizzo.toLowerCase().split(/[\s,]+/);
            terms.push(...addressWords.filter(word => word.length > 2));
        }
        
        // Add note terms for keybox searches
        if (apartment.note && Array.isArray(apartment.note)) {
            apartment.note.forEach(note => {
                if (typeof note === 'string') {
                    const noteWords = note.toLowerCase().split(/[\s:,]+/);
                    terms.push(...noteWords.filter(word => word.length > 1));
                }
            });
        }
        
        return [...new Set(terms)];
    }

    buildSearchableFields() {
        const fields = [];
        
        // Process all data sections
        Object.keys(this.data).forEach(section => {
            const sectionData = this.data[section];
            
            if (Array.isArray(sectionData)) {
                sectionData.forEach((item, index) => {
                    this.extractSearchableText(item, section, index, fields);
                });
            } else if (typeof sectionData === 'object') {
                Object.keys(sectionData).forEach(key => {
                    if (Array.isArray(sectionData[key])) {
                        sectionData[key].forEach((item, index) => {
                            this.extractSearchableText(item, `${section}.${key}`, index, fields);
                        });
                    } else {
                        this.extractSearchableText(sectionData[key], `${section}.${key}`, 0, fields);
                    }
                });
            }
        });
        
        return fields;
    }

    extractSearchableText(item, section, index, fields) {
        if (typeof item === 'object' && item !== null) {
            Object.keys(item).forEach(key => {
                const value = item[key];
                if (typeof value === 'string' || typeof value === 'number') {
                    fields.push({
                        section,
                        index,
                        field: key,
                        value: value.toString().toLowerCase(),
                        originalItem: item
                    });
                } else if (Array.isArray(value)) {
                    // Handle arrays (like notes)
                    value.forEach((arrayItem, arrayIndex) => {
                        if (typeof arrayItem === 'string') {
                            fields.push({
                                section,
                                index,
                                field: `${key}[${arrayIndex}]`,
                                value: arrayItem.toLowerCase(),
                                originalItem: item
                            });
                        }
                    });
                }
            });
        }
    }

    findRelevantData(query) {
        const queryLower = query.toLowerCase();
        const keywords = this.extractKeywords(queryLower);
        
        // Special handling for apartment-specific queries
        const apartmentQuery = this.findApartmentSpecificData(queryLower, keywords);
        if (apartmentQuery.matches.length > 0) {
            return apartmentQuery;
        }

        // General search
        const relevantSections = new Set();
        const matchedItems = [];

        // Find matching items based on keywords
        keywords.forEach(keyword => {
            this.searchableFields.forEach(field => {
                if (field.value.includes(keyword)) {
                    relevantSections.add(field.section);
                    matchedItems.push(field.originalItem);
                }
            });
        });

        // If no specific matches, try broader search
        if (matchedItems.length === 0) {
            return this.getBroadSearchResults(queryLower);
        }

        // Remove duplicates
        const uniqueItems = matchedItems.filter((item, index, self) => 
            index === self.findIndex(i => JSON.stringify(i) === JSON.stringify(item))
        );

        return {
            query: query,
            matches: uniqueItems.slice(0, 10),
            sections: Array.from(relevantSections)
        };
    }

    findApartmentSpecificData(queryLower, keywords) {
        const matches = [];
        
        // Look for apartment names in the query
        for (const [apartmentKey, apartmentData] of this.apartmentIndex) {
            // Check if any search terms match
            const queryWords = queryLower.split(/\s+/);
            const hasMatch = queryWords.some(word => {
                return apartmentData.searchTerms.some(term => 
                    term.includes(word) || word.includes(term)
                );
            });

            if (hasMatch) {
                // Check what specific information is being requested
                if (queryLower.includes('keybox') || queryLower.includes('codice')) {
                    // Extract keybox information
                    const keyboxInfo = this.extractKeyboxInfo(apartmentData);
                    if (keyboxInfo) {
                        matches.push({
                            ...apartmentData,
                            specificInfo: 'keybox',
                            keyboxData: keyboxInfo
                        });
                    }
                } else if (queryLower.includes('indirizzo') || queryLower.includes('address')) {
                    matches.push({
                        ...apartmentData,
                        specificInfo: 'indirizzo'
                    });
                } else if (queryLower.includes('minuti') || queryLower.includes('ore') || queryLower.includes('tempo')) {
                    matches.push({
                        ...apartmentData,
                        specificInfo: 'tempo'
                    });
                } else {
                    // Return full apartment info
                    matches.push(apartmentData);
                }
                break; // Found the apartment, no need to continue
            }
        }

        return {
            query: queryLower,
            matches: matches,
            sections: matches.map(m => m.section),
            isApartmentSpecific: true
        };
    }

    extractKeyboxInfo(apartment) {
        const keyboxInfo = [];
        
        if (apartment.note && Array.isArray(apartment.note)) {
            apartment.note.forEach(note => {
                if (typeof note === 'string') {
                    const noteLower = note.toLowerCase();
                    if (noteLower.includes('keybox') || noteLower.includes('key box')) {
                        keyboxInfo.push(note);
                    }
                }
            });
        }
        
        return keyboxInfo.length > 0 ? keyboxInfo : null;
    }

    extractKeywords(query) {
        // Enhanced term mappings
        const termMappings = {
            'allarme': ['alarm', 'code'],
            'indirizzo': ['indirizzo', 'address', 'via', 'piazza'],
            'dipendente': ['employee', 'name'],
            'appartamento': ['appartament', 'nome', 'casa', 'flat'],
            'minuti': ['minutes', 'ore', 'tempo', 'time'],
            'ufficio': ['office', 'name'],
            'keybox': ['keybox', 'key', 'codice', 'cassetta'],
            'codice': ['code', 'codice', 'password'],
            'password': ['password'],
            'mura': ['mura', 'le_mura', 'lemura'],
            'torre': ['torre'],
            'casa': ['casa'],
            'alessandro': ['alessandro', 'resti'],
            'anna': ['anna'],
            'pisa': ['pisa'],
            'cascina': ['cascina'],
            'navacchio': ['navacchio'],
            'cisanello': ['cisanello'],
            'ghezzano': ['ghezzano']
        };

        let keywords = [];
        
        // Extract direct keywords
        const words = query.split(/\s+/).filter(word => word.length > 1);
        keywords.push(...words);

        // Add mapped terms
        Object.keys(termMappings).forEach(key => {
            if (query.includes(key)) {
                keywords.push(...termMappings[key]);
            }
        });

        return [...new Set(keywords)];
    }

    getBroadSearchResults(query) {
        // Enhanced broad search with better categorization
        if (query.includes('allarme') || query.includes('alarm')) {
            return {
                query: query,
                matches: [
                    ...(this.data.alarm_general?.alarm_general || []),
                    ...(this.data.alarm_acli?.alarm_acli || [])
                ],
                sections: ['alarm_general', 'alarm_acli']
            };
        }

        if (query.includes('appartamento') || query.includes('indirizzo') || query.includes('keybox')) {
            return {
                query: query,
                matches: [
                    ...(this.data.irene?.irene || []),
                    ...(this.data.cerrano?.cerrano || []),
                    ...(this.data.lorenza?.lorenza || []),
                    ...(this.data.molino?.molino || [])
                ].slice(0, 8),
                sections: ['irene', 'cerrano', 'lorenza', 'molino']
            };
        }

        if (query.includes('dipendente') || query.includes('employee')) {
            return {
                query: query,
                matches: this.data.employees?.employees || [],
                sections: ['employees']
            };
        }

        if (query.includes('ufficio') || query.includes('office')) {
            return {
                query: query,
                matches: this.data.uffici?.uffici || [],
                sections: ['uffici']
            };
        }

        // Default: return a sample from each major section
        return {
            query: query,
            matches: [
                ...(this.data.alarm_general?.alarm_general?.slice(0, 2) || []),
                ...(this.data.employees?.employees?.slice(0, 2) || []),
                ...(this.data.irene?.irene?.slice(0, 2) || [])
            ],
            sections: ['general_info']
        };
    }
}