const db = require('electron-db');

  if (!$('#err-alert').hasClass('hidden')) {
    $('#err-alert').addClass('hidden');
  }

  function addNewCustomer(){
    var name = $('#customer-name').val();
    var address = $('#customer-address').val();

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