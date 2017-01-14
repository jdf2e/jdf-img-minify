'use strict';
var imgMini = require("../");
var fs = require("fs");
var execFile = require('child_process').execFile;
var path = require("path");

var testPath = [
    path.join(__dirname, "1_mini.jpg"),
    path.join(__dirname, "1_mini.png"),
    path.join(__dirname, "1_mini.gif"),
    path.join(__dirname, "1_mini.gif.webp"),
    path.join(__dirname, "1_mini.png.webp")
];

for (var i in testPath) {
    if (fs.existsSync(testPath[i])) {
        fs.unlinkSync(testPath[i])
    }
}

function unionCallback(info) {
    if (info.error) {
        throw info
    } else {
        console.log(info);
    }
}


imgMini.all(path.join(__dirname, "1.jpg"), path.join(__dirname, "1_mini.jpg"), true, unionCallback);

imgMini.all(path.join(__dirname, "1.png"), path.join(__dirname, "1_mini.png"), true, unionCallback);

imgMini.all(path.join(__dirname, "1.gif"), path.join(__dirname, "1_mini.gif"), true, unionCallback);
