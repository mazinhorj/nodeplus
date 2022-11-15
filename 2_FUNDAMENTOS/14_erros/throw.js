x = 10

// verificar se a variável é do tipo que se pede

if (!Number.isInteger(x)) {
    throw new Error('Não é um número inteiro.')
}

console.log('Moving...')