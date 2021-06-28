const fs = require('fs');

function main(args) {
    findFiles(args)
}

function findFiles(args) {
    const name = args[0];
    const matches = findFilesMatching(name);

    console.log('matches', matches);
}

function findFilesMatching(name) {
    const files = fs.readdirSync(process.cwd());

    return files.filter(fileName => fileName.includes(name));
}

main(process.argv.slice(2));