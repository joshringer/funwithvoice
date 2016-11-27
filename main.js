requirejs.config({
  baseUrl: 'lib',
  paths: {
    app: '../app',
    jquery: 'jquery-3.1.1.min'
  }
});

requirejs(['app']);