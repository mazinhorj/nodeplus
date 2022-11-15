// modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

// modulos internos
const fs = require('fs')

console.log("Starting Accounts") // apenas em DEV

operacao()

function operacao() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'acao',
                message: 'O que deseja fazer?',
                choices: [
                    'Criar conta',
                    'Consultar saldo',
                    'Depositar',
                    'Sacar',
                    'Sair'
                ],
            },
        ])
        .then((resposta) => {
            const acao = resposta['acao']
            console.log(chalk.bgBlue(acao)) // apenas em dev
            if (acao === 'Criar conta') {
                criaConta()

            } else if (acao === 'Depositar') {
                fazDeposito()

            } else if (acao === 'Consultar saldo') {
                consultaSaldo()
                
            } else if (acao === 'Sacar') {
                sacaDindin()
                
            }else if (acao === 'Sair') {
                console.log(chalk.bgBlue.black(' $$$ Obrigado por usar o Banco M $$$ '))
                process.exit()
            }
        })
        .catch((err) => console.log(err))
}

//criando a conta

function criaConta() {
    console.log(chalk.bgGreen.black(' Parabéns por escolher o banco M '))
    console.log(chalk.green(' Defina as opções da sua conta. '))
    construirConta()
}

function construirConta() {
    inquirer
        .prompt([
            {
                name: 'nomeConta',
                message: 'Digite um nome para conta: '
            }
        ]).then(resposta => {
            console.log(resposta) //apenas em DEV

            const nomeConta = resposta['nomeConta']
            console.info(nomeConta)

            if (!fs.existsSync('contas')) {
                fs.mkdirSync('contas')
            }

            if (fs.existsSync(`contas/${nomeConta}.json`)) {
                console.log(
                    chalk.bgRed.black('Esta conta já existe. Escolha outro nome, por favor!'),
                )
                construirConta()
                return
            }

            fs.writeFileSync(`contas/${nomeConta}.json`, '{"saldo": 0}',
                function (err) {
                    console.log(err)
                },
            )

            console.log(chalk.green(' Parabéns! Conta criada com sucesso. '))
            operacao()

        }).catch(err => console.log(err))
}

// depositar

function fazDeposito() {

    inquirer.prompt([
        {
            name: 'nomeConta',
            message: 'Qual no nome da conta? > '
        }
    ])
    .then((resposta) => {

        const nomeConta = resposta['nomeConta']
        //verificar existência da conta
        if (!checaConta(nomeConta)) {
            return fazDeposito()
        }

        inquirer.prompt([
            {
                name: 'qto',
                message: 'Qual valor do depósito? > '
            }
        ])
        .then((resposta) => {
            const qto = resposta['qto']

            // adicionar saldo
            maisDindin(nomeConta, qto)

        })
        .catch((err) => console.log(err))

    })
    .catch(err => console.log(err))

}


// função verificar existência da conta
function checaConta(nomeConta) {
    if (!fs.existsSync(`contas/${nomeConta}.json`)) {
        console.log(chalk.bgRed.black(' Conta inexistente. '))
        return false
    }
    return true
}

//função adicionar saldo
function maisDindin(nomeConta, qto) {
    const contaDeposito = pegaConta(nomeConta)
    if (!qto) {
        console.log(chalk.bgRed.black('Ocorreu um erro! Tente novamente.'),
        )
        return fazDeposito()
    }
    
    contaDeposito.saldo = parseFloat(qto) + parseFloat(contaDeposito.saldo)

    fs.writeFileSync (`contas/${nomeConta}.json`,
        JSON.stringify(contaDeposito),
        function (err) {
            console.log(err)
        }, 
    )
    
    // console.log(contaDeposito) //somente DEV
    console.log(chalk.green(` Foi depositado U$${qto} na conta ${nomeConta}. `))
    const saldoAtual = contaDeposito.saldo
    console.log(chalk.green(` Seu saldo atual é de U$${saldoAtual}. `))
    operacao()

}

function pegaConta(nomeConta) {
    const contaJSON = fs.readFileSync(`contas/${nomeConta}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })
    return JSON.parse(contaJSON)
}

function consultaSaldo() {
    inquirer.prompt([
        {
            name: 'nomeConta',
            message: 'Qual no nome da conta? > '
        }
    ])
    .then((resposta) => {

        const nomeConta = resposta['nomeConta']
        //verificar existência da conta
        if (!checaConta(nomeConta)) {
            return consultaSaldo()
        }
        const contaSaldo = pegaConta(nomeConta)
        const saldoAtual = contaSaldo.saldo
        console.log(chalk.green(` Seu saldo atual é de U$${saldoAtual}. `))
        operacao()
    })
    .catch(err => console.log(err))
}


function sacaDindin() {

    inquirer.prompt([
        {
            name: 'nomeConta',
            message: 'Qual no nome da conta? > '
        }
    ])
    .then((resposta) => {

        const nomeConta = resposta['nomeConta']
        //verificar existência da conta
        if (!checaConta(nomeConta)) {
            return sacaDindin()
        }

        inquirer.prompt([
            {
                name: 'qto',
                message: 'Qual valor do saque? > '
            }
        ])
        .then((resposta) => {
            const qto = resposta['qto']

            // diminuir saldo
            menosDindin(nomeConta, qto)

        })
        .catch((err) => console.log(err))

    })
    .catch(err => console.log(err))

}

//função diminuir saldo
function menosDindin(nomeConta, qto) {
    const contaSaque = pegaConta(nomeConta)
    if (!qto) {
        console.log(chalk.bgRed.black('Ocorreu um erro! Tente novamente.'),
        )
        return sacaDindin()
    }
    
    contaSaque.saldo = parseFloat(contaSaque.saldo) - parseFloat(qto)

    fs.writeFileSync (`contas/${nomeConta}.json`,
        JSON.stringify(contaSaque),
        function (err) {
            console.log(err)
        }, 
    )
    
    // console.log(contaDeposito) //somente DEV
    console.log(chalk.green(` Foi sacado U$${qto} da conta ${nomeConta}. `))
    const saldoAtual = contaSaque.saldo
    console.log(chalk.green(` Seu saldo atual é de U$${saldoAtual}. `))
    operacao()

}