const express = require('express')
const exphbs = require('express-handlebars') 
const mysql = require('mysql')


const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

const app = express()

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
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