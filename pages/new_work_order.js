const constant = require('./constants.js');
const db = require('electron-db');

let selectedCustomer;

/**
 * Get the currently selected customer
 */
db.getRows('app', { 'cat': 'settings' }, (succ, data) => {
  if (succ) {
    if (data[0].hasOwnProperty('selectedCustomer')) {
      let row = data[0];
      let customerId = row.selectedCustomer;
      selectedCustomer = customerId;
      // Retrive customer informations
      let customer;

      db.getRows(constant.customersTable, { 'id': customerId }, (succ, customerResult) => {
        if (succ) {
          $('#customer-name').html(customerResult[0].name);

          // Retrieve customer vehicles
          retrieveCustomerVehicles();
        }
      })

    }
  }
});

function retrieveCustomerVehicles() {
  let vehicles = [];
  db.getRows(constant.vehiclesTable, { 'customer': selectedCustomer }, (succ, vehiclesList) => {
    if (succ) {

      // Check if customer has vehicle/s registered
      if (vehiclesList.length > 0) {
        let optionsString = '';

        for (let i = 0; i < vehiclesList.length; i++) {
          optionsString += '<option value="'+ vehiclesList[i].id +'">'+ vehiclesList[i].make + ' ' + vehiclesList[i].model + ' ' +  
            vehiclesList[i].plate_number +'</option>';
        }

        $('#vehicle').html(optionsString);
      } else {
        alert('The selected customer has no registered vehicle on this shop. Add vehicle first before creating a work order for this customer.');
        // Load the customer detail view
        $('#main-container').load('pages/customer_detail.html', () => {
        });
      }
    }
  });
}