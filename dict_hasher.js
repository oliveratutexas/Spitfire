const cmu_dict = require('cmu-pronouncing-dictionary');
const merge = require('lodash').merge
const sortBy = require('lodash').sortBy
const fs = require('fs');

const map = new Map();
var words = [];

Object.keys(cmu_dict).forEach(function (word) {
  words.push({
    word: word,
    pron: cmu_dict[word]
  })
});

var countMatchingTrailingSyllablesInPronunciations = function(a, b) {
  a = a.split(' ').reverse()
  b = b.split(' ').reverse()
  var score = 0
  var shorterPron = (a.length < b.length) ? a : b

  for (var i in shorterPron) {
    if (a[i] === b[i]) {
      score++
    } else {
      return score
    }
  }

  return score
};

words.forEach(function(obj) {
    var input = obj.word;

    var results = [];
    console.log('working on input', input);

    input = input.toLowerCase()
    
    if (!cmu_dict[input]) {
        map.add(input, results);
        return;
    }
    
    var inputPron = cmu_dict[input]

    words.forEach(function(word) {
      if (word.pron == null) {
        return;
      }

      var score = countMatchingTrailingSyllablesInPronunciations(inputPron, word.pron)
      if (score > 1) {
        results.push(merge(word, {score: score}))
      }
      results = sortBy(results, 'score')
        .reverse()
        .slice(0, 20);
    });

    // console.log('setting results', results);
    map.set(input, results);
});

console.log(map.entires().length);
fs.writeFileSync('map', JSON.stringify(map));
