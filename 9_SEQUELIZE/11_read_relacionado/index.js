const express = require('express') // web framework
const exphbs = require('express-handlebars') // templates
const conn = require('./db/conn') // controla a conexão com o banco - sequelize usado

const User = require('./models/User') // model para tabela de usuários
const Address = require('./models/Address') // model para tabela de endereos

const hbs = exphbs.create({
    partialsDir: ['views/partials'], // não sei explicar direito kkk
})

const app = express()

app.use( // nem essa...
    express.urlencoded({
        extended: true
    })
)

app.use(express.json()) // ???

app.engine('handlebars', hbs.engine) // isso tá diferente do código base do curso da udemy, mas só funciona assim
app.set('view engine', 'handlebars') // explicar

app.use(express.static('public')) // acessa a pasta public?

app.get('/users/create', (req, res) => { // rota para a página de cadastro de usuarios
    res.render('adduser')
})

app.post('/users/create', async (req, res) => { //passa o cadastro para o banco e redireciona para home
    const nome = req.body.nome
    const profissao = req.body.profissao
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    }

    await User.create({nome, profissao, newsletter})

    res.redirect('/')
})

app.get('/users/:id', async (req, res) => { // rota para a página de usuario unico
    const id = req.params.id

    const user = await User.findOne({raw: true, where: {id: id}})
    res.render('userview', {user})

})

app.get('/users/edit/:id', async (req, res) => { // rota para página de edição de usuário
    const id = req.params.id

    try {
        const user = await User.findOne({include: Address, where: {id: id}})
        res.render('edituser', {user: user.get({plain: true})})
    } catch (error) {
        console.log(error)
    }
})

app.post('/users/update', async (req, res) => { // envia as atualizações para o banco e redireciona para home
    const id = req.body.id
    const nome = req.body.nome
    const profissao = req.body.profissao
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    } else {
        newsletter = false
    }

    const userData = {
        id,
        nome,
        profissao,
        newsletter
    }

    await User.update(userData, {where: {id: id}})

    res.redirect('/')

})

app.post('/users/delete/:id', async (req, res) => { // exclui o usuário do banco
    const id = req.params.id

    await User.destroy({raw: true, where: {id: id}})
    res.redirect('/')

})

app.post('/address/create', async (req, res) => { // na página de edição de usuario tem um form para incluir endereço
    const UserId = req.body.UserId
    const rua = req.body.rua
    const numero = req.body.numero
    const cidade = req.body.cidade

    const address = {
        UserId,
        rua,
        numero,
        cidade
    }

    await Address.create(address)

    res.redirect(`/users/edit/${UserId}`)
})

app.get('/', async (req, res) => { // rota para home da aplicação
    const users = await User.findAll({raw: true})

    console.log(users)

    res.render('home', {users})
})

//conexão e porta
conn
//.sync({force:true})
.sync()
.then(() => {
    app.listen(5500)
}).catch((err) => console.log(err))





