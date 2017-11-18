const db = require('electron-db');
const constant = require('./constants.js');

let work_order_id;

// Get the selected work order id
db.getRows(constant.appTable, { 'cat': 'settings' }, (succ, appSettings) => {
  if (succ) {
    work_order_id = appSettings[0].selected_work_order;
    $('#wo-number').text(work_order_id);
  } else {
    alert("There is an error connecting to the table.");
    return;
  }
})

// Get the specified work order from the database
db.getRows(constant.workordersTable, { 'id': work_order_id }, (succ, workOrders) => {
  if (succ) {
    let wo = workOrders[0];

    // Display date created
    $('#date-created').text(wo.date);

    // Get the vehicle information
    let vehicle;

    db.getRows(constant.vehiclesTable, { 'id': wo.vehicle }, (succ, rows) => {
      if (succ) {
        vehicle = rows[0];

        // Display vehicle informations
        $('#plate-number').html(vehicle.plate_number);
        $('#vehicle').html(vehicle.make + " " + vehicle.model);
      }
    });

    // Get the list of jobs
    if (wo.hasOwnProperty('jobs')) {
      let jobs = wo.jobs;

      if (jobs.length > 0) {

        let jobsDetail = [];

        for (let i = 0; i < jobs.length; i++) {
          let job = jobs[i];
          db.getRows(constant.jobsTable, { 'id': job }, (succ, data) => {
            if (succ) {
              jobsDetail.push(data[0]);
            }
          });
        }

        let jobsCost = 0.0;
        let tblString = '';
        for (let j = 0; j < jobsDetail.length; j++) {
          tblString += '<tr>';
          tblString += '  <td>' + jobsDetail[j].job_name + '</td>';
          tblString += '  <td>' + jobsDetail[j].job_description + '</td>';
          tblString += '  <td>' + currencyFormat(jobsDetail[j].job_cost) + '</td>';
          tblString += '</tr>';
          jobsCost += jobsDetail[j].job_cost
        }

        // Display sub total for jobs
        $('#sub-total-jobs').text('Sub Total: ' + currencyFormat(jobsCost));

        // Display the table body
        $('#table-jobs').html(tblString);

      }

    } else {
      console.log('No jobs included in the work order.');
    }

    // Get the list of items
    if (wo.hasOwnProperty('items')) {
      let itemsCount = wo.items.length;
      if (itemsCount > 0) {

      } else {
        console.log('No items in the list.');
      }
    }

  } else {
    alert('Error loading work order data.');
  }
});

/**
 * When add job is clicked
 */
$('#btn-add-job').on('click', () => {
  // Load the add job view
  $('#main-container').load('pages/add_work_order_job.html', () => {

  });
});

/**
 * Function to format number to currency.
 * @param {*} num [Number to be formatted]
 */
function currencyFormat(num) {
  return "\u20B1 " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

/**
 * When add item is clicked
 */
$('#btn-add-item').on('click', () => {
  // Load the add item view
  $('#main-container').load('pages/add_work_order_item.html', () => {

  });
});