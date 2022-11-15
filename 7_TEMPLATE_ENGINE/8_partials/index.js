const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine)
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

app.get('/blog', (req, res) => {
    const posts = [
        {
            titulo: 'Aprender Node.js',
            categoria: 'JS',
            body: 'Bla bla bla bla...',
            comentarios: 4,
        },
        {
            titulo: 'Aprender PHP',
            categoria: 'PHP',
            body: 'Blaas blasd bladg bladfg...',
            comentarios: 6,
        },
        {
            titulo: 'Aprender Java',
            categoria: 'Java',
            body: 'Blaasdfgh bldsfgasd blfhjmadg bladrtyfg...',
            comentarios: 5,
        },
        {
            titulo: 'Aprender Ruby',
            categoria: 'Ruby',
            body: 'Blaafbdfs blsdgssdsdasd blasdgsdgsdsddg blsdsfsdfdsfsadfg...',
            comentarios: 6,
        },
    ]

    res.render('blog', {posts})
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