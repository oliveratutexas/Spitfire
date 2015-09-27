const rhymes = require('./custom-rhymes.js');

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
var final_transcript = '';
var interim_transcript = '';
var NUM_SUGGESTIONS = 6;

recognition.onstart = function() { console.log('started'); };
recognition.onspeechend = function() {};


recognition.onerror = function(event) {console.log('error', event)}
recognition.onend = function() {console.log('end')}

var suggestionsNode = document.querySelector('#suggestions');

var updateSuggestions = function(arr) {
    var i;
    var children = suggestionsNode.querySelectorAll('p');
    
    for (i = 0; i < NUM_SUGGESTIONS; i += 1) {
        children[i].textContent = '';
        if (arr[i] != null) {
            children[i].textContent = arr[i];
        }
    }
};

var compute = function() {
    console.log('computing')
    var full = interim_transcript.split(/\s+/);
    var last = full[full.length - 1];
    var results = rhymes.rhymes(last).slice(1);
    
    console.log('split interim', full);
    console.log('results', results);
    
    return results;
};


recognition.addEventListener('result', function(event) {
    interim_transcript = '';
    
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
        updateSuggestions(compute());
      }
    }
});

var fn = function(e) {
    var listening = false;

    var isListening = function() {
        return listening;
    };

    var startListening = function() {
        final_transcript = '';
        
        if (recognition != null) {
            recognition.start();
            listening = true;
        }
    };

    var endListening = function() {
        if (recognition != null) {
            recognition.stop();
            listening = false;
        }
    };

    var toggleRecognition = function() {
        if (isListening()) {
            endListening();
        } else {
            startListening();
        }
    }

    var mic = document.querySelector('.icon.mic');
    
    mic.toggle = function() {
        if (mic.classList.contains('ion-android-microphone')) {
            mic.classList.remove('ion-android-microphone');
            mic.classList.add('ion-android-microphone-off');
        } else {
            mic.classList.remove('ion-android-microphone-off');
            mic.classList.add('ion-android-microphone');
        }
    };

    mic.addEventListener('click', function(e) {
        mic.toggle();
        toggleRecognition();
    });
};

document.addEventListener('DOMContentLoaded', fn);

var handleStartButtonClick = function(e) {
    startListening();
};
