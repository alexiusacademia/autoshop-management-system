$('#btn-add-job').on('click', () => {
  // Load the add new job view
  $('#main-container').load('pages/add_job.html', () => {

  });
});