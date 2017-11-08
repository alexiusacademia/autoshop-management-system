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

// Get the specified work order from the database
db.getRows(constant.workordersTable, {'id': work_order_id}, (succ, workOrders) => {
  if (succ) {
    let wo = workOrders[0];

    // Display date created
    $('#date-created').text(wo.date);

    // Get the vehicle information
    let vehicle;

    db.getRows(constant.vehiclesTable, {'id': wo.vehicle}, (succ, rows) => {
      if (succ) {
        vehicle = rows[0];

        // Display vehicle informations
        $('#plate-number').html(vehicle.plate_number);
        $('#vehicle').html(vehicle.make + " " + vehicle.model);
      }
    });

  } else {
    alert('Error loading work order data.');
  }
});

