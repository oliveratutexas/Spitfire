const cmu_dict = require('cmu-pronouncing-dictionary');
const merge = require('lodash').merge
const sortBy = require('lodash').sortBy

var words = [];

Object.keys(cmu_dict).forEach(function (word) {
  words.push({
    word: word,
    pron: cmu_dict[word]
  })
})  

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
}

var rhymes = function(input) {
    if (!input) return []

    input = input.toLowerCase()

    if (!cmu_dict[input]) return []

    var inputPron = cmu_dict[input];
    var results = [];
    
    for (var i = 0; i < words.length; i += 1) {
        var word = words[i];

        var score = countMatchingTrailingSyllablesInPronunciations(inputPron, word.pron)
        if (score > 1) {
            results.push(merge(word, {score: score}))
        }

        if (results.length > 3) {
            break;
        }
    }

  results = sortBy(results, 'score').reverse()
  return results;
}

module.exports = {
    rhymes: rhymes,
    words: words
};
