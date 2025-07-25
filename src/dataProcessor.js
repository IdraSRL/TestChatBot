export class DataProcessor {
    constructor(data) {
        this.data = data;
        this.searchableFields = this.buildSearchableFields();
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
                }
            });
        }
    }

    findRelevantData(query) {
        const queryLower = query.toLowerCase();
        const keywords = this.extractKeywords(queryLower);
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
            matches: uniqueItems.slice(0, 10), // Limit to 10 items to save tokens
            sections: Array.from(relevantSections)
        };
    }

    extractKeywords(query) {
        // Common search terms mapping
        const termMappings = {
            'allarme': ['alarm', 'code'],
            'indirizzo': ['indirizzo', 'address'],
            'dipendente': ['employee', 'name'],
            'appartamento': ['appartament', 'nome'],
            'minuti': ['minutes', 'ore'],
            'ufficio': ['office', 'name'],
            'keybox': ['keybox', 'key'],
            'codice': ['code', 'codice'],
            'password': ['password'],
            'mura': ['mura', 'le_mura'],
            'artigea': ['artigea'],
            'torre': ['torre'],
            'casa': ['casa'],
            'alessandro': ['alessandro'],
            'anna': ['anna'],
            'pisa': ['pisa'],
            'cascina': ['cascina']
        };

        let keywords = [];
        
        // Extract direct keywords
        const words = query.split(/\s+/).filter(word => word.length > 2);
        keywords.push(...words);

        // Add mapped terms
        Object.keys(termMappings).forEach(key => {
            if (query.includes(key)) {
                keywords.push(...termMappings[key]);
            }
        });

        return [...new Set(keywords)]; // Remove duplicates
    }

    getBroadSearchResults(query) {
        // If no specific matches, return relevant sections based on query type
        if (query.includes('allarme') || query.includes('alarm')) {
            return {
                query: query,
                matches: this.data.alarm_general?.alarm_general || [],
                sections: ['alarm_general', 'alarm_acli']
            };
        }

        if (query.includes('appartamento') || query.includes('indirizzo')) {
            return {
                query: query,
                matches: [
                    ...(this.data.irene?.irene || []),
                    ...(this.data.cerrano?.cerrano || []),
                    ...(this.data.lorenza?.lorenza || [])
                ].slice(0, 5),
                sections: ['irene', 'cerrano', 'lorenza']
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