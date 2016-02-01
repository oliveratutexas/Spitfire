// Intersect commonly used words with the CMU pronunciation dictionary
// producing a smaller subset.

var fs = require('fs');
var path = require('path');
var cmudict = require('cmu-pronouncing-dictionary');
var ProgressBar = require('progress');

var dataDir = path.join(__dirname, '..' + path.sep + 'data');
var inFile = path.join(dataDir, 'common_words.json');
var outFile = path.join(dataDir, 'common_cmu_dict.json');

// Read commonly used words JSON
// and get the data (words)
var commonJSON = fs.readFileSync(inFile);
var commonArr = JSON.parse(commonJSON);
var commonWords = commonArr.map(function(o) {
    return o.Word;
});

// CMU dictionary is a map[string]string, 
// that maps words -> pronunciation.
var cmuWords = Object.keys(cmudict);

// If the cmu word exists in the commonly used words array,
// then add it to our intersected common CMU words.
// 
// `commonCMUDictWords` is a map[string]Info
// that maps words -> Info objects, where Info is of the form:
// 
// {
//      pronunciation: <string>,
//      frequency: <number>,
//      rank: <number>
// }
var commonCMUDictWords = {};
var progressBar = new ProgressBar('intersecting commonly used words with CMU dict [:bar] :percent :eta', { total: cmuWords.length });

cmuWords.forEach(function(cmuWord) {
    var idx = commonWords.indexOf(cmuWord);
    
    if (idx !== -1) {
        commonCMUDictWords[cmuWord] = {
            pronunciation: cmudict[cmuWord],
            frequency: commonArr[idx]['Frequency'],
            rank: commonArr[idx]['Rank']
        };
    }

    progressBar.tick();
});

// save to disk
fs.writeFileSync(outFile, JSON.stringify(commonCMUDictWords));
