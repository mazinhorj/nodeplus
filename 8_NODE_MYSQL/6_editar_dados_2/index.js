const express = require('express')
const exphbs = require('express-handlebars') 
const mysql = require('mysql')


const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/books/insertbook', (req, res) => { //cadastra livros e vai para a estante
    const titulo = req.body.titulo
    const qtpag = req.body.qtpag

    const insertquery = `INSERT INTO books (titulo, qtpag) VALUES ('${titulo}', '${qtpag}')`

    conn.query(insertquery, function(err){
        if (err) {
            console.log(err)
            return
        }

        res.redirect('/books')
    })
})

app.get('/books', (req, res) => { //monta a estante
    const selectquery = `SELECT * FROM books`
    conn.query(selectquery, function(err, dados){
        if (err) {
            console.log(err)
            return
        }

        const books = dados
        console.log(books)

        res.render('books', {books})
    })
})


app.get('/kdbook', (req, res) => { //rota para a busca por título
    res.render('kdbook')
})

app.post('/kdbook/titulob', (req, res) => { //busca livro pelo titulo
    const titulob = req.body.titulo
    const buscaqueryb = `SELECT * FROM books WHERE titulo = '${titulob}'`
    conn.query(buscaqueryb, function(err, busca){
        if (err) {
            console.log(err)
            return
        }
    const bookt = busca
    console.log(bookt)

    res.render('bookt', {bookt})
    })
})


app.get('/books/:id', (req, res) => { //mostra apenas o livro selecionado na página exclusiva
    const id = req.params.id
    const buscaquery = `SELECT * FROM books WHERE id = '${id}'`
    conn.query(buscaquery, function(err, dado){
        if (err) {
            console.log(err)
            return
        }

    const book = dado
    console.log(book)

    res.render('book', {book})
    })
})

app.get('/books/edit/:id', (req, res) => {// abre para edição do livro
    const id = req.params.id
    const buscaqueryc = `SELECT * FROM books WHERE id = '${id}'`
    conn.query(buscaqueryc, function(err, dado){
        if (err) {
            console.log(err)
            return
        }

    const book = dado[0]
    console.log(book)

    res.render('bookedit', {book})
    })
})

app.post('/books/updtbook', (req, res) => { //grava a atualização
    const id = req.body.id
    const titulo = req.body.titulo
    const qtpag = req.body.qtpag

    const atualizaquery = `UPDATE books SET titulo = '${titulo}', qtpag = '${qtpag}' WHERE id = ${id}`

    conn.query(atualizaquery, function(err){
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/books')
    })

})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql',
})

conn.connect(function(err) {
    if (err) {
        console.log(err)
    }

    console.log('Conectado e logado no DB')

    app.listen(5500)
})

