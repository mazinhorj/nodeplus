const express = require('express')

const app = express()

const port = 3000 //variavel ambiente 

const path = require('path')

const basePath = path.join(__dirname, 'modelos')

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    // aqui lê o id no db
    console.log(`Procurando usuário ${id}`)

    res.sendFile(`${basePath}/users.html`)
})

//    const checkAuth = function (req, res, next) {
//        req.authStatus = false
//        if (req.authStatus) {
//            console.log('Logado')
//            next()
//        } else {
//            console.log('Faça login para continuar.')
//            next()
//        }
//    }

//    app.use(checkAuth)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})

//process.exit() 