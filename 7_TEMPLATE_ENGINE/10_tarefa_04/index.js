const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))


// dados


const produtos = [
    {
        id: '1',
        titulo: 'Bolo de coco',
        preco: 13.99,
        descricao: 'Ducimus quos doloribus officia rerum hic. Iste incidunt magnam obcaecati beatae sit, voluptate cum. Odio necessitatibus doloribus in beatae sint voluptatibus ratione. Optio perspiciatis sit enim ea blanditiis, molestiae perferendis beatae necessitatibus! Numquam perferendis natus possimus omnis explicabo, doloremque odit nemo! Laudantium, nulla blanditiis!'
    },
    {
        id: '2',
        titulo: 'Bolo de festa - 30 pessoas',
        preco: 199.99,
        descricao: 'Ducimus quos doloribus officia rerum hic. Iste incidunt magnam obcaecati beatae sit, voluptate cum. Odio necessitatibus doloribus in beatae sint voluptatibus ratione. Optio perspiciatis sit enim ea blanditiis, molestiae perferendis beatae necessitatibus! Numquam perferendis natus possimus omnis explicabo, doloremque odit nemo! Laudantium, nulla blanditiis!'
    },
    {
        id: '3',
        titulo: '10 Brigadeiros mini',
        preco: 18.55,
        descricao: 'Ducimus quos doloribus officia rerum hic. Iste incidunt magnam obcaecati beatae sit, voluptate cum. Odio necessitatibus doloribus in beatae sint voluptatibus ratione. Optio perspiciatis sit enim ea blanditiis, molestiae perferendis beatae necessitatibus! Numquam perferendis natus possimus omnis explicabo, doloremque odit nemo! Laudantium, nulla blanditiis!'
    },
    {
        id: '4',
        titulo: '25 Brigadeiros mini',
        preco: 38.55,
        descricao: 'Ducimus quos doloribus officia rerum hic. Iste incidunt magnam obcaecati beatae sit, voluptate cum. Odio necessitatibus doloribus in beatae sint voluptatibus ratione. Optio perspiciatis sit enim ea blanditiis, molestiae perferendis beatae necessitatibus! Numquam perferendis natus possimus omnis explicabo, doloremque odit nemo! Laudantium, nulla blanditiis!'
    },
]

app.get('/', (req, res) => {
    res.render('home', {produtos})
})

app.get('/produto/:id', (req, res) => {
    const produto = produtos[parseInt(req.params.id) -1]
    res.render('produto', {produto})
})

app.listen(3000, () => {
    console.log('App rodando')
})