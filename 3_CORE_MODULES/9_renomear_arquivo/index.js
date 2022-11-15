const fs = require('fs')


fs.rename('arquivo.txt', 'novoarquivo.txt', function(err){
    if(err){
        console.log(err)
        console.log('Arquivo não encontrado')
        return
    }

    console.log('Arquivo renomeado.')
})