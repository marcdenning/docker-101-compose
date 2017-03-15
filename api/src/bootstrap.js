'use strict';

const NodeESModuleLoader = require('node-es-module-loader');

const loader = new NodeESModuleLoader('./src');

loader.import('./index').then(function(indexModule) {
  indexModule.default();
});
