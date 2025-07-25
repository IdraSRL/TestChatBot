import { CONFIG } from './config.js';

export class ChatBot {
    constructor() {
        this.apiKey = CONFIG.OPENAI_API_KEY;
        this.apiUrl = CONFIG.OPENAI_API_URL;
    }

    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    async testApiKey() {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'user',
                            content: 'Test'
                        }
                    ],
                    max_tokens: 5,
                    temperature: 0.1
                })
            });

            return response.ok;
        } catch (error) {
            console.error('API key test failed:', error);
            return false;
        }
    }

    async getResponse(userMessage, relevantData) {
        if (!this.apiKey) {
            throw new Error('API Key non configurata');
        }
        
        if (this.apiKey === 'sk-your-api-key-here') {
            throw new Error('Devi configurare una vera API Key nel file config.js');
        }

        const systemPrompt = `Sei un assistente specializzato per l'azienda Artigea. 
Il tuo compito è rispondere SOLO alle domande sui dati aziendali forniti.

REGOLE IMPORTANTI:
1. Rispondi SOLO con informazioni presenti nei dati forniti
2. Se non trovi informazioni pertinenti, rispondi: "Non ho trovato informazioni su questo argomento nei dati aziendali"
3. Organizza le risposte in modo chiaro e strutturato
4. Usa elenchi puntati quando ci sono più informazioni
5. Separa chiaramente le diverse categorie di informazioni
6. Usa un tono professionale ma amichevole
7. Evita ripetizioni e informazioni ridondanti
8. Presenta prima le informazioni più rilevanti alla domanda
9. Per domande specifiche su appartamenti, concentrati SOLO sui dati dell'appartamento richiesto
10. Se viene chiesto il keybox di un appartamento specifico, cerca nelle "note" dell'appartamento
11. IMPORTANTE: Se viene richiesta una informazione SPECIFICA (keybox, indirizzo, minuti), rispondi SOLO con quella informazione, senza aggiungere altri dettagli non richiesti

FORMATO RISPOSTA:
- Per codici allarme: specifica chiaramente nome/luogo e codice
- Per appartamenti: indica nome, indirizzo, caratteristiche principali
- Per keybox appartamenti: cerca nelle note dell'appartamento specifico
- Per dipendenti: nome completo e informazioni rilevanti
- Per uffici: nome e tempo di pulizia
- Per richieste specifiche di keybox: rispondi SOLO "Keybox [nome appartamento]: [codice]"
- Per richieste specifiche di indirizzo: rispondi SOLO "Indirizzo [nome appartamento]: [indirizzo]"
- Per richieste specifiche di minuti/ore: rispondi SOLO "Tempo pulizia [nome]: [minuti] minuti"

ISTRUZIONI SPECIALI PER RICERCHE SPECIFICHE:
- Se viene chiesto "keybox di [nome appartamento]", cerca SOLO nell'appartamento con quel nome
- Se viene chiesto l'indirizzo di un appartamento, cerca SOLO in quell'appartamento
- Se viene chiesto i minuti/ore di un appartamento, cerca SOLO in quell'appartamento
- Non fornire informazioni generiche se viene fatta una domanda specifica
- Se la domanda contiene solo "keybox" + nome appartamento, rispondi ESCLUSIVAMENTE con il codice keybox
- Non aggiungere note, indirizzi o altre informazioni se non esplicitamente richieste

ESEMPI DI RISPOSTE CORRETTE:
Domanda: "Keybox Mura" → Risposta: "Keybox Le Mura: 9953"
Domanda: "Keybox Girasole" → Risposta: "Keybox Girasole: 0-0-1-1"
Domanda: "Indirizzo Torre" → Risposta: "Indirizzo Torre: Via Risorgimento 10, Pisa"
Domanda: "Minuti Tuscany" → Risposta: "Tempo pulizia Tuscany House: 120 minuti"

DATI AZIENDALI DISPONIBILI:
${JSON.stringify(relevantData, null, 2)}

ISTRUZIONI AGGIUNTIVE PER RISPOSTE SPECIFICHE:
- Se viene richiesto il keybox di un appartamento specifico, usa SOLO il campo "keyboxDetails" o "keybox" di quell'appartamento
- Se viene richiesto l'indirizzo, usa SOLO il campo "address" dell'appartamento specifico
- Se vengono richiesti i minuti/ore, usa SOLO i campi "minutes" e "hours" dell'appartamento specifico
- Non aggiungere informazioni generiche se la domanda è specifica`;

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: systemPrompt
                        },
                        {
                            role: 'user',
                            content: userMessage
                        }
                    ],
                    max_tokens: 300,
                    temperature: 0.1
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
            }

            const data = await response.json();
            return data.choices[0].message.content.trim();

        } catch (error) {
            console.error('ChatGPT API error:', error);
            throw error;
        }
    }
}