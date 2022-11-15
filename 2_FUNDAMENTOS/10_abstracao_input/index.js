const inquirer = require('inquirer')

inquirer.prompt([
    {
        name: 'n1',
        message: 'Qual a primeira nota? ',
    },
    {
        name: 'n2',
        message: 'Qual a segunda nota? ',
    },
])
.then((answers) => {
    console.log(answers)
    media = (parseInt(answers.n1) + parseInt(answers.n2))/2
    console.log(`Sua média é: ${media}.`)
    }).catch((err) => console.log(err))