const db = require('electron-db');
/**
 * When add new customer is clicked
 */
function addNewCustomer() {
  var name = $('#customer-name').val();
  var address = $('#customer-address').val();

  if (!$('#err-alert').hasClass('hidden')) {
    $('#err-alert').addClass('hidden');
  }

  var customer = new Object();
  customer.name = name;
  customer.address = address;

  db.insertTableContent('customers', customer, (succ, msg) => {
    $('#err-alert').removeClass('hidden');
    if (succ) {
      $('#err-alert').addClass('alert-success');
      $('#err-alert').html("Customer added successfully!");
    } else {
      $('#err-alert').addClass('alert-danger');
      $('#err-alert').html("Error adding the customer. Please contact administrator.");
    }
  });
}