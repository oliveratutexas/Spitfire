const spawn = require('child_process').spawn;
const fs = require('fs');

/**
 * Re-bundles files upon changes.
*/
fs.watch('js/', { persistent: true, recursive: true }, function(e, filename) {
    console.log("msg");
    
    if (!fs.existsSync('dist')){
        fs.mkdirSync('dist');
    }
    
    spawn('browserify', ['-o', 'dist/bundle.js', 'js/main.js']);
});
