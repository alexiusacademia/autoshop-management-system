const helpers = require('./helpers/helpers.js');
const fs = require('fs');

/**
 * Show customers list in a table
 */
function showCustomers() {
  $('#main-container').load('pages/customers_list.html', () => {
  });
}

/**
 * Show welcome/home page
 */
function showWelcome() {
  $('#main-container').load('pages/welcome.html', () => {

  });
}

/**
 * Show items inventory view
 */
function showInventory() {
  $('#main-container').load('pages/inventory.html', () => {

  });
}

/**
 * Show list of jobs view
 */
$('#btnShowJobsList').on('click', () => {
  $('#main-container').load('pages/jobs_list.html', () => {

  });
});

/**
 * Show list of transactions view
 */
$('#btnShowTransactions').on('click', function () {
  $('#main-container').load('pages/transactions.html', () => {

  });
});

/**
 * 
 */
$('#btnShowWorkOrders').on('click', () => {
  $('#main-container').load('pages/work_orders.html', () => {

  });
});