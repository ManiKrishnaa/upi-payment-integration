// app.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Function to generate UPI payment link
function generateUPILink(mobile, orgname, amount) {
    return `upi://pay?pa=${mobile}@upi&pn=${orgname}&am=${amount}&cu=INR`;
}

// Route to render donation form
app.get('/donate', (req, res) => {
    res.render('donate');
});

// Route to initiate UPI payment
app.post('/initiate-payment', (req, res) => {
    const { mobile, orgname, amount } = req.body;
    
    // Check if all required parameters are present
    if (!mobile || !orgname || !amount) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Assuming amount is passed as a string, you may need to convert it to a number
    const amountNumber = parseFloat(amount);

    // Check if amount is a valid number
    if (isNaN(amountNumber) || amountNumber <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
    }

    // Generate UPI payment link
    const upiLink = generateUPILink(mobile, orgname, amountNumber);
    
    // Send UPI payment link to frontend
    res.json({ upiLink });
});
// Route to handle payment callback
app.post('/payment-callback', (req, res) => {
    // Parse the payment status from the request
    const { transactionId, status, amount } = req.body;

    // Update the payment status in the database
    // Perform necessary actions based on the payment status

    // Send response back to the payment service provider
    res.sendStatus(200);
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
