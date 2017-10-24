const db = require('electron-db');

/**
 * When add new job button is clicked
 */
$('#btn-new-job').on('click', () => {
  if (!$('#err-alert').hasClass('hidden')) {
    $('#err-alert').addClass('hidden');
  }

  // Get the inputs
  let jobName = $('#job-name').val();
  let jobDescription = $('#job-description').val();
  let jobCost = $('#job-cost').val();

  // Check pre-requisite
  if (jobName === "") {
    $('#err-alert').removeClass('hidden');
    $('#err-alert').addClass('alert-danger');
    $('#err-alert').html("Job Name cannot be empty!");
    return;
  }

  // Check if job cost is floating point
  if (parseFloat(jobCost)) {
    let job = {
      'job_name': jobName,
      'job_description': jobDescription,
      'job_cost': jobCost
    }
    db.insertTableContent('jobs', job, (succ, msg) => {
      if (succ) {
        $('#err-alert').removeClass('hidden');
        $('#err-alert').addClass('alert-success');
        $('#err-alert').html("Job added successfully!");
      } else {
        $('#err-alert').removeClass('hidden');
        $('#err-alert').addClass('alert-danger');
        $('#err-alert').html("Error adding job. Please contact the administrator.");
      }
    })
  } else {
    $('#err-alert').removeClass('hidden');
    $('#err-alert').addClass('alert-danger');
    $('#err-alert').html("Job Cost cannot be empty and should be a valid number.");
    return;
  }
});