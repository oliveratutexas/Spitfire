const rhymes = require('./custom-rhymes.js');

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
var final_transcript = '';
var interim_transcript = '';

recognition.onstart = function() { console.log('started'); }
recognition.onspeechend = function() {
    // console.log("SPEECH ENDED!")
}
recognition.onresult = function(event) {
    // console.log('result', event);

    interim_transcript = '';
    
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
        // console.log('final transcript', final_transcript);
      } else {
        interim_transcript += event.results[i][0].transcript;
        // console.log('interim transcript', interim_transcript);
      }
    }
};

recognition.onerror = function(event) {console.log('error', event)}
recognition.onend = function() {console.log('end')}

var compute = function() {
    console.log('computing')
    var full = interim_transcript.split(/\s+/);
    var last = full[full.length - 1];
    var results = rhymes.rhymes(last);
    console.log('split interim', full);
    console.log('results', results);
    
    // if (results[0]) { 
    //     console.log(results[0].word); 
    // }
};

document.addEventListener('click', compute);

var startListening = function() {
    final_transcript = '';
    recognition.start();
    // setInterval(compute, 2900);
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
