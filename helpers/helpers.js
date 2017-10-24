const electron = require('electron');
const path = require('path');
const fs = require('fs');

exports.getAppDataPath = function() {
  return (electron.app || electron.remote.app).getPath('userData');
};

