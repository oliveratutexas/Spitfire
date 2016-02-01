var merge = require('lodash').merge;
var sortBy = require('lodash').sortBy;
var sortByAll = require('lodash.sortbyall');
var fs = require('fs');
var path = require('path');
var ProgressBar = require('progress');

var dataDir = path.join(__dirname, '..' + path.sep + 'data');
var inFile = path.join(dataDir, 'common_cmu_dict.json');
var outFile = path.join(dataDir, 'map.json');

var commonCMUDict = JSON.parse(fs.readFileSync(inFile).toString());
var commonCMUDictWords = Object.keys(commonCMUDict);
var map = {}; // final map

// Returns the number of syllables in a pronunciation string.
// Example: "AA IO" => 2
var numberOfSyllables = function(str) {
    return str.split(/\s+/).length;
};

var countMatchingTrailingSyllablesInPronunciations = function(a, b) {
    a = a.split(' ').reverse();
    b = b.split(' ').reverse();

    var score = 0;
    var shorterPron = (a.length < b.length) ? a : b;
    var i;

    for (i = 0; i < shorterPron.length; i += 1) {
        if (a[i].toLowerCase() === b[i].toLowerCase()) {
            score += 1;
        } else {
            return score;
        }
    }

    return score;
};

var ocd = commonCMUDictWords.map(function(word) {
    var frequency = commonCMUDict[word]['frequency']; 
    var pronunciation = commonCMUDict[word]['pronunciation'];
    var coolness = frequency*1 + numberOfSyllables(pronunciation)*10000;

    return {
        word: word,
        pronunciation: pronunciation,
        partOfSpeech: commonCMUDict[word]['partOfSpeech'],
        frequency: frequency,
        coolness: coolness
    };
});

var progressBar = new ProgressBar('mapping best matches [:bar] :percent :eta', { total: ocd.length });

ocd.forEach(function(obj) {
    var word = obj.word.toLowerCase();
    var pronunciation = obj.pronunciation;
    
    // get best rhyming words
    var results = [];
    ocd.forEach(function(obj2) {
        var score = countMatchingTrailingSyllablesInPronunciations(pronunciation, obj2.pronunciation);
        if (score > 1) {
            results.push(merge(obj2, {score: score}));
        }
    });

    // sort by our criteria
    results = sortByAll(results, ['score', 'coolness']);
    results.reverse();
    
    // rename to shorter keys
    map[word] = results.map(function(obj) { 
        return {
            w: obj['word'],
            s: obj['score'],
            f: obj['frequency'],
            c: obj['coolness']
        };
    });

    progressBar.tick();
});

fs.writeFileSync(outFile, JSON.stringify(map));
