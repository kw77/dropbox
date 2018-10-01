// Quick, dirty and hardly tested, but
// For each file in a defined directory
// --> Synchronously read the file as a string
// --> Parse the contents to JSON
// --> Parse again the given escaped attribute
// --> If a file exists in the defined output directory with a name from the input, delete
// --> Write the unescaped JSON property to a new file named as per the input... in the output directory

var fs = require('fs');
var inPath = './data';
var outPath = './out';
var escapedPropery = 'content';

console.log("");
console.log("Reading files from:          " + inPath);
console.log("Writing files to:            " + outPath);
console.log("Extracting escaped property: " + escapedPropery);

fs.readdir(inPath, function (error, filenameList) {
    if (error) {
        console.log(error);
    }

    console.log("File count:                  " + filenameList.length);
    console.log("");

    for (var filename of filenameList){
        let inFilePath = inPath + '/' + filename;
        let outFilePath = outPath + '/' + filename;
        let outFileExists = fs.existsSync(outFilePath);

        filedata = fs.readFileSync(inFilePath, { encoding: 'utf8' });
        jsondata = JSON.parse(filedata);
        jsonescaped = JSON.parse(jsondata[escapedPropery]);

        if(outFileExists){
            fs.unlinkSync(outFilePath);
            console.log("Writing: " + inFilePath + " (replaced existing file)");
        } else {
            console.log("Writing: " + inFilePath);
        }

        fs.writeFileSync(outFilePath,JSON.stringify(jsonescaped));
    }
});