const fs = require('fs')

const http = require('http')
const port = 3000

const server = http.createServer((req, resp) => {
    fs.readFile('mensagem.html', function(err, data){
        resp.writeHead(200, {'Content-Type': 'text/html'})
        resp.write(data)
        return resp.end()
    })
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}.`)
})