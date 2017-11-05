// Require electron-db
const db = require('electron-db');

// Load the table contents
db.getAll('work_orders', (succ, data) => {
  let workOrders;
  if (succ) {
    workOrders = data;
  }
});

/**
 * When new work order button is clicked
 */
$('#btn-new-work-order').on('click', () => {
  // Show new work order page
  $('#main-container').load('pages/new_work_order.html', () => {
  });
});