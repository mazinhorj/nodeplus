const fs = require('fs')

if(!fs.existsSync('./minhapasta')) {
    console.log('Pasta inexistente')
    fs.mkdirSync('minhapasta')
} else if (
    fs.existsSync('./minhapasta')
    ) {
    console.log('Pasta existente')
}