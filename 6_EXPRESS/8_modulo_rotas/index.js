const express = require('express')

const app = express()

const port = 3000 //variavel ambiente 

const path = require('path')

const users = require('./users')

//ler o body
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

const basePath = path.join(__dirname, 'modelos')

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

app.use('/users', users)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})




//process.exit() 