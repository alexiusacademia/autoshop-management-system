const db = require('electron-db');

// Call function to load the details
loadCustomerDetails();

/**
 * Function to load the details
 */
function loadCustomerDetails() {
    let customerId;
    db.getRows('app', { 'cat': 'settings' }, (succ, rows) => {
        if (succ) {
            customerId = rows[0].selectedCustomer;
        } else {
            console.log("Error loading Id.");
        }
    });


    let basicDetails;   // Variable to hold the customer object

    db.getRows('customers', { 'id': customerId }, (succ, rows) => {
        if (succ) {
            basicDetails = rows[0];

            let basicDetailsKeys = Object.keys(basicDetails);
            // Get the keys for the above object
            let tblString = '';

            // Generate rows for the basic customer data
            for (let i = 0; i < basicDetailsKeys.length; i++) {
                tblString += '<tr>';
                tblString += '  <td>';
                tblString += jsUCFirst(basicDetailsKeys[i]);
                tblString += '  </td>';
                tblString += '  <td>';
                tblString += basicDetails[basicDetailsKeys[i]];
                tblString += '  </td>';
                tblString += '</tr>';
            }

            // Get the number of vehicles
            let numberOfVehicles = 0;
            db.getRows('vehicles', { 'customer': customerId }, (succ, data) => {
                numberOfVehicles = data.length;
            });

            tblString += '<tr>';
            tblString += '  <td>';
            tblString += '  Number of Vehicles'
            tblString += '  </td>';
            tblString += '  <td>';
            tblString += numberOfVehicles;
            tblString += '  </td>';
            tblString += '</tr>';

            document.getElementById('customer-details-list').innerHTML = tblString;

        } else {
            console.log("Error loading data.");
        }
    });
}

/**
 * Javascript ucfirst equivalent in PHP
 * @param {*} string 
 */
function jsUCFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * When button add vehicle is clicked
 */
$('#btn-add-vehicle').on('click', () => {
    // Load the add vehicle view
    $('#main-container').load('pages/add_vehicle.html', () => {

    });
});