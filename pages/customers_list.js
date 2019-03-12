const db = require('electron-db');

listCustomers();

let selectedCustomer;
/**
 * List all the customers
 */
function listCustomers() {
  let customersList;
  db.getAll('customers', (succ, data) => {
    customersList = data;
  });

  var tblString = '';
  for (var i = 0; i < customersList.length; i++) {
    tblString += '<tr class="main-container">';
    tblString += '<td>' + customersList[i].name + '</td>';
    tblString += '<td>' + customersList[i].address + '</td>';
    tblString += '<td>' + customersList[i].id + '</td>';
    tblString += '<td><a class="btn btn-default" href="#" id="' + customersList[i].id + '" onclick="showCustomerDetails(this)">Details</a></td>';
    tblString += '</tr>';
  }

  document.getElementById('table-customers').innerHTML = tblString;
}

/**
 * Function when add customer button is clicked
 */
function showAddCustomerWindow() {
  $('#main-container').load('pages/add_customer.html', () => {

  });
}

/**
 * Function when the show detail link is clicked for a specific customer
 * @param {event} event 
 */
function showCustomerDetails(event) {
  // Set the selected customer in the local file
  // Make the id an Int
  db.updateRow('app', { 'cat': 'settings' }, { 'selectedCustomer': parseInt(event.id) }, () => {
  });

  // Load the customer detail view
  $('#main-container').load('pages/customer_detail.html', () => {

  });
}

$('#search').keyup(() => {
  // Get the search text
  let searchString = $('#search').val();
  
  db.search('customers', 'name', searchString, (succ, data) => {
    if (succ) {
      var tblString = '';
      for (var i = 0; i < data.length; i++) {
        tblString += '<tr class="main-container">';
        tblString += '<td>' + data[i].name + '</td>';
        tblString += '<td>' + data[i].address + '</td>';
        tblString += '<td>' + data[i].id + '</td>';
        tblString += '<td><a class="btn btn-default" href="#" id="' + data[i].id + '" onclick="showCustomerDetails(this)">Details</a></td>';
        tblString += '</tr>';
      }
    
      document.getElementById('table-customers').innerHTML = tblString;
    }else{
      console.log('Error retrieving result.');
    }
  })

});
