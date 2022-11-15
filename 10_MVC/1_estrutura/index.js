const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

// necessário para a aplicação funcionar!!!
const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

const conn = require('./db/conn')

app.engine('handlebars', hbs.engine) //exphbs() <- antiga chamada da template engine
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(
    express.json()
)

app.use(
    express.static('public')
)

app.listen(5500)