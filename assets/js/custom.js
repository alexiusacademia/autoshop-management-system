const helpers = require('./helpers/helpers.js');
const fs = require('fs');

/**
 * Show customers list in a table
 */
function showCustomers() {

  $('#main-container').load('pages/customers_list.html', () => {
  });
}


function showWelcome() {
  $('#main-container').load('pages/welcome.html', () => {

  });
}


function showInventory() {
  $('#main-container').load('pages/inventory.html', () => {

  });
}


$('#btnShowTransactions').on('click', function(){
  alert('Transactions');
});
