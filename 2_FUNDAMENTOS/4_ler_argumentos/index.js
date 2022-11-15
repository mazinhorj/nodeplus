//função pega argumentos passados e coloca num array

// console.log(process.argv)

args = process.argv.slice(2)
console.log(args)

nome = args[0].split('=')[1]
console.log(nome)

idade = args[1].split('=')[1]
console.log(idade)

console.log(`Meu nome é ${nome} e eu tenho ${idade} anos.`)