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
3. Sii conciso e preciso
4. Usa un tono professionale ma amichevole
5. Se trovi più risultati simili, elencali tutti

DATI AZIENDALI DISPONIBILI:
${JSON.stringify(relevantData, null, 2)}`;

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
                    max_tokens: 150,
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