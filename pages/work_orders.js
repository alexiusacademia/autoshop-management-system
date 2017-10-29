// Require electron-db
const db = require('electron-db');

// Load the table contents
db.getAll('work_orders', (succ, data) => {
  let workOrders;
  if (succ) {
    workOrders = data;
    console.log(workOrders);
  }
});