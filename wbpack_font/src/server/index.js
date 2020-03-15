

if(typeof window === 'undefined'){
    global.window = {}
}



const express = require('express');
const {renderToString} = require('react-dom/server');

const Ssr = require('../../dist/search-server');

const fs = require('fs');
const path = require('path');
const template = fs.readFileSync(path.join(__dirname,'../../dist/search.html'),'utf-8');
const data = require('./data.json');

const server = (port) =>{
    const app = express();

    app.use(express.static(path.join(__dirname, '../../dist')));
    app.get('/search',(req,res)=>{
        const html = renderMarkup(renderToString(Ssr))
        res.status(200).send(html);
    });
    app.listen(port,()=>{
        console.log('success')
    })
}

server(process.env.PORT|| 3000);


const renderMarkup = str =>{
    return template.replace('<!-- lalalalalalala -->',str).replace('<!-- shuju -->',`<script>${JSON.stringify(data)}</script>`)
}