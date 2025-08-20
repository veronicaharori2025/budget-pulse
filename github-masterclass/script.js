// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Sample AI responses - In a real app, you'd replace this with an API call
const aiResponses = [
    "I understand. Peace comes from within. Let's breathe together for a moment. 🌿",
    "That's a common feeling. Remember, this too shall pass. What brings you comfort?",
    "Thank you for sharing. Would you like to try a simple grounding exercise?",
    "I hear you. Sometimes the mind needs gentle observation, not judgment. 🍃",
    "Let's explore that feeling together. Where do you feel it in your body?",
    "Mindfulness begins with acceptance. What's one small step you can take right now?",
    "Your awareness of this is the first step toward peace. ☯️"
];

// Initialize the chat
function initChat() {
    // Add event listeners
    sendBtn.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
}

// Handle user message
function handleUserMessage() {
    const message = userInput.value.trim();
    
    if (message) {
        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input
        userInput.value = '';
        
        // Simulate AI thinking
        setTimeout(() => {
            // Get random AI response
            const aiResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            addMessage(aiResponse, 'ai');
        }, 1000);
    }
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Start the chat
initChat();