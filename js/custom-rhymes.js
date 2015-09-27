const json = require('../map').json;
var map = JSON.parse(json);

var rhymes = function(input) {
    input = input.toLowerCase();
    
    if (map[input] == null) {
        return [];
    }

    return map[input];
};

module.exports = {
    rhymes: rhymes
};
