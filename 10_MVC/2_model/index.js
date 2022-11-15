const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

const Task = require('./models/Task')

// necessário!!!
const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine) //exphbs() <- old call to template engine
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

conn
.sync()
.then(
    () => {
        app.listen(5500)
    })
.catch((err) => console.log(err))
