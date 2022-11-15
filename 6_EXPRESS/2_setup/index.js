const express = require('express')

const app = express()

const port = 5500

app.get('/', (req, res) => {
    res.send('Olá, Mundo!')
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})

//process.exit()