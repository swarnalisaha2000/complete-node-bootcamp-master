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

const replacetemplate = (temp,product) =>{
    let output = temp.replace(/{%productName%}/g,product.productName);
    output = output.replace(/{%image%}/g,product.image);
    output = output.replace(/{%from%}/g,product.from);
    output = output.replace(/{%nutrients%}/g,product.nutrients);
    output = output.replace(/{%quantity%}/g,product.quantity);
    output = output.replace(/{%description%}/g,product.description);
    output = output.replace(/{%id%}/g,product.id);

    if(!product.organic){
        output = output.replace(/{%id%}/g,product.id);
    }
}
const tempOverview=fs.readFileSync('./templates/overview.html','utf-8');
const tempCard=fs.readFileSync('./templates/template_card.html','utf-8');
const tempProduct=fs.readFileSync('./templates/product.html','utf-8');

const data=fs.readFileSync('./dev-data/data.json','utf-8');
const productData=JSON.parse(data);
//const pathaname = req.url;

const server = http.createServer((req, res)=>{
    const pathaname = req.url;
    //Overview
    if(pathaname==='/' || pathaname==='/overview'){
        res.writeHead(200,{'Context-type':'text/html'});

        const cardshtml = productData.map(el => replacetemplate(tempCard,el))

        res.end(tempOverview);
    }

    //API
    else if(pathaname==='/api'){
        res.writeHead(200,{'Context-type':'application/json'});
        //console.log(productData);
        res.end(data);
        //res.end('API');
    }


    //Product
    else if(pathaname==='/product'){
        
        res.end('Product');
    }


    //Page not found
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