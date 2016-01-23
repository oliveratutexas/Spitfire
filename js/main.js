const rhymes = require('./custom-rhymes.js');

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
var final_transcript = '';
var interim_transcript = '';
var NUM_SUGGESTIONS = 6;

recognition.onstart = function() { console.log('started'); };
recognition.onspeechend = function() {};

var stringify = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};

recognition.onerror = function(event) {console.log('error', event); recognition.start();}
recognition.onend = function() {console.log('end'); recognition.start();}

var suggestionsNode = document.querySelector('#suggestions');
var prompt = document.querySelector('.prompt');

var Updater = function() {
    var prev = null;

    return function(arr) {
        var i;
        var children = suggestionsNode.querySelectorAll('p');
        
        // If length is 0, bail.
        if (arr.length === 0) {
            return;
        }

        // push easy ones if the same
        if (prev != null && stringify(arr.slice().sort()) === prev) {
	    //four primer words to keep the user's flow going
            arr.unshift('wanted', 'just', 'tell', 'take');
        };

        prev = stringify(arr);


        // prompt.style.display = 'block';
        // setTimeout(function() {
        //     prompt.style.display = 'none';
        // }, 1500);

        for (i = 0; i < NUM_SUGGESTIONS; i += 1) {
            children[i].textContent = '';
            if (arr[i] != null) {
                children[i].textContent = arr[i];
            }
        }
    };
};

var updateSuggestions = Updater();

var compute = function() {
    var full = interim_transcript.split(/\s+/);
    var last = full[full.length - 1];

    if (last === 'ok') {
        last = 'okay';
    }

    console.log('computing', last)


    // Not the same word
    var results = rhymes.rhymes(last).filter(function(r) {
        return r !== last;
    });
    
    // Plural
    if (results.length === 0 && last.charAt(last.length - 1) === 's') {
        last = last.slice(0,-1);
        results = rhymes.rhymes(last).filter(function(r) {
            return r !== last;
        });
    }

    // console.log('split interim', full);
    // console.log('results', results);
    
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


/**
 * Program states for...
 * 	animation - button glow
 * 	
 * 
*/
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
        if (mic.classList.contains('on')) {
            mic.classList.remove('on');
        } else {
            mic.classList.add('on');
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
