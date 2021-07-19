"use strict";
// Run from root with `nodemon scripts/StyledComponentsScanner/scan.ts --exec "ts-node scripts/StyledComponentsScanner/scan.ts"`
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var promises_1 = require("fs/promises");
var types_1 = require("./types");
var _a = process.argv, args = _a.slice(2);
var rootDirectory = args[0] || './src';
/**
 * `styled` element regex
 * Group 1 is the component type. "." for html-element, "(" for custom-element.
 * Group 2 is the element name
 * @type {RegExp}
 */
var findStyledUsesRegex = /styled([.(]?)([\w]+)[)]?/g;
// Get an array of files to scan
function getFileList(dirPath, arrayOfFiles) {
    if (arrayOfFiles === void 0) { arrayOfFiles = []; }
    var dirContents = fs_1.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    dirContents.forEach(function (fileName) {
        if (fs_1.statSync(dirPath + "/" + fileName).isDirectory()) {
            arrayOfFiles = getFileList(dirPath + "/" + fileName, arrayOfFiles);
        }
        else {
            var ext = path_1.default.extname(dirPath + "/" + fileName);
            if (ext === '.js' || ext === '.tsx') {
                arrayOfFiles.push(path_1.default.join(dirPath, '/', fileName));
            }
        }
    });
    return arrayOfFiles;
}
/**
 * Uses regex to scan a given file-buffer, and returns found uses of `styled`
 * with details.
 * @param fileName
 * @param buffer
 */
function scanBufferForStyledComponents(fileName, buffer) {
    var content = buffer.toString();
    var htmlElementsRestyled = 0;
    var customElementsRestyled = 0;
    var specificResults = {};
    var match = findStyledUsesRegex.exec(content);
    while (match != null) {
        var elementType = match[1] === '.' ? types_1.ElementType.HTML : types_1.ElementType.Custom;
        var elementName = match[2];
        // Increment general match
        if (elementType === types_1.ElementType.HTML) {
            htmlElementsRestyled += 1;
        }
        else {
            customElementsRestyled += 1;
        }
        // Create or increment exact dictionary
        if (Object.keys(specificResults).includes(elementName)) {
            specificResults[elementName] += 1;
        }
        else {
            specificResults[elementName] = 1;
        }
        // Continue...
        match = findStyledUsesRegex.exec(content);
    }
    return {
        filename: fileName,
        htmlElementCount: htmlElementsRestyled,
        customElementCount: customElementsRestyled,
        details: specificResults,
    };
}
var files = getFileList(rootDirectory);
// Scan all found files
Promise.all(files.map(function (fileName) {
    return promises_1.readFile(fileName).then(function (buffer) { return scanBufferForStyledComponents(fileName, buffer); });
})).then(function (fileScanResults) {
    var totalHtmlElementCount = 0;
    var totalCustomElementCount = 0;
    var specificObjects = {};
    fileScanResults.forEach(function (scanResult) {
        totalHtmlElementCount += scanResult.htmlElementCount;
        totalCustomElementCount += scanResult.customElementCount;
        Object.keys(scanResult.details).forEach(function (key) {
            if (Object.keys(specificObjects).includes(key)) {
                specificObjects[key] += 1;
            }
            else {
                specificObjects[key] = 1;
            }
        });
    });
    // Build a multi-file result
    console.log(fileScanResults.length + " files scanned");
    console.log("Found " + totalHtmlElementCount + " native HTML elements restyled");
    console.log("Found " + totalCustomElementCount + " custom elements restyled");
    console.log(specificObjects);
});
