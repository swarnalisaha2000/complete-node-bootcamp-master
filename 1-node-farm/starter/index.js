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
const replacetemplate =  require('./modules/replacetemplate');
const slugify = require('slugify');

const tempOverview=fs.readFileSync('./templates/overview.html','utf-8');
const tempCard=fs.readFileSync('./templates/template_card.html','utf-8');
const tempProduct=fs.readFileSync('./templates/product.html','utf-8');

const data=fs.readFileSync('./dev-data/data.json','utf-8');
const productData=JSON.parse(data);
const slugs = productData.map(el => slugify(el.productName,{
    lower:true
}));
console.log(slugs);
//const pathaname = req.url;

const server = http.createServer((req, res)=>{
    console.log(req.url);
    const { query, pathname } = url.parse(req.url, true);
    const pathaname = req.url;
    //Overview
    if(pathname==='/' || pathname==='/overview'){
        res.writeHead(200,{'Context-type':'text/html'});

        const cardshtml = productData.map(el => replacetemplate(tempCard,el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardshtml);
        res.end(output);
    }

    //API
    else if(pathname==='/api'){
        res.writeHead(200,{'Context-type':'application/json'});
        //console.log(productData);
        res.end(data);
        //res.end('API');
    }


    //Product
    else if(pathname==='/product'){
        res.writeHead(200,{'Context-type':'application/json'});
        const product = productData[query.id];
        const output = replacetemplate(tempProduct,product);
        res.end(output);
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

