const http = require('http')
const fs = require('fs')
const { newPost } = require('./db')

const server = http.createServer((req,res)=>{
    if(req.url == '/' && req.method == 'GET'){
        fs.readFile('./views/index.html',(err, file)=>{
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(file, 'utf-8')
            res.end()
        })
    } 

    if(req.url === '/post' && req.method ==='POST'){
        let body                                //let body al estar solo es igual a = undefined
        // req.on('data', (datos) => {
        //     //body = datos
        //     body = JSON.parse(datos)   //aqui se pasa el objeto directamente desde javascrip           
        // })
        req.on('data', datos => body = JSON.parse(datos))  //  el el mismo req.on que esta arriba comentado usando arrow function
        req.on('end', async ()=>{     
            const datos = await newPost(body)
            //console.log(datos)
            res.writeHeader(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(datos))
        })
    }
})
server.listen(3000, ()=> console.log('servidor 3000 on'))