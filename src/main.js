import { ChatBot } from './chatbot.js';
import { DataProcessor } from './dataProcessor.js';
import { UI } from './ui.js';
import { companyData } from './data.js';

class App {
    constructor() {
        this.dataProcessor = new DataProcessor(companyData);
        this.chatBot = new ChatBot();
        this.ui = new UI();
        
        this.init();
    }

    init() {
        this.checkApiKey();
        this.setupEventListeners();
    }
    
    checkApiKey() {
        // Controlla se l'API key è configurata
        if (this.chatBot.apiKey === 'sk-your-api-key-here') {
            this.ui.showMessage('⚠️ ATTENZIONE: Devi configurare la tua API Key OpenAI nel file src/config.js', 'bot');
            this.ui.enableChat(false);
        } else {
            this.ui.showMessage('✅ Chatbot pronto! Puoi iniziare a fare domande sui dati aziendali.', 'bot');
            this.ui.enableChat(true);
        }
    }

    setupEventListeners() {
        // Chat functionality
        document.getElementById('sendButton').addEventListener('click', () => {
            this.handleSendMessage();
        });

        document.getElementById('userInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSendMessage();
            }
        });
    }

    async handleSendMessage() {
        const userInput = document.getElementById('userInput');
        const message = userInput.value.trim();
        
        if (!message) return;

        // Show user message
        this.ui.showMessage(message, 'user');
        userInput.value = '';

        try {
            this.ui.showLoading(true);
            
            // Process the query to find relevant data
            const relevantData = this.dataProcessor.findRelevantData(message);
            
            // Get response from ChatGPT
            const response = await this.chatBot.getResponse(message, relevantData);
            
            // Show bot response
            this.ui.showMessage(response, 'bot');
            
        } catch (error) {
            console.error('Error getting response:', error);
            this.ui.showMessage('Mi dispiace, si è verificato un errore. Riprova più tardi.', 'bot');
        } finally {
            this.ui.showLoading(false);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});