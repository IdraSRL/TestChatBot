// Processore dati semplificato e ottimizzato
export class DataProcessor {
    constructor(data) {
        this.data = data;
        this.searchIndex = this.buildSearchIndex();
    }

    buildSearchIndex() {
        const index = new Map();
        
        // Indicizza tutti i tipi di dati
        const dataTypes = ['alarms', 'apartments', 'employees', 'offices', 'bnb', 'bnbNames'];
        
        dataTypes.forEach(type => {
            if (this.data[type]) {
                this.data[type].forEach(item => {
                    // Aggiungi l'item all'indice usando tutti i suoi searchTerms
                    if (item.searchTerms) {
                        item.searchTerms.forEach(term => {
                            const normalizedTerm = this.normalizeSearchTerm(term);
                            if (!index.has(normalizedTerm)) {
                                index.set(normalizedTerm, []);
                            }
                            index.get(normalizedTerm).push({
                                ...item,
                                dataType: type
                            });
                        });
                    }
                    
                    // Aggiungi anche il nome principale
                    if (item.name) {
                        const normalizedName = this.normalizeSearchTerm(item.name);
                        if (!index.has(normalizedName)) {
                            index.set(normalizedName, []);
                        }
                        index.get(normalizedName).push({
                            ...item,
                            dataType: type
                        });
                    }
                });
            }
        });
        
        return index;
    }

    normalizeSearchTerm(term) {
        return term.toLowerCase()
            .replace(/[^\w\s]/g, '') // Rimuovi punteggiatura
            .replace(/\s+/g, '') // Rimuovi spazi
            .trim();
    }

    findRelevantData(query) {
        const queryLower = query.toLowerCase();
        const queryWords = this.extractQueryWords(queryLower);
        
        // Determina il tipo di ricerca
        const searchType = this.determineSearchType(queryLower);
        
        // Cerca corrispondenze esatte prima
        const exactMatches = this.findExactMatches(queryWords);
        if (exactMatches.length > 0) {
            return this.formatSearchResults(query, exactMatches, searchType);
        }
        
        // Cerca corrispondenze parziali
        const partialMatches = this.findPartialMatches(queryWords);
        if (partialMatches.length > 0) {
            return this.formatSearchResults(query, partialMatches, searchType);
        }
        
        // Ricerca generale per categoria
        return this.getCategoryResults(queryLower, searchType);
    }

    extractQueryWords(query) {
        // Estrai parole significative dalla query
        const words = query.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 1);
        
        // Aggiungi anche la query completa normalizzata
        const normalizedQuery = this.normalizeSearchTerm(query);
        if (normalizedQuery.length > 2) {
            words.push(normalizedQuery);
        }
        
        return [...new Set(words)]; // Rimuovi duplicati
    }

    findExactMatches(queryWords) {
        const matches = [];
        
        queryWords.forEach(word => {
            const normalizedWord = this.normalizeSearchTerm(word);
            if (this.searchIndex.has(normalizedWord)) {
                matches.push(...this.searchIndex.get(normalizedWord));
            }
        });
        
        // Rimuovi duplicati basandosi sull'ID
        const uniqueMatches = [];
        const seenIds = new Set();
        
        matches.forEach(match => {
            if (!seenIds.has(match.id)) {
                seenIds.add(match.id);
                uniqueMatches.push(match);
            }
        });
        
        return uniqueMatches;
    }

    findPartialMatches(queryWords) {
        const matches = [];
        
        // Cerca corrispondenze parziali nell'indice
        for (const [indexTerm, items] of this.searchIndex.entries()) {
            for (const queryWord of queryWords) {
                const normalizedQuery = this.normalizeSearchTerm(queryWord);
                if (indexTerm.includes(normalizedQuery) || normalizedQuery.includes(indexTerm)) {
                    matches.push(...items);
                }
            }
        }
        
        // Rimuovi duplicati
        const uniqueMatches = [];
        const seenIds = new Set();
        
        matches.forEach(match => {
            if (!seenIds.has(match.id)) {
                seenIds.add(match.id);
                uniqueMatches.push(match);
            }
        });
        
        return uniqueMatches;
    }

    determineSearchType(query) {
        // Determina il tipo di informazione richiesta
        if (query.includes('keybox') || query.includes('codice')) {
            return 'keybox';
        }
        if (query.includes('indirizzo') || query.includes('address')) {
            return 'address';
        }
        if (query.includes('minuti') || query.includes('ore') || query.includes('tempo')) {
            return 'time';
        }
        if (query.includes('allarme') || query.includes('alarm')) {
            return 'alarm';
        }
        if (query.includes('dipendente') || query.includes('employee')) {
            return 'employee';
        }
        if (query.includes('ufficio') || query.includes('office')) {
            return 'office';
        }
        if (query.includes('appartamento') || query.includes('apartment')) {
            return 'apartment';
        }
        
        return 'general';
    }

    formatSearchResults(query, matches, searchType) {
        // Filtra e formatta i risultati in base al tipo di ricerca
        let filteredMatches = matches;
        
        // Se è una ricerca specifica, filtra per tipo di dato
        if (searchType === 'alarm') {
            filteredMatches = matches.filter(m => m.dataType === 'alarms');
        } else if (searchType === 'apartment') {
            filteredMatches = matches.filter(m => m.dataType === 'apartments');
        } else if (searchType === 'employee') {
            filteredMatches = matches.filter(m => m.dataType === 'employees');
        } else if (searchType === 'office') {
            filteredMatches = matches.filter(m => m.dataType === 'offices');
        }
        
        // Aggiungi informazioni specifiche richieste
        if (searchType === 'keybox') {
            filteredMatches = filteredMatches.map(match => ({
                ...match,
                specificInfo: 'keybox',
                requestedData: match.keyboxDetails || match.keybox || match.code
            }));
        } else if (searchType === 'address') {
            filteredMatches = filteredMatches.map(match => ({
                ...match,
                specificInfo: 'address',
                requestedData: match.address
            }));
        } else if (searchType === 'time') {
            filteredMatches = filteredMatches.map(match => ({
                ...match,
                specificInfo: 'time',
                requestedData: match.minutes ? `${match.minutes} minuti${match.hours ? ` (${match.hours} ore)` : ''}` : null
            }));
        }
        
        return {
            query: query,
            matches: filteredMatches.slice(0, 10), // Limita a 10 risultati
            searchType: searchType,
            isSpecific: true
        };
    }

    getCategoryResults(query, searchType) {
        // Restituisci risultati generali per categoria
        let categoryData = [];
        let sections = [];
        
        if (searchType === 'alarm' || query.includes('allarme')) {
            categoryData = this.data.alarms || [];
            sections = ['alarms'];
        } else if (searchType === 'apartment' || query.includes('appartamento')) {
            categoryData = (this.data.apartments || []).slice(0, 10);
            sections = ['apartments'];
        } else if (searchType === 'employee' || query.includes('dipendente')) {
            categoryData = this.data.employees || [];
            sections = ['employees'];
        } else if (searchType === 'office' || query.includes('ufficio')) {
            categoryData = this.data.offices || [];
            sections = ['offices'];
        } else {
            // Risultati misti
            categoryData = [
                ...(this.data.alarms?.slice(0, 3) || []),
                ...(this.data.apartments?.slice(0, 3) || []),
                ...(this.data.employees?.slice(0, 3) || []),
                ...(this.data.offices?.slice(0, 3) || [])
            ];
            sections = ['general'];
        }
        
        return {
            query: query,
            matches: categoryData,
            sections: sections,
            searchType: searchType,
            isSpecific: false
        };
    }
}