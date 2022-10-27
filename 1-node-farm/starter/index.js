//FILES

// const hello = 'Hello World';
// Blocking or synchronous Code

const fs  = require('fs');
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


//SERVER

const http=require('http');
const url = require('url');

const data=fs.readFileSync('./dev-data/data.json','utf-8');
const productData=JSON.parse(data);


const server = http.createServer((req, res)=>{
    const pathaname = req.url;
    if(pathaname==='/' || pathaname==='/overview'){
        
        res.end('Overview');
    }
    else if(pathaname==='/api'){
        res.writeHead(200,{'Context-type':'application/json'});
        //console.log(productData);
        res.end(data);
        //res.end('API');
    }
    else if(pathaname==='/product'){
        
        res.end('Product');
    }
    //console.log(req.url);
    //res.end('Hello'); 
    else{
        res.writeHead(404,{
            'Context-type':'text/html',
            'my-header':'hello'
        });
        res.end('<h1>Page not found</h1>');
    }
});
server.listen(8000,'127.0.0.1',()=>{
    console.log('Listening to request');
});