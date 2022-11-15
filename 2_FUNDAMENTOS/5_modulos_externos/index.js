const minimist = require('minimist')

const args = minimist(process.argv.slice(2))

console.log(args)

nome = args['nome']

idade = args['idade']

profissao = args['profissao']

console.log(nome, idade, profissao)

console.log(`Olá, usuário! Eu sou ${nome}. Tenho ${idade} anos e sou ${profissao}.`)