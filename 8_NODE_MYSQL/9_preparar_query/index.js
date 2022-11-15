const express = require('express')
const exphbs = require('express-handlebars') 
const pool = require('./db/conn')


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

    const insertquery = `INSERT INTO books (??, ??) VALUES (?, ?)`
    const sanit = ['titulo', 'qtpag', titulo, qtpag]

    pool.query(insertquery, sanit, function(err){
        if (err) {
            console.log(err)
            return
        }

        res.redirect('/books')
    })
})

app.get('/books', (req, res) => { //monta a estante
    const selectquery = `SELECT * FROM books`
    pool.query(selectquery, function(err, dados){
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
    pool.query(buscaqueryb, function(err, busca){
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
    const buscaquery = `SELECT * FROM books WHERE ?? = ?`
    const sanit = ['id', id]
    pool.query(buscaquery, sanit, function(err, dado){
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
    const buscaqueryc = `SELECT * FROM books WHERE ?? = ?`
    const sanit = ['id', id]
    pool.query(buscaqueryc, sanit, function(err, dado){
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

    const atualizaquery = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
    const sanit = ['titulo', titulo, 'qtpag', qtpag, 'id', id]
    pool.query(atualizaquery, sanit, function(err){
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})

app.post('/books/excluir/:id', (req, res) => {
    const id = req.params.id

    const deletaquery = `DELETE FROM books WHERE ?? = ?`
    const sanit = ['id', id]

    pool.query(deletaquery, sanit, function(err){
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})

app.listen(5500)


