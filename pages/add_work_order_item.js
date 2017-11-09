const db = require('electron-db');
const constant = require('./constants');

// Load the items list
db.getAll(constant.itemsTable, (succ, items) => {
  if (succ) {
    // String for the table body
    let tblString = '';

    for (let i = 0; i < items.length; i++) {
      tblString += '<tr>';
      tblString += '  <td>'+ items[i].item_name +'</td>';
      tblString += '  <td>'+ items[i].item_description +'</td>';
      tblString += '  <td>'+ items[i].selling_price +'</td>';
      tblString += '  <td><input class="form-control" id="quantity-item-"'+ items[i].id +' type="text" name="" placeholder="Quantity"></td>';
      tblString += '  <td><a href="#" id="'+ items[i].id +'" onclick="insertItem(this)">Add</a></td>';
      tblString += '</tr>';
    }

    $('#table-items').html(tblString);
  }
});


function insertItem(sender) {
  // Get the item id
  let selectedItem = sender.id;

  // Get the quantity
  let itemQuantity = $('#quantity-item-' + selectedItem).val();
  console.log(itemQuantity);
}