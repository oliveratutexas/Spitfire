var fs = require('fs');

//Converter Class 
var Converter = require("csvtojson").Converter;
var converter = new Converter({});
 
//end_parsed will be emitted once parsing finished 
converter.on("end_parsed", function (jsonArray) {
   fs.writeFileSync(process.argv.slice(2)[1], JSON.stringify(jsonArray)); //here is your result jsonarray 
});
 
//read from file 
require("fs").createReadStream(process.argv.slice(2)[0]).pipe(converter);
