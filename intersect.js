var fs = require('fs');
var cmu_dict = require('cmu-pronouncing-dictionary');

our_cmu_dict = JSON.parse(JSON.stringify(cmu_dict));

var json = fs.readFileSync('words');
var arr = JSON.parse(json);

var words = arr
    .filter(function(obj) {
        return true
    }).map(function(obj) {
        return obj.Word;
    });

var cmu_words = Object.keys(our_cmu_dict);

cmu_words.forEach(function(cmu_word) {
    if (words.indexOf(cmu_word) !== -1) {
        var idx = words.indexOf(cmu_word);
        our_cmu_dict[cmu_word] = {
            'pronunciation': our_cmu_dict[cmu_word],
            'partOfSpeech': arr[idx]['Part of speech']
        };
    } else {
        our_cmu_dict[cmu_word] = null;
        delete our_cmu_dict[cmu_word];
    }
});

fs.writeFileSync('our_cmu_dict', JSON.stringify(our_cmu_dict));
