var fs = require('fs');
var path = require('path')

// WARN: Read file path needs to be inlined.
// Otherwise, brfs is unable to statically analyze path for inlining file contents.
var json = fs.readFileSync(path.join(__dirname, '..'+path.sep+'..'+path.sep, 'data/common_words.json')).toString();
