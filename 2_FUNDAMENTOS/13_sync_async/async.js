const fs = require('fs')

console.log('Início')

fs.writeFile('aequivo2.txt', 'tchau', function(err){
    setTimeout(function(){
        console.log('Arquivo criado com sucesso!')
    }, 1500)
})

console.log('Fim')