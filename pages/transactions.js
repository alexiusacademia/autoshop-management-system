// Require electron-db
const db = require('electron-db');

// Load the transactions table
db.getAll('transactions', (succ, data) => {
  if (succ) {
    console.log(data);
  } else {
    console.log('Error loading table.');
  }
});

