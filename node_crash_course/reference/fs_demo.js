const fs = require('fs');
const path = require('path');

// Create folder
// fs.mkdir(path.join(__dirname, 'test'), {}, err => {
//  if (err) throw err;
//  console.log('Folder created...');
// })


// Create and write to file
// fs.writeFile(path.join(__dirname, 'test', 'hello.txt'), 'Hello World!', err => {
//  if (err) throw err;
//  console.log('File written to...');
// })

// Create, write and append a file
// fs.writeFile(path.join(__dirname, 'test', 'hello.txt'), 'Hello World!', err => {
//  if (err) throw err;
//  console.log('hello.txt has been created...');

//  fs.appendFile(path.join(__dirname, 'test', 'hello.txt'), ' I love Node.js', err => {
//    if (err) throw err;
//    console.log('hello.txt successfully appended...');
//  })
// })

// Read file
// fs.readFile(path.join(__dirname, 'test', 'hello.txt'), 'utf-8', (err, data) => {
//  if (err) throw error;
//  console.log(data);
// })

// Rename file
// fs.rename(
//  path.join(__dirname, 'test', 'hello.txt'),
//  path.join(__dirname, 'test', 'helloworld.txt'),
//  err => {
//    console.log('the file has been renamed...');
//  }
// )