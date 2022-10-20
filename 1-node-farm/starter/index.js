//FILES

// const hello = 'Hello World';
// Blocking or synchronous Code

// const fs  = require('fs');
// const textin = fs.readFileSync('./txt/input.txt','utf-8');
// const textOut =  `This is what we know about Avocado:${textin}.\nCreated at ${Date.now()}.`
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('File written');


// Non-Blocking or Asynchronous Code
// const fs  = require('fs');
// fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
//     if(err) return console.log('ERROR');
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
//             console.log(data3);

//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err =>{
//                 console.log('File written');
//             });
//         });
//     });
// });
//console.log('Will read file');


//Files