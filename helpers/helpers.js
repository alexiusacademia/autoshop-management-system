const electron = require('electron');
const db = require('electron-db');
const path = require('path');
const fs = require('fs');

exports.getAppDataPath = function() {
  return (electron.app || electron.remote.app).getPath('userData');
};


exports.getRowField = (table, field) => {
  db.getRows(table, field, (succ, data) => {
    if (succ) {
      return data[0];
    }
  });
};

