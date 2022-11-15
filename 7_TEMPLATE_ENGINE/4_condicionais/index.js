const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res)=> {
    res.render('dashboard')
})

app.get('/', (req, res)=> {
    const usuario = {
        nome: 'Osmar',
        sobrenome: 'Silva',
        idade: '39'
    }

    const autenticado = true

    res.render('home', {usuario: usuario, autenticado})
})

app.listen(3000, () => {
    console.log('App rodando')
})