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

/**
 * Retrieve customer vehicles
 */
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

$('#btn-create-work-order').on('click', () => {
  let wo = new Object();  // Create work order object
  let woDate = $('#date').val();

  if (validateDate(woDate)) {
    wo.customer = selectedCustomer;
    wo.date = woDate;
    wo.vehicle = parseInt($('#vehicle').val());

    db.insertTableContent(constant.workordersTable, wo, (succ, msg) => {
      if (!$('#err-alert').hasClass('hidden')) {
        $('#err-alert').addClass('hidden');
      }

      $('#err-alert').removeClass('hidden');

      if (succ) {
        $('#err-alert').addClass('alert-success');
        $('#err-alert').html("Work order created.");
      } else {
        $('#err-alert').addClass('alert-danger');
        $('#err-alert').html("Error creating work order.");
      }
    });
  } else {

    return;
  }
  
});

$('#date').datepicker({});

/**
 * Validate date string format.
 * @param {*} dateValue 
 */
function validateDate(dateValue)
{
    var selectedDate = dateValue;
    if(selectedDate == '')
        return false;

    var regExp = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; //Declare Regex
    var dateArray = selectedDate.match(regExp); // is format OK?

    if (dateArray == null){
        return false;
    }

    month = dateArray[1];
    day= dateArray[3];
    year = dateArray[5];        

    if (month < 1 || month > 12){
        return false;
    }else if (day < 1 || day> 31){ 
        return false;
    }else if ((month==4 || month==6 || month==9 || month==11) && day ==31){
        return false;
    }else if (month == 2){
        var isLeapYear = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        if (day> 29 || (day ==29 && !isLeapYear)){
            return false
        }
    }
    return true;
}