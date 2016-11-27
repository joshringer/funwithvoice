define({
  error: function(){ console.log('Error:', ...arguments); },
  warn: function(){ console.log('Warn:', ...arguments); },
  info: function(){ console.log('Info:', ...arguments); },
});