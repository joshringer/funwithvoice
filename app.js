define(function(require){
  log = require('log');
  jquery = require('jquery');
  visualizer = require('visualizer');
  vocoder = require('vocoder');
  
  // create audio context
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  // create components
  var analyser = audioCtx.createAnalyser();
  var bandFilters = vocoder.createBands(audioCtx, 32, 20, 20000);

  // stupid browser prefixes
  navigator.getUserMedia = (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
  );

  // this is where the audio stuff is activated
  if (navigator.getUserMedia) {
     log.info('getUserMedia is go!');
     navigator.getUserMedia (
        // constraints - only audio needed for this app
        {
           audio: true
        },

        // Success callback; get the stream and do stuff!
        function(stream) {
          // connect components together
          voice = audioCtx.createMediaStreamSource(stream);
          voice.connect(analyser);
          jquery.each(bandFilters, function (ind, filter) {
            log.info(filter);
            analyser.connect(filter);
            filter.connect(audioCtx.destination);
          });
          
          // configure the components
          visualizer.visualize('#visualizer', analyser);
        },

        // Error callback
        function(err) {
           log.error('getUserMedia error:', err);
        }
     );
  } else {
     log.error('Sorry, you need a better browser :(');
  }

});