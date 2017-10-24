const db = require('electron-db');

/**
 * When the add vehicle button is clicked
 */
$('#btn-new-vehicle').on('click', function() {
  // Get all the input contents
  let vehicle_plate_number = $('#vehicle-plate-number').val();
  let vehicle_make = $('#vehicle-make').val();
  let vehicle_model = $('#vehicle-model').val();
  let vehicle_model_year = $('#vehicle-model-year').val();
  let vehicle_type = $('#vehicle-type').val();

  if (!$('#err-alert').hasClass('hidden')) {
    $('#err-alert').addClass('hidden');
  }

  // Get the customer from the selected customer
  let customerId;
  db.getRows('app', { 'cat': 'settings' }, (succ, rows) => {
      if (succ) {
          customerId = rows[0].selectedCustomer;
      } else {
          console.log("Error loading Id.");
      }
  });

  // Create new vehicle object
  let vehicle = {
    "plate_number": vehicle_plate_number,
    "customer": customerId,
    "make": vehicle_make,
    "model": vehicle_model,
    "model_year": vehicle_model_year
  }

  db.insertTableContent('vehicles', vehicle, (succ, msg) => {
    $('#err-alert').removeClass('hidden');
    if (succ) {
      $('#err-alert').addClass('alert-success');
      $('#err-alert').html("Vehicle added successfully!");
    } else {
      $('#err-alert').addClass('alert-danger');
      $('#err-alert').html("Error adding the vehicle. Please contact administrator.");
    }
  });
});