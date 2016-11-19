var fs = require('fs');
var path = require('path');

var jdfPng = require('jdf-png');
var jdfJpg = require('jdf-jpg');
var jdfGif = require('jdf-gif');
var jdfWebpPng = require('jdf-webp-png');
var jdfWebpGif = require('jdf-webp-gif');

var execFile = require('child_process').execFile;

var handles = {};

var copy = function(source, target, rewrite) {
    var source = path.normalize(source);
    var target = path.normalize(target);

    if (source == target) {
        return false;
    }

    if (rewrite) {
        fs.writeFileSync(target, fs.readFileSync(source));
        return true;
    } else {
        try {
            var info = fs.statSync(target);
            return false;
        } catch (ex) {
            fs.writeFileSync(target, fs.readFileSync(source));
            return true;
        }
    }
    return true;
}

handles.jpg = function(inputPath, outputPath, quantity, callBack) {
    if (typeof(quantity) == "function") {
        callBack = quantity;
        quantity = "80";
    }

    if (typeof(quantity) != "function" && typeof(callBack) != "function") {
        quantity = quantity || "80";
        return new Promise(function(resolve, reject) {
            handles.jpg(inputPath, outputPath, quantity, function(resultInfo) {
                if (resultInfo.error) {
                    reject(resultInfo)
                } else {
                    resolve(resultInfo);
                }
            })
        });
    }
    var inputFileInfo = fs.statSync(inputPath);
    execFile(jdfJpg, ['-quality', quantity, '-outfile', outputPath, inputPath], function(error, stdout, stderr) {
        var resultInfo = {
            error: error,
            stdout: stdout,
            stderr: stderr,
            inputPath: inputPath,
            outputPath: outputPath,
            router: "jpg",
            inputFileInfo: inputFileInfo,
        };
        if (!error) {
            resultInfo.outputFileInfo = fs.statSync(outputPath);
            resultInfo.compression = parseFloat(((resultInfo.inputFileInfo.size - resultInfo.outputFileInfo.size) / resultInfo.inputFileInfo.size).toFixed(2));
            //在极少数极端情况下 有可能压缩后反而更大.
            if (resultInfo.compression > 1) {
                copy(inputPath, outputPath, true);
            }
        }
        callBack(resultInfo);
    });
};

handles.png = function(inputPath, outputPath, quantity, callBack) {
    if (typeof(quantity) == "function") {
        callBack = quantity;
        quantity = "60-80";
    }
    if (typeof(quantity) != "function" && typeof(callBack) != "function") {
        quantity = quantity || "60-80";
        return new Promise(function(resolve, reject) {
            handles.png(inputPath, outputPath, quantity, function(resultInfo) {
                if (resultInfo.error) {
                    reject(resultInfo)
                } else {
                    resolve(resultInfo);
                }
            })
        });
    }
    var inputFileInfo = fs.statSync(inputPath);
    execFile(jdfPng, ['--quality=' + quantity, '-o', outputPath, inputPath], function(error, stdout, stderr) {
        var resultInfo = {
            error: error,
            stdout: stdout,
            stderr: stderr,
            inputPath: inputPath,
            outputPath: outputPath,
            router: "png",
            inputFileInfo: inputFileInfo,
        };
        if (!error) {
            resultInfo.outputFileInfo = fs.statSync(outputPath);
            resultInfo.compression = parseFloat(((resultInfo.inputFileInfo.size - resultInfo.outputFileInfo.size) / resultInfo.inputFileInfo.size).toFixed(2));
            //在极少数极端情况下 有可能压缩后反而更大.
            if (resultInfo.compression <= 0) {
                copy(inputPath, outputPath, true);
            }
        }
        callBack(resultInfo);
    });
};

handles.gif = function(inputPath, outputPath, quantity, callBack) {
    if (typeof(quantity) == "function") {
        callBack = quantity;
        quantity = "80";
    }
    if (typeof(quantity) != "function" && typeof(callBack) != "function") {
        quantity = quantity || "80";
        return new Promise(function(resolve, reject) {
            handles.gif(inputPath, outputPath, quantity, function(resultInfo) {
                if (resultInfo.error) {
                    reject(resultInfo)
                } else {
                    resolve(resultInfo);
                }
            })
        });
    }
    var inputFileInfo = fs.statSync(inputPath);
    execFile(jdfGif, ['-o', outputPath, inputPath], function(error, stdout, stderr) {
        var resultInfo = {
            error: error,
            stdout: stdout,
            stderr: stderr,
            inputPath: inputPath,
            outputPath: outputPath,
            router: "gif",
            inputFileInfo: inputFileInfo,
        };
        if (!error) {
            resultInfo.outputFileInfo = fs.statSync(outputPath);
            resultInfo.compression = parseFloat(((resultInfo.inputFileInfo.size - resultInfo.outputFileInfo.size) / resultInfo.inputFileInfo.size).toFixed(2));
            //在极少数极端情况下 有可能压缩后反而更大.
            if (resultInfo.compression <= 0) {
                copy(inputPath, outputPath, true);
            }
        }
        callBack(resultInfo);
    });
};

handles.png2webp = function(inputPath, outputPath, quantity, callBack) {
    if (typeof(quantity) == "function") {
        callBack = quantity;
        quantity = "75";
    }
    if (typeof(quantity) != "function" && typeof(callBack) != "function") {
        quantity = quantity || "75";
        return new Promise(function(resolve, reject) {
            handles.png2webp(inputPath, outputPath, quantity, function(resultInfo) {
                if (resultInfo.error) {
                    reject(resultInfo)
                } else {
                    resolve(resultInfo);
                }
            })
        });
    }
    var inputFileInfo = fs.statSync(inputPath);
    execFile(jdfWebpPng, [inputPath, "-q", quantity, "-o", outputPath], function(error, stdout, stderr) {
        var resultInfo = {
            error: error,
            stdout: stdout,
            stderr: stderr,
            inputPath: inputPath,
            outputPath: outputPath,
            router: "png2webp",
            inputFileInfo: inputFileInfo,
        };
        if (!error) {
            resultInfo.outputFileInfo = fs.statSync(outputPath);
            resultInfo.compression = parseFloat(((resultInfo.inputFileInfo.size - resultInfo.outputFileInfo.size) / resultInfo.inputFileInfo.size).toFixed(2));
        }
        callBack(resultInfo);
    });
};


handles.gif2webp = function(inputPath, outputPath, quantity, callBack) {
    if (typeof(quantity) == "function") {
        callBack = quantity;
        quantity = "75";
    }
    if (typeof(quantity) != "function" && typeof(callBack) != "function") {
        quantity = quantity || "75";
        return new Promise(function(resolve, reject) {
            handles.gif2webp(inputPath, outputPath, quantity, function(resultInfo) {
                if (resultInfo.error) {
                    reject(resultInfo)
                } else {
                    resolve(resultInfo);
                }
            })
        });
    }
    var inputFileInfo = fs.statSync(inputPath);
    execFile(jdfWebpGif, [inputPath, "-q", quantity, "-o", outputPath], function(error, stdout, stderr) {
        var resultInfo = {
            error: error,
            stdout: stdout,
            stderr: stderr,
            inputPath: inputPath,
            outputPath: outputPath,
            router: "gif2webp",
            inputFileInfo: inputFileInfo,
        };
        if (!error) {
            resultInfo.outputFileInfo = fs.statSync(outputPath);
            resultInfo.compression = parseFloat(((resultInfo.inputFileInfo.size - resultInfo.outputFileInfo.size) / resultInfo.inputFileInfo.size).toFixed(2));
        }
        callBack(resultInfo);
    });
};


handles.all = function(inputPath, outputPath, withWebp, quantity, callBack) {
    if (typeof(quantity) == "function") {
        callBack = quantity;
        quantity = null;
    }
    if (typeof(quantity) != "function" && typeof(callBack) != "function") {
        return new Promise(function(resolve, reject) {
            handles.all(inputPath, outputPath, withWebp, quantity, function(resultInfo) {
                if (resultInfo.error) {
                    reject(resultInfo)
                } else {
                    resolve(resultInfo);
                }
            })
        });
    }
    var ext = path.extname(inputPath);
    var router;
    var webpRouter;
    switch (ext) {
        case ".jpg":
            router = handles.jpg;
            quantity = quantity || "80"
            break;
        case ".jpeg":
            router = handles.jpg;
            quantity = quantity || "80"
            break;
        case ".png":
            router = handles.png;
            webpRouter = handles.png2webp;
            quantity = quantity || "60-80"
            break;
        case ".gif":
            router = handles.gif;
            webpRouter = handles.gif2webp;
            quantity = quantity || "80"
            break;
    }
    router(inputPath, outputPath, quantity, function(info) {
        if (withWebp && webpRouter) {
            webpRouter(inputPath, outputPath+".webp", function(_info) {
                callBack([info, _info]);
            })
        } else {
            callBack(info);
        }
    });
}
module.exports = handles;
