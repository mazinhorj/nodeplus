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

app.post('/books/insertbook', (req, res) => {
    const titulo = req.body.titulo
    const qtpag = req.body.qtpag

    const querysql = `INSERT INTO books (titulo, qtpag) VALUES ('${titulo}', '${qtpag}')`

    conn.query(querysql, function(err){
        if (err) {
            console.log(err)
        }

        res.redirect('/')
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

