const express = require('express')
const exphbs = require('express-handlebars') 
const conn = require('./db/conn')

const User = require('./models/User')

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

app.get('/users/create', (req, res) => {
    res.render('adduser')
})

app.post('/users/create', async (req, res) => {
    const nome = req.body.nome
    const profissao = req.body.profissao
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    }

    await User.create({nome, profissao, newsletter})

    res.redirect('/')
})

app.get('/', async (req, res) => {
    const users = await User.findAll({raw: true})

    console.log(users)

    res.render('home', {users})
})

conn.sync().then(() => {
    app.listen(5500)
}).catch((err) => console.log(err))





