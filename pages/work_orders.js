const db = require('electron-db');
const constant = require('./constants.js');
const helpers = require('./helpers/helpers');

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

/**
 * Load the work orders list
 */
db.getAll(constant.workordersTable, (succ, data) => {
  if (succ) {
    if (data.length > 0) {

      var tblString = '';
      for (var i = 0; i < data.length; i++) {
        let customer;
        db.getRows(constant.customersTable, { "id": data[i].customer }, (succ, customers) => {
          if (succ) {
            customer = customers[0];
          }
        })

        const customerName = customer.name;

        tblString += '<tr>';
        tblString += '<td>' + data[i].id + '</td>';
        tblString += '<td>' + data[i].date + '</td>';
        tblString += '<td>' + customerName + '</td>';
        tblString += '<td><a class="btn btn-default" href="#" id="' + data[i].id + '" onclick="showWorkOrderDetail(this)">Edit</a></td>';
        tblString += '</tr>';
      }

      $('#table-work-orders').html(tblString);

    } else {
      alert('Work orders list is empty.');
    }
  } else {
    console.log('Error connecting to work orders table.');
    return;
  }
});

/**
 * Function when edit button is clicked.
 * @param {*} sender 
 */
function showWorkOrderDetail(sender) {
  db.updateRow(constant.appTable, { 'cat': 'settings' }, { 'selected_work_order': parseInt(sender.id) }, (succ, msg) => {
    if (succ) {
      // Show edit work order page
      $('#main-container').load('pages/work_order_update.html', () => {
      });
    }
  });
}