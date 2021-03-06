var dgf = require('../');
var assert = require('chai').assert;
var expect = require('chai').expect;
var check = require("check-type");
var path = require('path');
var fs = require('fs');

var unitTestFolder = path.dirname(__filename);

describe ('dgf.outputs.file', function() {
    
    it ('should get file by relative path', function () {
        
        var relativePath = 'testFolder/outputs/files/test.txt';
        var filePath = path.resolve(unitTestFolder , relativePath);
        assert.equal(filePath, unitTestFolder + '/' + relativePath);
        
        
        fs.exists(filePath, function (exists) {
          assert.isDefined(exists);
        });
    });
    
    it ('should append data on existing file', function () {
        var filePath = path.resolve(unitTestFolder, 'testFolder/outputs/files/existingFile.txt');
        fs.writeFileSync(filePath, '');
        var fileOutput = dgf.outputs.file({
            path: filePath,
            encoding: 'utf-8'
        });        
        var contentToAdd = 'Line 1\nLine 2';
        
        fileOutput.write(contentToAdd);
        
        var fileContent = fs.readFileSync(filePath, 'utf-8');
        
        assert.equal(fileContent, contentToAdd + '\n');
        
        fs.unlinkSync(filePath);
    });
    
    it ('should create file and path if not exists', function () {
        
        var filePath = path.resolve(unitTestFolder, 'testFolder/outputs/unexistingFolder/unexistingFile.txt');
                
        var fileOutput = dgf.outputs.file({
            path: filePath,
            encoding: 'utf-8'
        });        
        var contentToAdd = 'Line 1\nLine 2';
        
        fileOutput.write(contentToAdd);
        
        var fileContent = fs.readFileSync(filePath, 'utf-8');        
        
        fs.unlinkSync(filePath);
        fs.rmdirSync(path.dirname(filePath));
        
        assert.equal(fileContent, contentToAdd + '\n');        
    });
    
    it ('should create file and not parent', function () {
        
        var filePath = path.resolve(unitTestFolder, 'testFolder/outputs/existingFolder/unexistingFile.txt');
                
        var fileOutput = dgf.outputs.file({
            path: filePath,
            encoding: 'utf-8'
        });        
        var contentToAdd = 'Line 1\nLine 2';
        
        fileOutput.write(contentToAdd);
        
        var fileContent = fs.readFileSync(filePath, 'utf-8');
        
        fs.unlinkSync(filePath);
        assert.equal(fileContent, contentToAdd + '\n');        
    });
});