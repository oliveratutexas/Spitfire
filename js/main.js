const rhymes = require('./custom-rhymes.js');

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
var final_transcript;

recognition.onstart = function() { console.log('started'); }
recognition.onspeechend = function() {
    console.log("SPEECH ENDED!")
}
recognition.onresult = function(event) {
    console.log('result', event);

    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
        console.log('final transcript', final_transcript);
      } else {
        interim_transcript += event.results[i][0].transcript;
        console.log('interim transcript', interim_transcript);
        var w = interim_transcript.split(/\s+/)[interim_transcript.split(/\s+/).length - 1];
        firstWordNode.textContent = (rhymes.rhymes(w)[0] && rhymes.rhymes(w)[0].word) + '.....' + (rhymes.rhymes(w)[1] && rhymes.rhymes(w)[1].word);
      }
    }

    final_transcript = final_transcript;

    // final_span.innerHTML = linebreak(final_transcript);
    // var time = 0;
    // setTimeout(function() {
    //     console.log(time);
    //     time += 2900;
    //     var w = interim_transcript.split(/\s+/)[interim_transcript.split(/\s+/).length - 1];
    //     firstWordNode.textContent = (rhymes.rhymes(w)[0] && rhymes.rhymes(w)[0].word) + '.....' + (rhymes.rhymes(w)[1] && rhymes.rhymes(w)[1].word);
    // }, 2900);
};

recognition.onerror = function(event) {console.log('error', event)}
recognition.onend = function() {console.log('end')}

var startListening = function() {
    final_transcript = '';
    recognition.start();
};

var handleStartButtonClick = function(e) {
    startListening();
};

var suggestionsNode = document.querySelector('.suggestions');
var firstWordNode = suggestionsNode.querySelector('.first');
var secondWordNode = suggestionsNode.querySelector('.second');
var thirdWordMode = suggestionsNode.querySelector('.third');
var startButton = document.querySelector('#start');

startButton.addEventListener('click', handleStartButtonClick);

var updateSuggestions = function(arr) {
    firstWordNode.textContent = arr[0];
    secondWordNode.textContent = arr[1];
    thirdWordMode.textContent = arr[2];
};

var word = 'time';

var words = rhymes.rhymes(word).map(function(obj) {
    return obj.word;
}).slice(0,3);

updateSuggestions(words);

var startScope = function(){


var signals = [
  {key: "ardumower",       value:[1, 1, -1, -1, 1, -1, 1, -1, -1, 1, -1, 1, 1, -1, -1, 1, -1, -1, 1, -1, -1, 1, 1, -1]},
  {key: "ardumower_diff",  value:[1, 0, -1,  0, 1, -1, 1, -1,  0, 1, -1, 1, 0, -1,  0, 1, -1,  0, 1, -1,  0, 1, 0, -1]},  
  {key: "developer_test_diff",  value:[ 1,-1,0,0,0,
                                        1,-1,0,0,0,
                                       -1, 1,0,0,0,
                                        1,-1,0,0,0 ]},
  {key: "robomow_rl500", value:[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                                 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                                 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                                 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                                 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                                 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                                 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                                 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                                 1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,
                                 1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,
                                 1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,
                                 1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,
                                 1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,
                                 1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,
                                 1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,
                                 1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,
                                 -1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,
                                 -1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,
                                 -1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,
                                 -1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,
                                 -1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,
                                 -1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,
                                 -1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,
                                 -1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,  -1,-1  
                                ]},
];          
        
// fork getUserMedia for multiple browser versions, for those
// that need prefixes

/*navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);*/

// set up forked web audio context, for multiple browsers
// window. is needed otherwise Safari explodes

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioCtx = new AudioContext();

var templateSelect = null;
var toneSelect = null;
var signalSelect = null;
var toneShapeSelect = null;
var timeScaleSelect = null;
var ampScaleSelect = null;
var mathSelect = null; 
var triggerLevelInput = null;
var triggerSignalInput = null;
var triggerThresInput = null;
var triggerModeSelect = null;
var fftmindb = null;
var fftmaxdb = null;
var fftsmooth = null;
var filterSelect = null;
var filterQualityInput = null;
var filterFreqInput = null;
var filterGainInput = null;
var timeOfsInput = null;
var source;
var stream;
var timeScale = 1.0;
var timeOfs = 0;
var ampScale = 1.0;
var triggerY = 0.0;
var triggerThres = 0.05;
var pause = false;
var mute = true;
var playBuffer = false;
var playFile = false;
var dataArray = null;

var muteSelect = null;
var playBufferSelect = null;
var pauseSelect = null;
var playFileSelect = null;

var analyser = null;
var merger = null;
var filter =  null; 
var inputGainNode = null;
var outputGainNode = null;
var bufferSourceNode = null;
var playerSourceNode = null;
var playerBuffer = null;
var templateBuffer = null; 
var oscillator = null; 
var canvas = null;
var canvasCtx = null;
var intendedWidth = null;
var visualSelect = null;
var drawVisual;


var bufferToBase64 = function (buffer) {
    var bytes = new Uint8Array(buffer);
    var len = buffer.byteLength;
    var binary = "";
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

var base64ToBuffer = function (buffer) {
    var binary = window.atob(buffer);
    var buffer = new ArrayBuffer(binary.length);
    var bytes = new Uint8Array(buffer);
    for (var i = 0; i < buffer.byteLength; i++) {
        bytes[i] = binary.charCodeAt(i) & 0xFF;
    }
    return buffer;
};


function writeUTFBytes(view, offset, string){
  var lng = string.length;
  for (var i = 0; i < lng; i++){
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function createWAV(samples, samplerate){
  console.log("creating wav for buffer " + dataArray.length + " srate " + samplerate);
  // create the buffer and view to create the .WAV file
  var buffer = new ArrayBuffer(44 + samples.length*2);
  var view = new DataView(buffer); 
  // write the WAV container, check spec at: https://ccrma.stanford.edu/courses/422/projects/WaveFormat/
  // RIFF chunk descriptor
  writeUTFBytes(view, 0, 'RIFF');
  view.setUint32(4, 44 + samples.length, true);
  writeUTFBytes(view, 8, 'WAVE');
  // FMT sub-chunk
  writeUTFBytes(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  // mono (1 channel)
  view.setUint16(22, 1, true);
  view.setUint32(24, samplerate, true);
  view.setUint32(28, samplerate * 1, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  // data sub-chunk
  writeUTFBytes(view, 36, 'data');
  view.setUint32(40, samples.length * 1, true);
  // write the PCM samples
  var lng = samples.length;
  var index = 44;  
  for (var i = 0; i < lng; i++){
    view.setInt16(index, Math.max(-32767, Math.min(32767, Math.round(samples[i] * 32767))), true);
    index += 2;  
  }
  // our final binary blob that we can hand off
  var blob = new Blob ( [ view ], { type : 'audio/wav' } );
  return blob;   
}



//main block for doing the audio recording

function gotStream(stream) {         
  console.log('success callback');
  merger = audioCtx.createChannelMerger(2);
  
  analyser = audioCtx.createAnalyser();
  analyser.minDecibels = -90;
  analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.85;
  
  inputGainNode = audioCtx.createGain();
  outputGainNode = audioCtx.createGain();  

  source = audioCtx.createMediaStreamSource(stream);
  source.connect(merger);
  merger.connect(inputGainNode);         
  inputGainNode.connect(analyser);                                                                        
  analyser.connect(outputGainNode);                  
  outputGainNode.connect(audioCtx.destination);

  timeChange();
  filterChange();         
  visualize();  
  toneChange();
  muteChange();
  signalSelect.onchange();
};

function error() {
    alert('Stream generation failed.');
}

function getUserMedia(dictionary, callback) {
    console.log('getUserMedia');
    try {
        if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        navigator.getUserMedia(dictionary, callback, error);
    } catch (e) {
        console.log('error: ' + e);
        alert('getUserMedia threw exception :' + e);
    }
}

function initAudio() {    
    console.log('init audio');
    getUserMedia(        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream);
}


function init(){
  console.log("init");
  templateSelect = document.getElementById('template');
  toneSelect = document.getElementById("tone");
  signalSelect = document.getElementById("signal");
  toneShapeSelect = document.getElementById("toneshape");
  timeScaleSelect = document.getElementById("timescale");
  ampScaleSelect = document.getElementById("ampscale");
  mathSelect = document.getElementById("math"); 
  triggerLevelInput = document.getElementById("triggerlevel");
  triggerSignalInput = document.getElementById("triggersignal");
  triggerThresInput = document.getElementById("triggerthres");
  triggerModeSelect = document.getElementById("triggermode");
  fftmindb = document.getElementById("fftmindb");
  fftmaxdb = document.getElementById("fftmaxdb");
  fftsmooth = document.getElementById("fftsmooth");
  filterSelect = document.getElementById("filter");
  filterQualityInput = document.getElementById("filterquality");
  filterFreqInput = document.getElementById("filterfreq");
  filterGainInput = document.getElementById("filtergain");
  timeOfsInput = document.getElementById("timeofs");
  muteSelect = document.querySelector('.mute');
  playBufferSelect = document.querySelector('.play');
  pauseSelect = document.querySelector('.pause');
  playFileSelect = document.querySelector('.playfile');
  canvas = document.querySelector('.visualizer');  
  visualSelect = document.getElementById("visual");
  intendedWidth = 768;
  canvas.setAttribute('width',2000);
  canvasCtx = canvas.getContext("2d");    
  
  visualSelect.onchange = function() {
    window.cancelAnimationFrame(drawVisual);
    visualize();
  }

  mathSelect.onchange = function() {
    window.cancelAnimationFrame(drawVisual);
    visualize();  
  }
  
  audio_file.onchange = function(){
    console.log("audio_file onchange");
    var reader = new FileReader();
    reader.onload = function (e) {
      var base64String = bufferToBase64(this.result);
      var audioFromString = base64ToBuffer(base64String);
      //document.getElementById("mp3String").value=base64String;
      audioCtx.decodeAudioData(audioFromString, function (buffer) {
        console.log('decoding ok');
        if (buffer.numberOfChannels != 1) alert("file is not one-channel audio, filter may not work properly");
        playerBuffer = buffer;              
      }, function (e) {
        console.log('Error decoding file', e);
      });      
    };
    console.log('reading ' + this.files[0]);
    reader.readAsArrayBuffer(this.files[0]);        
  };


  playFileSelect.onclick = function(){
    console.log("playFileSelect.onclick");
    if (playerBuffer == null) return;
    playFile = !playFile;
    updateButton(playFileSelect, "Play", playFile)
    if (playerSourceNode != null) {
      playerSourceNode.stop();
      playerSourceNode.disconnect(0);
      playerSourceNode = null;
    }
    if (playFile){
      console.log("play start");
      playerSourceNode = audioCtx.createBufferSource();
      playerSourceNode.buffer = playerBuffer;
      playerSourceNode.loop = true;    
      playerSourceNode.connect(merger);            
      playerSourceNode.start();
    }         
  }
  
  toneSelect.onchange = function() {
    toneChange();
  }

  // default template changed
  signalSelect.onchange = function(){
    var key = signalSelect.value;
    var idx = signalSelect.selectedIndex;
    var signal = signals[idx]; 
    console.log("signal "+signal.key + " samples " + signal.value.length);
    var values = String(signal.value).split(",");
    var value = "";
    for (var i=0; i < values.length; i++){
      value += values[i];
      if (i < values.length-1) value += '\n';
    }
    templateSelect.value = value;
    filterChange();
    playBufferUpdate();
  }

  toneShapeSelect.onchange = function() {
    toneChange();
  }

  timeScaleSelect.onchange = function() {
    timeChange();
  }

  ampScaleSelect.onchange = function() {
    ampChange();
  }

  triggerModeSelect.onchange = function() {
    triggerChange();  
  }


  triggerLevelInput.oninput = function() {
    triggerChange();  
  }

  triggerThresInput.oninput = function() {
    triggerChange();  
  }

  fftmindb.oninput = function() {
    fftChange();  
  }

  fftmaxdb.oninput = function(){
    fftChange();
  }

  fftsmooth.oninput = function(){
    fftChange();
  }
  
  filterSelect.onchange = function() {
    filterChange();
  }

  filterQualityInput.oninput = function() {
    filterChange();
  }

  timeOfsInput.oninput = function(){
    timeChange();
  }

  filterFreqInput.oninput = function() {  
    filterChange();
    playBufferUpdate();
  }

  filterGainInput.oninput = function() {
    filterChange();
  }

  muteSelect.onclick = function() {
    mute = !mute;
    muteChange();  
  }

  templateSelect.oninput = function() {
    console.log("template change");
    filterChange();
    playBufferUpdate();
  }

  playBufferSelect.onclick = function(){
    playBuffer = !playBuffer;
    playBufferUpdate();   
    updateButton(playBufferSelect, "Play", playBuffer);
  }

  pauseSelect.onclick = function() {
    pause = !pause;
    updatePauseButton();
    generateSaveLink();
  }

  
  initAudio();  
}


function findTrigger(dataArray){
  if (triggerModeSelect.value == 'off') return 0;
  var oldv = 0;
  var triggered = false;
  var triggerStart = false;
  //alert(dataArray.length);      
  for(var i = 0; i < dataArray.length; i++) {    
    //var v = (127-dataArray[i]) / 128;
    var v = dataArray[i];
    //alert(v);    
    if (triggerSignalInput.value == "rising"){
      if (v < triggerY - triggerThres) triggerStart = true;  
    } else if (triggerSignalInput.value == "falling"){
      if (v > triggerY + triggerThres) triggerStart = true;
    }         
    if (triggerStart){
      if (    ((triggerSignalInput.value == "rising")  && (v > triggerY + triggerThres))
           || ((triggerSignalInput.value == "falling") && (v < triggerY - triggerThres)) )    
       {    
        if (triggerModeSelect.value == 'onetime'){
          pause = true;
          updatePauseButton();
        }
        return i;    
      }
    }
                
  }
  //alert("not found");
  return 0;
}


function visualize() {
  WIDTH = canvas.width;
  HEIGHT = canvas.height;


  var visualSetting = visualSelect.value;
  console.log("visual=" + visualSetting);

  if(visualSetting == "sinewave") {
    analyser.fftSize = 2048;    
    var bufferLength = analyser.fftSize;
    console.log("sinewave bufferLength=" + bufferLength);
    var dataArrayVisualize = new Float32Array(bufferLength);
    dataArray = new Float32Array(bufferLength);
    var cursorX = 0;    

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    function drawWave() {

      var plotterMode = (    (mathSelect.value == "max")    || (mathSelect.value == "min") 
                          || (mathSelect.value == "minmax_inv")
                          || (mathSelect.value == "minmax") || (mathSelect.value == "firstminmax")   );
      var useDelta =  ( (mathSelect.value == "firstminmax") || (mathSelect.value == "delta") );                          
      drawVisual = requestAnimationFrame(drawWave);
      if (!pause) {
        analyser.getFloatTimeDomainData(dataArray);
        //console.log("analyser dataArray="+dataArray.length)
        //console.log("bufferLength="+bufferLength);
        if  (useDelta){          
          var lastValue = dataArray[0];
          dataArray[0]=0;                        
          for(var i = 1; i < bufferLength; i++) {            
            var currValue = dataArray[i];
            dataArray[i] = currValue-lastValue;
            lastValue = currValue;
          }
        }                
        if (plotterMode) {
          var min = 99999;          
          var max = -99999;
          var minpos = -1;
          var maxpos = -1;
          for(var i = 0; i < bufferLength; i++)  {
            var v = dataArray[i];
            if (v < min) { min = v; minpos = i; }
            if (v > max) { max = v; maxpos = i; }                                 
          }
          var v = 0;                                      
          if (mathSelect.value == "max"){ 
            v = max;
          } else if (mathSelect.value == "min"){
            v = min;
          } else if (mathSelect.value == "minmax"){
            if (max > -min) v = max;
              else v = min;
          } else if (mathSelect.value == "minmax_inv"){
            if (max > -min) v = 1/max;
              else v = 1/min;          
          } else if (mathSelect.value == "firstminmax"){
            /*if (minpos < maxpos) v = min;
              else v = max;*/ 
            var firstMinMax = 0;
            var ascending = true;
            for (var i=1; i < bufferLength; i++){              
              var vc = Math.abs(dataArray[i]);
              var vcold = Math.abs(dataArray[i-1]); 
              if (vc >= vcold){                
                firstMinMax = dataArray[i];             
              } else break; 
            }
            v = firstMinMax;                                   
          }        
          dataArrayVisualize[cursorX] = Math.min(1, Math.max(v * ampScale, -1));      
          cursorX = (cursorX + 1) % WIDTH;                                        
        } else {         
          for(var i = 0; i < bufferLength; i++) {
            dataArrayVisualize[i] = Math.min(1, Math.max(dataArray[i] * ampScale, -1));
          } 
        }
      }            

      canvasCtx.fillStyle = 'rgb(255, 255, 255)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;                        

      //var sliceWidth = WIDTH * 1.0 / bufferLength;
      var sliceWidth = Math.round(timeScale);
      //console.log("sliceWidth="+sliceWidth);
      if (plotterMode) sliceWidth = 1;
      var x = 0;      
      var onepixel = 1.0/(audioCtx.sampleRate)/sliceWidth;            
      var triggerStart = 0;      
      if (!plotterMode) {
        triggerStart = findTrigger(dataArrayVisualize) + timeOfs;        
      }
      //alert("trigger="+triggerStart);
      
      // zero line
      canvasCtx.beginPath();
      canvasCtx.strokeStyle = 'rgb(255, 255, 255)';            
      canvasCtx.moveTo(0, HEIGHT/2);
      canvasCtx.lineTo(WIDTH, HEIGHT/2);
      canvasCtx.stroke();
      
      canvasCtx.beginPath();
      canvasCtx.strokeStyle = 'rgb(180, 180, 180)';
      //console.log("triggerStart="+triggerStart);                        

      for(var i = triggerStart; i < bufferLength; i++) {
           
        //var v = dataArray[i] / 128.0;        
        //var y = v * HEIGHT/2;
        var y = HEIGHT/2 - dataArrayVisualize[i]*HEIGHT/2;

        if(x == 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
        if (x >= WIDTH) break;
        if (x % 25 == 0){
          canvasCtx.fillStyle = 'red';
          canvasCtx.font = "bold 0px Arial";
          var time = Math.round(onepixel * x * 10000)/100;          
          canvasCtx.fillText(time, x-8,10);          
        }        
      }

      //canvasCtx.lineTo(canvas.width, canvas.height/2);      
      canvasCtx.stroke();
      
      // draw cursorX
     

      
      
      //alert("draw");
    };

    drawWave();

  } else if(visualSetting == "frequencybars") {
    analyser.fftSize = 2048;    
    var bufferLength = analyser.frequencyBinCount;
    console.log("bufferLength="+bufferLength);
    var dataArrayFreq = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    function drawFreq() {
      drawVisual = requestAnimationFrame(drawFreq);      
      var bands = bufferLength;      
      var oneband = (audioCtx.sampleRate/2) / bands;                  
      if (!pause) analyser.getByteFrequencyData(dataArrayFreq);              

      canvasCtx.fillStyle = 'rgb(0, 0, 0,0)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      var barWidth = (WIDTH / bands);      
      var barHeight;
      var x = 0;
      var maxvalue = 0;
      var maxi = 0;
      for(var i = 0; i < bands; i++) {
        if (dataArrayFreq[i] > maxvalue){
          maxvalue = dataArrayFreq[i];
          maxi = i; 
        }
      }      
      
      for(var i = 0; i < bands; i++) {
        //barHeight = Math.exp(dataArrayFreq[i]/30);
        barHeight = dataArrayFreq[i];

        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
        canvasCtx.fillStyle = 'white';      
        if (maxi == i){
          canvasCtx.font = "bold 16px Arial";
          var freq = Math.round(oneband * i / 100)/10;
          canvasCtx.fillText(freq, x-8, HEIGHT-barHeight/2-10);
        }       
        if (i % 25 == 0){
          canvasCtx.font = "9px Arial";
          var freq = Math.round(oneband * i / 100)/10;          
          canvasCtx.fillText(freq, x-8,10);          
        }        
        x += barWidth;
      }
    };

    drawFreq();

  } else if(visualSetting == "off") {
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.fillStyle = "red";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  }
}

function toneChange() {
  var toneSetting = toneSelect.value;
  var shapeSetting = toneShapeSelect.value;  
  if (oscillator) {
    oscillator.disconnect(0);
    oscillator.stop();
    oscillator = null;
  }
  console.log("tone="+toneSetting);  
  if (toneSetting == "off"){        
  } else {
    oscillator = audioCtx.createOscillator();
    oscillator.type = shapeSetting;
    oscillator.frequency.value = toneSetting;    
    oscillator.start();
    oscillator.connect(merger);
  }      
}

function createTemplateBuffer(reverse){
  console.log("createTemplateBuffer");        
  console.log("filterfreq="+filterFreqInput.value);  
  var template = document.getElementById('template').value;
  template = template.split(",").join("\n");  
  template = template.split("\n");  
  document.getElementById('signallabel').innerHTML = "Matched filter template ("+ template.length + ")";              
  var freq = parseFloat(filterFreqInput.value);
  srate = audioCtx.sampleRate;
  var swidth = srate/freq; 
  console.log("swidth="+swidth);
  var samples = Math.round(swidth * template.length); // samples
  console.log("srate="+srate);  
  console.log("samples="+samples);  
  // "convolve reverse signal" = "correlate signal"
  // resample and copy to output  
  templateBuffer = audioCtx.createBuffer(1, samples, srate);
  console.log("bufferlen="+templateBuffer.length);  
  var data = templateBuffer.getChannelData(0);
  var v;
  var idx;          
  for (var i = 0; i < templateBuffer.length; i++) {
    idx = Math.round(i / swidth);   
    v = parseFloat(template[idx]);
    if (isNaN(v)) v= 0;    
    if (reverse) data[templateBuffer.length-i-1] = v;
      else data[i] = v;                                 
  }              
}

function filterChange(){
  //document.getElementById('filterfreqlabel').value = filterFreqInput.value;
  document.getElementById('filtergainlabel').value = filterGainInput.value;
  document.getElementById('filterqualitylabel').value = filterQualityInput.value;  
  console.log("filter="+filterSelect.value);  
  inputGainNode.disconnect(0);
  if (filter != null) filter.disconnect(0);
  filter = null;  
  if (filterSelect.value == 'matched'){    
    console.log("matchedfilter");
    if (window.webkitAudioContext != null){
      alert('Matched filter may not work in Chrome (yet) - Please use Firefox...');
      // TODO: in Chrome, audioCtx.createBuffer doesn't seem to work anymore for audioCtx.createConvolver ?!  
    }
    createTemplateBuffer(true);
    if (templateBuffer.length < 5000){
      filter = audioCtx.createConvolver();
      filter.normalize = false;    
      filter.buffer = templateBuffer;
      filter.connect(analyser);
      inputGainNode.connect(filter);
    } else alert('too many samples (increase freq/decrease #samples)');        
  }    
  else if (filterSelect.value != 'off') {                
    console.log("filterfreq="+filterFreqInput.value);
    console.log("filtergain="+filterGainInput.value);
    console.log("filterq="+filterQualityInput.value);
    filter = audioCtx.createBiquadFilter();
    filter.type = filterSelect.value;
    filter.frequency.value = parseFloat(filterFreqInput.value);
    filter.gain.value = parseFloat(filterGainInput.value);
    filter.Q.value = parseFloat(filterQualityInput.value);
    filter.connect(analyser);
    inputGainNode.connect(filter);
  } else {
    inputGainNode.connect(analyser);
  }
  toneChange();  
}

function timeChange(){
  document.getElementById('timeofslabel').value = timeOfsInput.value;
  timeOfs = parseFloat(timeOfsInput.value);
  var timeSetting = parseFloat(timeScaleSelect.value);
  console.log("time="+timeSetting + " ofs=" + timeOfs);
  timeScale = timeSetting; 
}

function ampChange(){
  ampScale = parseFloat(ampScaleSelect.value);  
  //inputGainNode.gain.value = ampScale;
  //ampScale = 1.0;
  console.log("ampScale="+ampScale);
}

function fftChange(){
  console.log("fftmindb="+fftmindb.value);
  console.log("fftmaxdb="+fftmaxdb.value);
  console.log("fftsmooth="+fftsmooth.value);  
  analyser.minDecibels = parseFloat(fftmindb.value);
  analyser.maxDecibels = parseFloat(fftmaxdb.value);
  analyser.smoothingTimeConstant = parseFloat(fftsmooth.value);
}


function triggerChange(){
  triggerY = parseFloat(triggerLevelInput.value);
  triggerThres = parseFloat(triggerThresInput.value);   
  console.log("triggerY="+triggerY);  
  console.log("triggerThres="+triggerThres);
}

// template playing
function playBufferUpdate(){  
  console.log("playBufferUpdate")
  if (bufferSourceNode != null) {
    bufferSourceNode.stop();
    bufferSourceNode.disconnect(0);
    bufferSourceNode = null;
  }
  if (playBuffer){
    console.log("play template start");
    createTemplateBuffer(false);
    bufferSourceNode = audioCtx.createBufferSource();
    bufferSourceNode.buffer = templateBuffer;
    bufferSourceNode.loop = true;    
    bufferSourceNode.connect(merger);            
    bufferSourceNode.start();
  } else {        
    console.log("play template stop");    
  }
}




function updatePauseButton(){
  updateButton(pauseSelect, "Pause", pause);
}


function updateButton(element, text, state){  
  if(state) {    
    element.id = "activated";
    element.innerHTML = text + " is ON";
    console.log(text + " is ON");    
  } else {    
    element.id = "";    
    element.innerHTML = text + " is OFF";
    console.log(text + " is OFF");    
  }
}

function muteChange() {
  updateButton(muteSelect, "Mute", mute);  
  if (mute){
    outputGainNode.gain.value = 0;
  } else {
    outputGainNode.gain.value = 1;
  }
}

function generateSaveLink(){
  console.log("generateSaveLink");
  if (dataArray == null) {
    alert("press PAUSE first");
    return;
  }  
  var blob = createWAV(dataArray, audioCtx.sampleRate);
  var URLObject = window.webkitURL || window.URL;
  var url = URLObject.createObjectURL(blob);
  console.log("creating link " + url);
  //document.write("<a href='"+url+"'>play</a>");
  var audioBlob = document.querySelector('.save');
  audioBlob.href = url;        
  audioBlob.download = new Date().toISOString() + '.wav';
  //audioBlob.text = "123";  
}





window.addEventListener('load', init );



}

startScope();