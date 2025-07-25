export class UI {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.loadingIndicator = document.getElementById('loadingIndicator');
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (type === 'user') {
            contentDiv.innerHTML = `<strong>👤 Tu:</strong> ${this.escapeHtml(message)}`;
        } else {
            contentDiv.innerHTML = `<strong>🤖 Assistente:</strong> ${this.escapeHtml(message)}`;
        }
        
        messageDiv.appendChild(contentDiv);
        this.chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    showApiStatus(message, type) {
        const statusDiv = document.getElementById('apiStatus');
        statusDiv.textContent = message;
        statusDiv.className = `api-status ${type}`;
        
        // Auto-hide success messages after 3 seconds
        if (type === 'success') {
            setTimeout(() => {
                statusDiv.textContent = '';
                statusDiv.className = 'api-status';
            }, 3000);
        }
    }

    enableChat(enabled) {
        const userInput = document.getElementById('userInput');
        const sendButton = document.getElementById('sendButton');
        
        userInput.disabled = !enabled;
        sendButton.disabled = !enabled;
        
        if (enabled) {
            userInput.placeholder = 'Scrivi la tua domanda...';
            userInput.focus();
        } else {
            userInput.placeholder = 'Configura prima la API Key...';
        }
    }

    showLoading(show) {
        if (show) {
            this.loadingIndicator.classList.add('show');
        } else {
            this.loadingIndicator.classList.remove('show');
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}