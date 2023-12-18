// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'yogaClasses',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

db.query(`CREATE TABLE IF NOT EXISTS Users (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Age INT NOT NULL,
  Batch VARCHAR(255) NOT NULL,
  SelectedBatchNextMonth VARCHAR(255) NOT NULL
)`, (err, result) => {
  if (err) {
    console.error('Error creating Users table:', err);
  } else {
    console.log('Users table created or already exists.');
  }
});

app.post('/api/submitForm', (req, res) => {
  const userData = req.body;
  console.log('Received form submission:', userData); // Add this line to log the received form data

  // Validate age
  if (userData.age < 18 || userData.age > 65) {
    return res.status(400).json({ success: false, error: 'Age must be between 18 and 65.' });
  }

  db.query('INSERT INTO Users (Name, Age, Batch, SelectedBatchNextMonth) VALUES (?, ?, ?, ?)',
    [userData.name, userData.age, userData.selectedBatch, userData.selectedBatchNextMonth], (err, result) => {
      if (err) {
        console.error('Error inserting user data:', err);
        res.status(500).json({ success: false, error: 'Error submitting form.' });
      } else {
        // TODO: Implement payment logic (mocked for now)
        const paymentResponse = CompletePayment(userData);
        res.status(200).json({ success: paymentResponse });
      }
  });
});


// Mock function for payment (replace this with your actual payment logic)
function CompletePayment(userData) {
  // TODO: Implement your payment logic
  // For now, just return a success status
  return true;
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
