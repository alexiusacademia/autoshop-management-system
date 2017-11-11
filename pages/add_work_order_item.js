const db = require('electron-db');
const constant = require('./constants');

// Load the items list
db.getAll(constant.itemsTable, (succ, items) => {
  if (succ) {
    // String for the table body
    let tblString = '';

    for (let i = 0; i < items.length; i++) {
      tblString += '<tr>';
      tblString += '  <td>' + items[i].item_name + '</td>';
      tblString += '  <td>' + items[i].item_description + '</td>';
      tblString += '  <td>' + items[i].selling_price + '</td>';
      tblString += '  <td>' + items[i].item_quantity + '</td>';
      tblString += '  <td><input class="form-control" id="quantity-item-' + items[i].id.toString() + '" type="text" name="" placeholder="Quantity"></td>';
      tblString += '  <td><a class="btn btn-info" href="#" id="' + items[i].id + '" onclick="insertItem(this)">Add</a></td>';
      tblString += '</tr>';
    }

    $('#table-items').html(tblString);
  }
});

/**
 * Insert item to the work order
 * @param {*} sender 
 */
function insertItem(sender) {
  // Get the item id
  let selectedItem = sender.id;

  // Get the quantity
  let itemQuantity = $('#quantity-item-' + selectedItem).val();

  // Check if quantity is an integer
  if (Number.isInteger(parseInt(itemQuantity))) {
    // Get the stock
    let stock = getItemStock(selectedItem);
    console.log(stock);
  }
}

/**
 * Get the item stock
 * @param {*} itemId 
 */
function getItemStock(itemId) {
  itemId = parseInt(itemId);
  let stock = 0;
  db.getRows(constant.itemsTable, { 'id': itemId }, (succ, items) => {
    if (succ) {
      console.log('Item ID: ' + itemId);
      console.log('Retrieving items...');
      if (items.length > 0) {
        let item = items[0];
        stock = item.item_quantity;
      } else {
        console.log('No item with this id.');
        stock = 0;
      }
    }
  });
  return stock;
}