const path = require('path')

console.log(path.resolve('teste.txt'))

// formar path

const midFolder = 'relatorios'
const fileName = 'mazinho.txt'

const finalPath = path.join('/', 'arquivos', midFolder, fileName)

console.log(finalPath)