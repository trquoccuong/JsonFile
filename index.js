var fs = require('fs');
var path = require('path');
var stack = require('callsite');
module.exports =  function (filePath,data,option) {
        var userStack =  stack();
        var dataToFile;
        var writePath;
        var option = option || {};
        if(typeof data === 'object') {
            var cache = [];
            dataToFile = JSON.stringify(data, function (key,value) {
                if (typeof value === 'object' && value !== null) {
                    if (cache.indexOf(value) !== -1) {
                        return '[Circular]';
                    }
                    cache.push(value);
                    if(Array.isArray(value)){
                        if(option.array) {
                            return value
                        }
                        return '[Array]'
                    }
                }
                return value;
            }, (option.space || 2));
        } else if (typeof data === 'string'){
            dataToFile = data
        } else if (typeof data === 'function') {
            dataToFile = data.toString();
        } else {
            dataToFile = data;
        }
        if(path.isAbsolute(filePath)) {
            writePath = filePath;
        } else {
            console.log(userStack[1].getFileName());
            console.log(filePath)
            writePath = path.dirname(userStack[1].getFileName())  + '/' + filePath;
        }
        if(option.sync) {
            fs.writeFileSync(writePath,dataToFile);
            cache = null;
        } else {
            fs.writeFile(writePath,dataToFile,function(err,result){
                if(err) {
                    console.log('Cant read file' , err)
                }
                cache = null;
            })
        }
    }