const http = require('http')
const fs = require('fs')
const { newPost, updatePost, indexPost} = require('./db')
const url = require('url')

const server = http.createServer(async(req,res)=>{
    
    //if(req.url.startwith('/post/'))
    
    if(req.url == '/' && req.method == 'GET'){
        fs.readFile('./views/index.html',(err, file)=>{
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(file, 'utf-8')
            res.end()
        })
    } 
    // crear post
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
    if(req.url.startsWith('/post?id') && req.method === 'PUT'){   //post con un id put ac
        const { id } = url.parse(req.url, true).query;   //guardando en una constante id el id que queremos actualizar
        const post = await updatePost(id)               // una vez con el id llamamos al metodo updatePost se el entrega ese id
                        //cuando retorne vamos a devolver el post modificado, es una buena practica que retorne siempre algo 
        res.writeHeader(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(post))
    }
    if(req.url === '/posts' && req.method === 'GET'){
        const posts = await indexPost()

        res.writeHeader(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(posts))
    }
})
server.listen(3000, ()=> console.log('servidor 3000 on'))