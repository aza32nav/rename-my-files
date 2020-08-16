#!/usr/bin/env node
const chalk = require('chalk')
const fs = require('fs')
const argv = require('yargs')
  .usage('Usage: $0 [options]')
  .example(
    '$0 --newname=FileName --changeop=true --digits=2',
    'Change the filenames in a directory for to digits: ' + 
    'example: Rename 1122_1.mp4 and 1122_12.mp4 to FileName_01.mp4 and FileName_12.mp4')
  .alias('n', 'newname')
  .describe('n', 'Its the new name for the files')
  .alias('c', 'changeop')
  .describe(
    'c',
    'Activate the change option with true, without true only see the possible changes')
  .alias('d', 'digits')
  .describe('d', 'number of digits for zero location: ' +
    'example 1 or 2 or 3 for 1 or 01 or 001')
  .demandOption(['n', 'd'])
  .help('h')
  .alias('h', 'help')
  .epilog('navogu 2019')
  .argv

let newFilename = argv.newname
let optionChange = argv.changeop
let digits = argv.digits

console.log(chalk.yellow('New name: ' + newFilename))
console.log(chalk.green('change: ' + (optionChange == 'true')))
console.log(chalk.green('digits: ' + digits))

fs.readdir(process.cwd(), (error, files) => {
  if (error) {
    console.log("Error read files")
    process.exit(1)
  }
  let onlyFiles = files.filter(file => fs.lstatSync(file).isFile())
  
  let onlyValidFiles = onlyFiles.filter(filename => {
    let validFile = new RegExp(/^\d{1,4}_\d{1,4}.mp4$/)
    return validFile.test(filename)
  })

  onlyValidFiles.forEach(filename => {
    let  [_, num] = filename.split(".")[0].split("_")
    let len = num.length

    if (digits == '2') {
      if (len == 1) num = "0" + num
    } else if (digits == '3') {
      if (len == 1) num = "00" + num
      if (len == 2) num = "0" + num
    }
    
    let newName = newFilename + "_" + num + ".mp4"
    console.log(chalk.blue("The old filename is: " + filename))
    console.log(chalk.cyan("The new filename is: " + newName))
    
    if (optionChange == 'true') {
      fs.rename(filename, newName, (error) => {
        if (error) throw error
        console.log(chalk.yellow(`File ${filename} -> ${newName} renamed!.`))
      })
    } 
  })
})
