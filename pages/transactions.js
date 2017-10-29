// Require electron-db
const db = require('electron-db');

// Load the transactions table
db.getAll('transactions', (succ, data) => {
  if (succ) {
    let transactions = data;

    if (transactions !== null) {
      if (transactions.length > 0) {
        let tblString = '';

        for (let i = 0; i < transactions.length; i++) {
          tblString += '<tr id="'+ transactions[i].id +'">';
          tblString += '<td>' + transactions[i].title + '</td>';
          tblString += '<td>' + transactions[i].description + '</td>';
          tblString += '<td>' + currencyFormat(transactions[i].expenses) + '</td>';
          tblString += '<td>' + currencyFormat(transactions[i].sales) + '</td>';
          tblString += '<td>' + transactions[i].remarks + '</td>';
          tblString += '</tr>';
        }

        $('#table-transactions').html(tblString);

      }
    }

  } else {
    console.log('Error loading table.');
  }
});

/**
 * Function to format number to currency.
 * @param {*} num [Number to be formatted]
 */
function currencyFormat (num) {
  return "\u20B1 " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}