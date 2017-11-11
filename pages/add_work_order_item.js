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
  itemQuantity = parseInt(itemQuantity);

  // Check if quantity is an integer
  if (Number.isInteger(parseInt(itemQuantity))) {
    // Get the stock
    let stock = getItemStock(selectedItem);

    // Check if item is less than or equal to stock
    if (itemQuantity > stock) {
      alert('Item quantity entered is greater than the stock! Please review the quantity or add quantity on the item.');
    } else {
      // Create object
      let itemObject = new Object();
      itemObject.id = parseInt(selectedItem);
      itemObject.quantity = itemQuantity;
      itemObject.unit_price = getItemUnitPrice(selectedItem);

      db.getRows(constant.appTable, { 'cat': 'settings' }, (succ, app) => {
        if (succ) {
          let selectedWorkOrder = app[0].selected_work_order;
          let workOrder;
          let items;
          db.getRows(constant.workordersTable, { 'id': selectedWorkOrder }, (succ, workOrders) => {
            if (succ) {
              workOrder = workOrders[0];
              if (workOrder.hasOwnProperty('items')) {
                items = workOrder.items;
                items.push(itemObject);
                db.updateRow(constant.workordersTable, { 'id': selectedWorkOrder }, { 'items': items }, (succ, msg) => {
                  if (succ) {
                    // Go back to update work order view
                    $('#main-container').load('pages/work_order_update.html', () => {

                    });
                  }
                });
              } else {
                items = [];
                items.push(itemObject);
                db.updateRow(constant.workordersTable, { 'id': selectedWorkOrder }, { 'items': items }, (succ, msg) => {
                  if (succ) {
                    // Go back to update work order view
                    $('#main-container').load('pages/work_order_update.html', () => {
                      
                    });
                  }
                });
              }
              reduceItemQuantity(selectedItem, itemQuantity);
            }
          });

        } else {
          alert('Error connecting to the app table from the database.');
        }
      });
    }
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
      if (items.length > 0) {
        let item = items[0];
        stock = item.item_quantity;
      } else {
        stock = 0;
      }
    }
  });
  return stock;
}

/**
 * Function to get the selling price of the item
 * @param {*} itemId 
 */
function getItemUnitPrice(itemId) {
  itemId = parseInt(itemId);
  let price = 0.0;

  db.getRows(constant.itemsTable, { 'id': itemId }, (succ, items) => {
    if (succ) {
      if (items.length > 0) {
        let item = items[0];
        price = item.selling_price;
      } else {
        alert('There are no more stock for this item!');
      }
    }
  });

  return price;
}

/**
 * Get the item name
 * @param {*} itemId 
 */
function getItemName(itemId) {
  itemId = parseInt(itemId);
  let name = '';

  db.getRows(constant.itemsTable, { 'id': itemId }, (succ, items) => {
    if (succ) {
      if (items.length > 0) {
        let item = items[0];
        name = item.item_name;
      } else {
        alert('The are no more stock for this item!');
      }
    } else {
      alert('Error retrieving item name.');
    }
  });

  return name;
}

/**
 * Reducing item quantity from the database table
 * @param {*} itemId 
 * @param {*} deduction 
 */
function reduceItemQuantity(itemId, deduction){
  itemId = parseInt(itemId);
  let stock = getItemStock(itemId);
  let newStock = stock - deduction;
  let itemName = getItemName(itemId);
  let itemUnitPrice = getItemUnitPrice(itemId);
  // Update the item table
  db.updateRow(constant.itemsTable, {'id': itemId}, {'item_quantity': newStock}, (succ, msg) => {
    if (succ) {
      // Insert record into transaction table, create new transaction
      let transaction = {
        'title': 'Subtracting item',
        'description': itemName,
        'expenses': 0.0,
        'sales': itemUnitPrice * deduction,
        'remarks': 'Subtract item quantity from inventory.'
      };
      db.insertTableContent('transactions', transaction, (succ, msg) => {
        if (succ) {

        } else {
          alert(msg);
        }
      });
    }
  });
}