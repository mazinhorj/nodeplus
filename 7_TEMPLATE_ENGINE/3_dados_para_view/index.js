const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res)=> {
    const usuario = {
        nome: 'Osmar',
        sobrenome: 'Silva',
    }
    res.render('home', {usuario: usuario})
})

app.listen(3000, () => {
    console.log('App rodando')
})