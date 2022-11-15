const inquirer = require('inquirer')
const chalk  = require('chalk')

inquirer.prompt([
    {
        name: 'nome',
        message: 'Qual o seu nome? ',
    }, 
    {
        name: 'idade',
        message: 'Qual a sua idade? ',
    },
]).then((respostas) => {
    console.log(`Olá, ${respostas.nome}.`)
    idade = parseInt(respostas.idade)
    if (!Number.isInteger(idade)) {
        throw new Error(`Infelizmente ` + chalk.bgRed.black(` ${respostas.idade} `) + " não é uma idade válida. \n Programa encerrado!")
    } else {
        console.log('Verificando sua idade...')
    }

    if (idade < 18) {
        console.log('você é menor de 18 anos enão pode prosseguir.')
    } else {
        console.log(`Você tem ${idade} mesmo?`)
        inquirer.prompt([
            {
                name: 'idade_s',
                message: '[s][n] ',
            }, 
        ]).then((resposta) => {
            if (resposta.idade_s != 'n') {
                console.log(chalk.bgYellow.black(respostas.nome) + `, você está muito bem! Seja bem-vindo(a).`)
            } else {
                console.log(`Sai daqui ${respostas.nome}, intruso!`)
            }
        }).catch((err) => console.log(err))
    }
})