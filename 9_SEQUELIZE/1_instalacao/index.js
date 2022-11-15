const express = require('express')
const exphbs = require('express-handlebars') 
const conn = require('./db/conn')


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



app.listen(5500)


