const express = require('express')
const router = express.Router()
const path = require('path')

// app.use(express.json())

const basePath = path.join(__dirname, '../modelos')

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

router.post('/save', (req, res) => {
    console.log(req.body)

    const nome = req.body.nome
    const idade = req.body.idade
    console.log(`O usuário cadastrado foi ${nome} e tem ${idade} anos.`)
    res.sendFile(`${basePath}/userform.html`)
})


router.get('/:id', (req, res) => {
    const id = req.params.id
    // aqui lê o id no db
    console.log(`Procurando usuário ${id}`)

    res.sendFile(`${basePath}/users.html`)
})

module.exports = router