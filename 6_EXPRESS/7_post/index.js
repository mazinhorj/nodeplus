const express = require('express')

const app = express()

const port = 3000 //variavel ambiente 

const path = require('path')

//ler o body
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

const basePath = path.join(__dirname, 'modelos')

app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

app.post('/users/save', (req, res) => {
    console.log(req.body)

    const nome = req.body.nome
    const idade = req.body.idade
    console.log(`O usuário cadastrado foi ${nome} e tem ${idade} anos.`)
    res.sendFile(`${basePath}/userform.html`)
})


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