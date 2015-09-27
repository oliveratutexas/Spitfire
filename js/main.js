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
