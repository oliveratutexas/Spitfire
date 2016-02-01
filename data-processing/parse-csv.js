var fs = require('fs');
var path = require('path');
var Converter = require('csvtojson').Converter;

var dataDir = path.join(__dirname, '../data');
var inFile = 'common_words.csv';
var outFile = 'common_words.json';

// Make a new converter
var converter = new Converter({});

// Write results to `common_words.json`
converter.on('end_parsed', function(arr) {
    fs.writeFileSync(path.join(dataDir, outFile), JSON.stringify(arr));
});

// Begin converting
fs.createReadStream(path.join(dataDir, inFile)).pipe(converter);
