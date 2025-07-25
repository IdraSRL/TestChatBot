export class DataProcessor {
    constructor(companyData) {
        this.data = companyData;
    }

    findRelevantData(query) {
        const queryLower = query.toLowerCase();
        const relevantData = {
            alarms: [],
            apartments: [],
            employees: [],
            offices: [],
            bnb: [],
            bnbNames: []
        };

        // Determina se è una richiesta molto specifica (keybox, indirizzo, minuti)
        const isKeyboxQuery = queryLower.includes('keybox') || queryLower.includes('key box');
        const isAddressQuery = queryLower.includes('indirizzo') || queryLower.includes('address');
        const isTimeQuery = queryLower.includes('minuti') || queryLower.includes('ore') || queryLower.includes('tempo');
        const isVerySpecific = isKeyboxQuery || isAddressQuery || isTimeQuery;

        // Cerca negli allarmi
        this.data.alarms.forEach(alarm => {
            if (this.matchesQuery(alarm, queryLower)) {
                relevantData.alarms.push(alarm);
            }
        });

        // Cerca negli appartamenti
        this.data.apartments.forEach(apartment => {
            if (this.matchesQuery(apartment, queryLower)) {
                relevantData.apartments.push(apartment);
            }
        });

        // Cerca nei dipendenti
        this.data.employees.forEach(employee => {
            if (this.matchesQuery(employee, queryLower)) {
                relevantData.employees.push(employee);
            }
        });

        // Cerca negli uffici
        this.data.offices.forEach(office => {
            if (this.matchesQuery(office, queryLower)) {
                relevantData.offices.push(office);
            }
        });

        // Cerca nei BNB
        this.data.bnb.forEach(bnb => {
            if (this.matchesQuery(bnb, queryLower)) {
                relevantData.bnb.push(bnb);
            }
        });

        // Cerca nei nomi BNB
        this.data.bnbNames.forEach(bnbName => {
            if (this.matchesQuery(bnbName, queryLower)) {
                relevantData.bnbNames.push(bnbName);
            }
        });

        // Per richieste molto specifiche, restituisci solo il primo risultato più rilevante
        if (isVerySpecific && relevantData.apartments.length > 0) {
            // Trova l'appartamento più rilevante
            const mostRelevant = this.findMostRelevantApartment(relevantData.apartments, queryLower);
            if (mostRelevant) {
                relevantData.apartments = [mostRelevant];
                // Pulisci gli altri array per focus sulla risposta specifica
                relevantData.alarms = [];
                relevantData.employees = [];
                relevantData.offices = [];
                relevantData.bnb = [];
                relevantData.bnbNames = [];
            }
        }

        // Aggiungi flag per indicare se è una richiesta specifica
        relevantData.isVerySpecific = isVerySpecific;
        relevantData.queryType = isKeyboxQuery ? 'keybox' : isAddressQuery ? 'address' : isTimeQuery ? 'time' : 'general';

        return relevantData;
    }

    matchesQuery(item, queryLower) {
        // Controlla il nome
        if (item.name && item.name.toLowerCase().includes(queryLower)) {
            return true;
        }

        // Controlla i termini di ricerca se esistono
        if (item.searchTerms) {
            return item.searchTerms.some(term => 
                queryLower.includes(term.toLowerCase()) || 
                term.toLowerCase().includes(queryLower)
            );
        }

        // Controlla altri campi rilevanti
        const fieldsToCheck = ['location', 'address', 'code', 'type'];
        return fieldsToCheck.some(field => {
            if (item[field]) {
                return item[field].toLowerCase().includes(queryLower);
            }
            return false;
        });
    }

    findMostRelevantApartment(apartments, queryLower) {
        // Trova l'appartamento con il match più preciso
        let bestMatch = null;
        let bestScore = 0;

        apartments.forEach(apartment => {
            let score = 0;
            
            // Nome esatto ha punteggio massimo
            if (apartment.name && queryLower.includes(apartment.name.toLowerCase())) {
                score += 10;
            }

            // Termini di ricerca hanno punteggio alto
            if (apartment.searchTerms) {
                apartment.searchTerms.forEach(term => {
                    if (queryLower.includes(term.toLowerCase())) {
                        score += 5;
                    }
                });
            }

            if (score > bestScore) {
                bestScore = score;
                bestMatch = apartment;
            }
        });

        return bestMatch || apartments[0];
    }

    // Metodo per ottenere statistiche sui dati
    getDataStats() {
        return {
            alarms: this.data.alarms.length,
            apartments: this.data.apartments.length,
            employees: this.data.employees.length,
            offices: this.data.offices.length,
            bnb: this.data.bnb.length,
            bnbNames: this.data.bnbNames.length
        };
    }
}