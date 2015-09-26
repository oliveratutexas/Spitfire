const rhymes = require('./custom-rhymes.js');

if (!('webkitSpeechRecognition' in window)) {
    console.log('no speech API');
} else {
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() { console.log('started'); }
  recognition.onresult = function(event) {}
  recognition.onerror = function(event) {}
  recognition.onend = function() {}
  
  recognition.start();
}

var suggestionsNode = document.querySelector('.suggestions');
var firstWordNode = suggestionsNode.querySelector('.first');
var secondWordNode = suggestionsNode.querySelector('.second');
var thirdWordMode = suggestionsNode.querySelector('.third');

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
