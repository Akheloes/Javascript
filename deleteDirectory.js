const fs = require('fs');
const path = require('path');

function deleteFile(dir, file) {
    return new Promise(function (resolve, reject) {
        var filePath = path.join(dir, file);
        fs.lstat(filePath, function (err, stats) { //returns stats object on a file path
            if (err) { return reject(err); }
            if (stats.isDirectory()) { //If the file path indicates a directory
                resolve(deleteDirectory(filePath));
            } else {
                fs.unlink(filePath, function (err) { //Asynchronously removes a file or symbolic link
                    if (err) { return reject(err); }
                    resolve();
                });
            }
        });
    });
};

function deleteDirectory(dir) {
    return new Promise(function (resolve, reject) {
        fs.access(dir, function (err) { //Tests a user's permissions for the file or directory
            if (err) { return reject(err); }
            fs.readdir(dir, function (err, files) { //Reads the contents of a directory
                if (err) { return reject(err); }
                Promise.all(files.map(function (file) {
                    return deleteFile(dir, file);
                })).then(function () {
                    fs.rmdir(dir, function (err) { //remove directory
                        if (err) { return reject(err); }
                        resolve();
                    });
                }).catch(reject);
            });
        });
    });
};

//Exemple of use:

// var directory = path.join('.', 'folder_to_erase');
// deleteDirectory(directory);
