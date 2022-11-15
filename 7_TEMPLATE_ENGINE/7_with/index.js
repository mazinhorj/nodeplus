const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res)=> {
    const itens = ['it_a', 'it_b', 'it_c', 'it_d']
    res.render('dashboard', {itens})
})

app.get('/post', (req, res)=> {
    const post = {
        titulo: 'Aprender Node.js',
        categoria: 'JS',
        body: 'Bla bla bla bla...',
        comentarios: 4,
    }
    res.render('blogpost', {post})
})

app.get('/', (req, res)=> {
    const usuario = {
        nome: 'Osmar',
        sobrenome: 'Silva',
        idade: '39'
    }

    const autenticado = true

    const aprovado = true

    res.render('home', {usuario: usuario, autenticado, aprovado})
})

app.listen(3000, () => {
    console.log('App rodando')
})