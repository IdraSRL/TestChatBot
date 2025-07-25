export class DataProcessor {
    constructor(data) {
        this.data = data;
        this.apartmentIndex = this.buildApartmentIndex();
        this.employeeIndex = this.buildEmployeeIndex();
        this.alarmIndex = this.buildAlarmIndex();
        this.officeIndex = this.buildOfficeIndex();
    }

    buildApartmentIndex() {
        const index = new Map();
        
        if (this.data.apartments) {
            this.data.apartments.forEach(apartment => {
                // Index by name (normalized)
                const normalizedName = apartment.name.toLowerCase()
                    .replace(/[_\s-]/g, '')
                    .replace(/&/g, '');
                
                index.set(normalizedName, apartment);
                
                // Index by search terms
                if (apartment.searchTerms) {
                    apartment.searchTerms.forEach(term => {
                        const normalizedTerm = term.toLowerCase()
                            .replace(/[_\s-]/g, '')
                            .replace(/&/g, '');
                        index.set(normalizedTerm, apartment);
                    });
                }
                
                // Index by original name
                index.set(apartment.name.toLowerCase(), apartment);
            });
        }
        
        return index;
    }

    buildEmployeeIndex() {
        const index = new Map();
        
        if (this.data.employees) {
            this.data.employees.forEach(employee => {
                // Index by search terms
                if (employee.searchTerms) {
                    employee.searchTerms.forEach(term => {
                        index.set(term.toLowerCase(), employee);
                    });
                }
                
                // Index by name
                index.set(employee.name.toLowerCase(), employee);
            });
        }
        
        return index;
    }

    buildAlarmIndex() {
        const index = new Map();
        
        if (this.data.alarms) {
            this.data.alarms.forEach(alarm => {
                // Index by location
                if (alarm.location) {
                    index.set(alarm.location.toLowerCase(), alarm);
                }
                
                // Index by name
                if (alarm.name) {
                    index.set(alarm.name.toLowerCase(), alarm);
                    // Also index by individual words
                    const words = alarm.name.toLowerCase().split(/\s+/);
                    words.forEach(word => {
                        if (word.length > 2) {
                            index.set(word, alarm);
                        }
                    });
                }
            });
        }
        
        return index;
    }

    buildOfficeIndex() {
        const index = new Map();
        
        if (this.data.offices) {
            this.data.offices.forEach(office => {
                // Index by search terms
                if (office.searchTerms) {
                    office.searchTerms.forEach(term => {
                        index.set(term.toLowerCase(), office);
                    });
                }
                
                // Index by name
                index.set(office.name.toLowerCase(), office);
            });
        }
        
        return index;
    }

    findRelevantData(query) {
        const queryLower = query.toLowerCase();
        const keywords = this.extractKeywords(queryLower);
        
        // Specific searches
        const apartmentResult = this.findApartmentData(queryLower, keywords);
        if (apartmentResult.matches.length > 0) {
            return apartmentResult;
        }

        const employeeResult = this.findEmployeeData(queryLower, keywords);
        if (employeeResult.matches.length > 0) {
            return employeeResult;
        }

        const alarmResult = this.findAlarmData(queryLower, keywords);
        if (alarmResult.matches.length > 0) {
            return alarmResult;
        }

        const officeResult = this.findOfficeData(queryLower, keywords);
        if (officeResult.matches.length > 0) {
            return officeResult;
        }

        // Fallback to general search
        return this.getBroadSearchResults(queryLower);
    }

    findApartmentData(queryLower, keywords) {
        const matches = [];
        
        // Check if it's a keybox query
        const isKeyboxQuery = queryLower.includes('keybox') || queryLower.includes('codice');
        const isAddressQuery = queryLower.includes('indirizzo') || queryLower.includes('address');
        const isTimeQuery = queryLower.includes('minuti') || queryLower.includes('ore') || queryLower.includes('tempo');
        
        // Find apartment by name
        for (const keyword of keywords) {
            const apartment = this.apartmentIndex.get(keyword);
            if (apartment) {
                if (isKeyboxQuery) {
                    matches.push({
                        ...apartment,
                        specificInfo: 'keybox',
                        requestedData: apartment.keyboxDetails || apartment.keybox
                    });
                } else if (isAddressQuery) {
                    matches.push({
                        ...apartment,
                        specificInfo: 'address',
                        requestedData: apartment.address
                    });
                } else if (isTimeQuery) {
                    matches.push({
                        ...apartment,
                        specificInfo: 'time',
                        requestedData: `${apartment.minutes} minuti (${apartment.hours} ore)`
                    });
                } else {
                    matches.push(apartment);
                }
                break; // Found the apartment, stop searching
            }
        }

        return {
            query: queryLower,
            matches: matches,
            sections: ['apartments'],
            isSpecific: true
        };
    }

    findEmployeeData(queryLower, keywords) {
        const matches = [];
        
        for (const keyword of keywords) {
            const employee = this.employeeIndex.get(keyword);
            if (employee) {
                matches.push(employee);
                break;
            }
        }

        return {
            query: queryLower,
            matches: matches,
            sections: ['employees'],
            isSpecific: true
        };
    }

    findAlarmData(queryLower, keywords) {
        const matches = [];
        
        // Check for "allarme artigea" specifically
        if (queryLower.includes('allarme') && queryLower.includes('artigea')) {
            const artigeaAlarm = this.data.alarms.find(alarm => 
                alarm.name && alarm.name.toLowerCase().includes('keybox') && alarm.name.toLowerCase().includes('artigea')
            );
            if (artigeaAlarm) {
                matches.push(artigeaAlarm);
            }
        } else {
            // General alarm search
            for (const keyword of keywords) {
                const alarm = this.alarmIndex.get(keyword);
                if (alarm) {
                    matches.push(alarm);
                }
            }
        }

        return {
            query: queryLower,
            matches: matches,
            sections: ['alarms'],
            isSpecific: true
        };
    }

    findOfficeData(queryLower, keywords) {
        const matches = [];
        
        for (const keyword of keywords) {
            const office = this.officeIndex.get(keyword);
            if (office) {
                matches.push(office);
            }
        }

        return {
            query: queryLower,
            matches: matches,
            sections: ['offices'],
            isSpecific: true
        };
    }

    extractKeywords(query) {
        // Clean and split query
        const words = query.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 1);

        // Add normalized versions
        const keywords = [...words];
        
        // Add combined words for multi-word searches
        if (words.length > 1) {
            keywords.push(words.join(''));
            keywords.push(words.join(' '));
        }

        // Special mappings
        const mappings = {
            'mura': ['lemura', 'le mura'],
            'torre': ['torre'],
            'casa': ['casa'],
            'alessandro': ['alessandro', 'resti'],
            'anna': ['anna'],
            'allarme': ['alarm'],
            'keybox': ['keybox', 'codice'],
            'artigea': ['artigea']
        };

        Object.keys(mappings).forEach(key => {
            if (query.includes(key)) {
                keywords.push(...mappings[key]);
            }
        });

        return [...new Set(keywords)];
    }

    getBroadSearchResults(query) {
        if (query.includes('allarme') || query.includes('alarm')) {
            return {
                query: query,
                matches: this.data.alarms || [],
                sections: ['alarms']
            };
        }

        if (query.includes('appartamento') || query.includes('apartment')) {
            return {
                query: query,
                matches: (this.data.apartments || []).slice(0, 10),
                sections: ['apartments']
            };
        }

        if (query.includes('dipendente') || query.includes('employee')) {
            return {
                query: query,
                matches: this.data.employees || [],
                sections: ['employees']
            };
        }

        if (query.includes('ufficio') || query.includes('office')) {
            return {
                query: query,
                matches: this.data.offices || [],
                sections: ['offices']
            };
        }

        // Default: return mixed results
        return {
            query: query,
            matches: [
                ...(this.data.alarms?.slice(0, 3) || []),
                ...(this.data.apartments?.slice(0, 3) || []),
                ...(this.data.employees?.slice(0, 3) || [])
            ],
            sections: ['general']
        };
    }
}