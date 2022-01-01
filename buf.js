const fs = require('fs');
const {exec} = require("child_process");
const core = require('@actions/core');
const minimist = require('minimist')

const args = process.argv.slice(2)
const parsedArgs = minimist(args)
const workingDirectory = parsedArgs.workingDirectory
const bufCommand = parsedArgs.bufCommand

fs.readdir('.', (err, files) => {
    files.forEach(file => {
        fs.stat(file, (err, stats) => {
            if (stats.isDirectory() && file.endsWith('apis')) {
                let cmd
                if (bufCommand.includes('repository create')) {
                    cmd = `buf ${bufCommand}/${file} --visibility private || true`
                } else {
                    cmd = `cd ${workingDirectory}/${file} && buf ${bufCommand}`
                }
                runCommand(cmd)
            }
        });
    });
});

function runCommand(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                core.setFailed(error)
                reject(error)
            } else {
                const result = stdout ? stdout : stderr
                core.info(result)
                resolve(result)
            }
        });
    })
}