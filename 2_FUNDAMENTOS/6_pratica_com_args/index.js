const minimist = require('minimist')

const soma = require('./soma').soma

const args = minimist(process.argv.slice(2))

n1 = parseInt(args['a'])
n2 = parseInt(args['b'])

soma(n1, n2)