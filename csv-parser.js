var fs = require('fs');

//Converter Class 
var Converter = require("csvtojson").Converter;
var converter = new Converter({});
 
//end_parsed will be emitted once parsing finished 
converter.on("end_parsed", function (jsonArray) {
   fs.writeFileSync('words', JSON.stringify(jsonArray)); //here is your result jsonarray 
});
 
//read from file 
require("fs").createReadStream("./common_words.csv").pipe(converter);
