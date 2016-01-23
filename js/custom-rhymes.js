const json = require('../map3').json;
var map = JSON.parse(json);
//TODO - could we move this into an area that generates the maps?
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
