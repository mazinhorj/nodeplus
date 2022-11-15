const express = require('express')
const router = express.Router()
const path = require('path')

const basePath = path.join(__dirname, '../modelos')

router.get('/pesquisa', (req, res) => {
    res.sendFile(`${basePath}/pesquisa.html`)
})

router.post('/save', (req, res) => {
    console.log(req.body)

    const pesquisado = req.body.termo
    console.log(`O usuário pesquisou por ${pesquisado}.`)
    res.sendFile(`${basePath}/pesquisa.html`)
})

module.exports = router