// Convert the commonly used words available in a CSV file into a JSON file.

var fs = require('fs');
var path = require('path');
var Converter = require('csvtojson').Converter;
var ProgressBar = require('progress');

var dataDir = path.join(__dirname, '..' + path.sep + 'data');
var inFile = path.join(dataDir, 'common_words.csv');
var outFile = path.join(dataDir, 'common_words.json');

var progressBar = new ProgressBar('parsing CSV [:bar] :percent :eta', { total: 1 });

var converter = new Converter({});
converter.on('end_parsed', function(arr) {
    fs.writeFileSync(outFile, JSON.stringify(arr));
    progressBar.tick();
});

fs.createReadStream(inFile).pipe(converter);
