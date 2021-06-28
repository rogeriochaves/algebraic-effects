const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);

function main(args) {
    try {
        findFiles(args)
    } catch (effect) {
        resume(effect);
    }
}

function findFiles(args) {
    const name = args[0];
    const matches = findFilesMatching(name);

    console.log('matches', matches);
}

function findFilesMatching(name) {
    const files = perform(async () => await readdir(process.cwd()));

    return files.filter(fileName => fileName.includes(name));
}

main(process.argv.slice(2));

















// implementation details

function perform(task) {
    const caller = arguments.callee.caller;
    if (caller.result) {
        return caller.result;
    }

    const promise = task();
    promise.caller = caller;
    throw promise;
}

function resume(effect) {
    if (!(effect instanceof Promise)) throw effect;

    const resumePoint = arguments.callee.caller;
    const resumePointArgs = arguments.callee.caller.arguments;

    effect.then(result => {
        effect.caller.result = result;
        resumePoint.apply(resumePoint, Object.values(resumePointArgs));
    });
}
