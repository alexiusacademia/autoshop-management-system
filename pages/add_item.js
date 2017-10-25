// Require electron-db
const db = require('electron-db');

/**
 * When add new item is clicked
 */
$('#btn-new-item').on('click', () => {
  if (!$('#err-alert').hasClass('hidden')) {
    $('#err-alert').addClass('hidden');
  }

  // Get inputs
  let itemName = $('#item-name').val();
  let itemDescription = $('#item-description').val();
  let unit = $('#unit').val();
  let quantity = $('#quantity').val();
  let buyingPrice = $('#buying-price').val();
  let sellingPrice = $('#selling-price').val();

  // Validate inputs
  if (itemName === '') {
    $('#err-alert').removeClass('hidden');
    $('#err-alert').addClass('alert-danger');
    $('#err-alert').html("Item Name cannot be empty!");
    return;
  }

  if (unit === '') {
    $('#err-alert').removeClass('hidden');
    $('#err-alert').addClass('alert-danger');
    $('#err-alert').html("Unit must be specified.");
    return;
  }

  if (!Number.isInteger(parseInt(quantity))) {
    $('#err-alert').removeClass('hidden');
    $('#err-alert').addClass('alert-danger');
    $('#err-alert').html("Quantity must be numeric. Put zero if there is no quantity to put in.");
    return;
  }

  if (!parseFloat(buyingPrice)) {
    $('#err-alert').removeClass('hidden');
    $('#err-alert').addClass('alert-danger');
    $('#err-alert').html("Buying price should be an amount and cannot be empty. Put zero if the amount is zero.");
    return;
  }

  if (!parseFloat(sellingPrice)) {
    $('#err-alert').removeClass('hidden');
    $('#err-alert').addClass('alert-danger');
    $('#err-alert').html("Selling price should be an amount and cannot be empty. Put zero if the amount is zero.");
    return;
  }

  let item = {
    "item_name": itemName,
    "item_description": itemDescription,
    "item_unit": unit,
    "item_quantity": parseInt(quantity),
    "buying_price": parseFloat(buyingPrice),
    "selling_price": parseFloat(sellingPrice)
  }

  db.insertTableContent('items', item, (succ, msg) => {
    if (succ) {
      $('#err-alert').removeClass('hidden');
      $('#err-alert').addClass('alert-success');
      $('#err-alert').html("Item added successfully!");
    } else {
      $('#err-alert').removeClass('hidden');
      $('#err-alert').addClass('alert-danger');
      $('#err-alert').html("Error adding item. Please contact the administrator.");
    }
  });

});