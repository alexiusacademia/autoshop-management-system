const db = require('electron-db');
const constant = require('./constants.js');

let work_order_id;

// Get the selected work order id
db.getRows(constant.appTable, {'cat': 'settings'}, (succ, appSettings) => {
  if (succ) {
    work_order_id = appSettings[0].selected_work_order;
    $('#wo-number').text(work_order_id);
  } else {
    alert("There is an error connecting to the table.");
    return;
  }
})

db.getRows(constant.workordersTable, {'id': work_order_id}, (succ, workOrders) => {
  if (succ) {
    let wo = workOrders[0];

    $('#date-created').text(wo.date);

  } else {
    alert('Error loading work order data.');
  }
});