// Require electron-db
const db = require('electron-db');

showItemsList();

function showItemsList() {
  let items;
  db.getAll('items', (succ, data) => {
    if (succ) {
      items = data;
    }
  });

  if (items !== null) {
    if (items.length > 0) {
      var tblString = '';
      for (var i = 0; i < items.length; i++) {
        tblString += '<tr>';
        tblString += '<td>' + items[i].item_name + '</td>';
        tblString += '<td>' + items[i].item_description + '</td>';
        tblString += '<td>' + items[i].item_unit + '</td>';
        tblString += '<td>' + items[i].item_quantity + '</td>';
        tblString += '<td>' + currencyFormat(items[i].buying_price) + '</td>';
        tblString += '<td>' + currencyFormat(items[i].selling_price) + '</td>';
        tblString += '<td><a class="btn btn-default" href="#" id="' + items[i].id + '" onclick="showEditItemView(this)">Edit</a></td>';
        tblString += '</tr>';
      }
    
      $('#table-items').html(tblString);
    }
  }
}


/**
 * When add new item page is clicked
 */
$('#btn-add-item-page').on('click', () => {
  // Show add item page
  $('#main-container').load('pages/add_item.html', () => {
  });
});

/**
 * Function when the show edit item link is clicked for a specific item
 * @param {*} event 
 */
function showEditItemView(event) {
  // Set the selected customer in the local file
  // Make the id an Int
  db.updateRow('app', { 'cat': 'settings' }, { 'selectedItem': parseInt(event.id) }, () => {
  });

  // Load the customer detail view
  $('#main-container').load('pages/edit_item.html', () => {

  });
}

/**
 * Function to format number to currency.
 * @param {*} num [Number to be formatted]
 */
function currencyFormat (num) {
  return "\u20B1 " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}