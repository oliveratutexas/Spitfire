const rhymes = require('rhymes');

var suggestionsNode = document.querySelector('.suggestions');
var firstWordNode = suggestionsNode.querySelector('.first');
var secondWordNode = suggestionsNode.querySelector('.second');
var thirdWordMode = suggestionsNode.querySelector('.third');

var updateSuggestions = function(arr) {
    firstWordNode.textContent = arr[0];
    secondWordNode.textContent = arr[1];
    thirdWordMode.textContent = arr[2];
};

var words = rhymes('word').map(function(obj) {
    return obj.word;
}).slice(0,3);

updateSuggestions(words);
