import { ChatBot } from './chatbot.js';
import { DataProcessor } from './dataProcessor.js';
import { UI } from './ui.js';
import data from '../data_export.json';

class App {
    constructor() {
        this.dataProcessor = new DataProcessor(data);
        this.chatBot = new ChatBot();
        this.ui = new UI();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.ui.showMessage('Inserisci la tua API Key OpenAI per iniziare.', 'bot');
    }

    setupEventListeners() {
        // API Key management
        document.getElementById('saveApiKey').addEventListener('click', () => {
            this.handleApiKeySave();
        });

        document.getElementById('apiKey').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleApiKeySave();
            }
        });

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

    async handleApiKeySave() {
        const apiKey = document.getElementById('apiKey').value.trim();
        
        if (!apiKey) {
            this.ui.showApiStatus('Inserisci una API Key valida', 'error');
            return;
        }

        if (!apiKey.startsWith('sk-')) {
            this.ui.showApiStatus('La API Key deve iniziare con "sk-"', 'error');
            return;
        }

        try {
            this.ui.showLoading(true);
            
            // Test the API key
            const isValid = await this.chatBot.testApiKey(apiKey);
            
            if (isValid) {
                this.chatBot.setApiKey(apiKey);
                this.ui.showApiStatus('✅ API Key configurata correttamente!', 'success');
                this.ui.enableChat(true);
                
                // Clear the API key input for security
                document.getElementById('apiKey').value = '';
            } else {
                this.ui.showApiStatus('❌ API Key non valida', 'error');
            }
        } catch (error) {
            console.error('Error testing API key:', error);
            this.ui.showApiStatus('❌ Errore nella verifica della API Key', 'error');
        } finally {
            this.ui.showLoading(false);
        }
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