const express = require('express')

const app = express()

const port = 3000 //variavel ambiente 

const path = require('path')

const basePath = path.join(__dirname, 'modelos')

const checkAuth = function (req, res, next) {
    req.authStatus = false
    if (req.authStatus) {
        console.log('Logado')
        next()
    } else {
        console.log('Faça login para continuar.')
        next()
    }
}

app.use(checkAuth)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})

//process.exit() 