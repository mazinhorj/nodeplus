const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question("Qual sua linguagem preferida? ", (lingpro) => {
    if (lingpro === "Python") {
        console.log(`Uau... Você é incrível!`)
    } else {
        console.log(`Você gosta de ${lingpro}?! Que doideira...`)
    }
    readline.close()
})