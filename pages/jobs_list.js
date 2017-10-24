const db = require('electron-db');

displayJobs();

function displayJobs() {
  let jobsList;
  db.getAll('jobs', (succ, data) => {
    if (succ) {
      jobsList = data;
    } else {
      console.log('Cannot load data.');
      return;
    }
  });

  let tblString = '';
  if (jobsList.length > 0) {
    for (let i = 0; i < jobsList.length; i++) {
      tblString += '<tr>';
      tblString += '  <td>' + jobsList[i].job_name + '</td>';
      tblString += '  <td>' + jobsList[i].job_description + '</td>';
      tblString += '  <td>' + currencyFormat(jobsList[i].job_cost) + '</td>';
      tblString += '</tr>';
    }
  }

  document.getElementById('table-jobs').innerHTML = tblString;
}

/**
 * When add new job button is clicked
 * Open the form for adding new job
 */
$('#btn-add-job').on('click', () => {
  // Load the add new job view
  $('#main-container').load('pages/add_job.html', () => {
  });
});

/**
 * Function to format number to currency.
 * @param {*} num [Number to be formatted]
 */
function currencyFormat (num) {
  return "\u20B1 " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}