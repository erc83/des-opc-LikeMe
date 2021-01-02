const { Pool } = require('pg')

const config = {
    user: 'erc83',
    password: '2210',
    host: 'localhost',
    database: 'likeme',
    port: 5432
}

const pool = new Pool(config)

async function newPost(postObject){
    const qryObject = {
        text: 'INSERT INTO posts (usuario, url, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *', 
        values: [ postObject.usuario, postObject.URL, postObject.descripcion ]  // desde el front recibimos un objeto y no tocarlo en el server
        // creamos un nuevo array, y el like va con 0 para que no quede null
    }
    try {
        const result = await pool.query(qryObject)
        return result.rows   // con el [0]  devuelve solo un objeto
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    newPost
}

//newPost({usuario: 'Juan', URL: '#', descripcion:'hola soy juan'})   //para crear necesita este objeto