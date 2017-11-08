const db = require('electron-db');
const constant = require('./constants.js');

// Load the table contents automatically
db.getAll(constant.jobsTable, (succ, rows) => {
  if (succ) {
    if (rows.length > 0) {

      let tblString = '';
      for (let i = 0; i < rows.length; i++) {
        tblString += '<tr>';
        tblString += '  <td>' + rows[i].job_name + '</td>';
        tblString += '  <td>' + rows[i].job_description + '</td>';
        tblString += '  <td>' + currencyFormat(rows[i].job_cost) + '</td>';
        tblString += '  <td><a href="#" onclick="insertJob(this)" id="' + rows[i].id + '">Select</a></td>';
        tblString += '</tr>';
      }

      $('#table-jobs').html(tblString);
    } else {
      console.log('No data');
    }
  } else {
    console.log('Error retrieving data from the database.');
  }
});

/**
 * When insert link is clicked. Add the job to the job list of the work order
 * @param {*} sender 
 */
function insertJob(sender) {
  // First get the job list from the selected work order
  // Get the work order id selected
  let selectedWorkOrder;
  db.getRows(constant.appTable, { 'cat': 'settings' }, (succ, rows) => {
    if (succ) {
      selectedWorkOrder = rows[0].selected_work_order;

      let jobs;

      db.getRows(constant.workordersTable, { 'id': selectedWorkOrder }, (succ, jobsList) => {
        if (succ) {
          jobs = jobsList[0];
          if (jobs.hasOwnProperty('jobs')) {
            // If the jobs list exist in the object
            jobs = jobs.jobs;
            jobs.push(parseInt(sender.id));
            db.updateRow(constant.workordersTable, { 'id': selectedWorkOrder }, { 'jobs': jobs }, (succ, msg) => {
              if (succ) {
                // Go back to update work order view
                $('#main-container').load('pages/work_order_update.html', () => {

                });
              }
            });
          } else {
            jobs = [];
            jobs.push(parseInt(sender.id));
            db.updateRow(constant.workordersTable, { 'id': selectedWorkOrder }, { 'jobs': jobs }, (succ, msg) => {
              if (succ) {
                // Go back to update work order view
                $('#main-container').load('pages/work_order_update.html', () => {

                });
              }
            });
          }
        }
      });

    } else {
      return;
    }
  });
}

/**
 * Function to format number to currency.
 * @param {*} num [Number to be formatted]
 */
function currencyFormat(num) {
  return "\u20B1 " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}