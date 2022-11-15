const chalk = require('chalk')

const nota = 7

if (nota >= 7) {
    console.log(chalk.green(`Parabéns, viado! com ${nota} tá aprovado.`))
} else {
    console.log(chalk.bgRed.bold.black(`Caralho! Só ${nota}? Seu burro.`))
}

setTimeout(() => {
    console.clear()
}, 2000);

