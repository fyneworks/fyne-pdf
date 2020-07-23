// https://stackoverflow.com/a/52177090/12237147

const fs = require("fs"); //import fs from "fs";

// DO NOT DELETE THIS FILE
// This file is used by build system to build a clean npm package
// frm the build folder

function main() {
    const source = fs.readFileSync(__dirname + "/package.json").toString('utf-8');
    const sourceObj = JSON.parse(source);
    sourceObj.scripts = {};
    sourceObj.devDependencies = {};
    if (sourceObj.main.startsWith("build/")) {
        sourceObj.main = sourceObj.main.slice(5);
    }
    fs.writeFileSync(__dirname + "/build/package.json", Buffer.from(JSON.stringify(sourceObj, null, 2), "utf-8") );
    //fs.writeFileSync(__dirname + "/build/version.txt", Buffer.from(sourceObj.version, "utf-8") );

    console.log("Wriing package.json for npmjs publishing");
    console.log(__dirname + "/build/package.json")
}

main();