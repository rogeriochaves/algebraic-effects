const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);

async function main(args) {
    await findFiles(args)
}

async function findFiles(args) {
    const name = args[0];
    const matches = await findFilesMatching(name);

    console.log('matches', matches);
}

async function findFilesMatching(name) {
    const files = await readdir(process.cwd());

    return files.filter(fileName => fileName.includes(name));
}

main(process.argv.slice(2));