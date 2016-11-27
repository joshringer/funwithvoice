//Inspiration: https://github.com/cwilso/Vocoder/
define(function(require) {
  BAND_FILTER_Q = 6;
  
  function createBands(audioCtx, bandCount, loFq, hiFq) {
    var bandArray = new Array();
    var centRange = 1200 * Math.log( hiFq / loFq ) / Math.LN2;
    var fqScale = Math.pow( 2, centRange / (1200 * bandCount) );
    var freq = loFq;
    for (var band = 0; band < bandCount; band++) {
      var filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = freq;
      filter.Q.value = BAND_FILTER_Q;
      bandArray.push(filter);
      
      freq = freq * fqScale;
    }
    return bandArray;
  }
  
  return {
    createBands: createBands
  }
});