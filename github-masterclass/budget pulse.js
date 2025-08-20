const balanceElement = document.getElementById('balance');
const incomeElement = document.getElementById('income');
const expenseElement = document.getElementById('expense');
const transactionListElement = document.getElementById('transaction-list');
const form = document.getElementById('transaction-form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');

// Dummy transactions to start with (optional)
let transactions = JSON.parse(localStorage.getItem('transactions')) || [
    // { id: 1, text: "Salary", amount: 3000, category: "income" },
    // { id: 2, text: "Coffee", amount: -5, category: "food" }
];

// Initialize the app
function init() {
    updateDisplay();
    form.addEventListener('submit', addTransaction);
}

// Add a new transaction
function addTransaction(e) {
    e.preventDefault();

    if (textInput.value.trim() === '' || amountInput.value.trim() === '') {
        alert('Please add a description and amount');
        return;
    }

    const transaction = {
        id: generateID(),
        text: textInput.value,
        amount: +amountInput.value, // The '+' converts string to number
        category: categoryInput.value
    };

    transactions.push(transaction);
    updateLocalStorage();
    updateDisplay();
    clearForm();

    // Optional: Add a nice animation for new item
    const newItem = document.querySelector(`li[data-id="${transaction.id}"]`);
    if (newItem) newItem.classList.add('highlight');
    setTimeout(() => newItem.classList.remove('highlight'), 500);
}

// Generate a random ID (simple method for a demo)
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Remove a transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    updateDisplay();
}

// Update the values on the screen
function updateDisplay() {
    // Calculate totals
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    // Update the DOM
    balanceElement.innerText = `$${total}`;
    incomeElement.innerText = `+$${income}`;
    expenseElement.innerText = `-$${expense}`;

    // Clear and rebuild the transaction list
    transactionListElement.innerHTML = '';
    transactions.forEach(transaction => addTransactionDOM(transaction));
}

// Add a transaction to the DOM list
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? 'minus' : 'plus';
    const item = document.createElement('li');
    item.classList.add(sign);
    item.setAttribute('data-id', transaction.id);

    // Get emoji for category
    const categoryEmojis = {
        'income': '💰',
        'food': '🍕',
        'shopping': '🛒',
        'transport': '🚗',
        'other': '❔'
    };
    const emoji = categoryEmojis[transaction.category] || '❔';

    item.innerHTML = `
        ${emoji} ${transaction.text} 
        <span>${transaction.amount < 0 ? '-' : '+'}$${Math.abs(transaction.amount).toFixed(2)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    transactionListElement.appendChild(item);
}

// Clear the form inputs
function clearForm() {
    textInput.value = '';
    amountInput.value = '';
    categoryInput.value = 'income'; // Reset to default
    textInput.focus();
}

// Update localStorage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Start the app
init();