const fs = require('fs')
const url = require('url')
const http = require('http')
const port = 3000

const server = http.createServer((req, resp) => {
    const urlInfo = require("url").parse(req.url, true)
    const name = urlInfo.query.name

    if (!name) {
        fs.readFile('index.html', function(err, data){
            resp.writeHead(200, {'Content-Type': 'text/html'})
            resp.write(data)
            return resp.end()
        })

    } else {
        fs.writeFile("arquvo.txt", name, function(err, data) {
            resp.writeHead(302, {
                Location: "/"
            })
            return resp.end()
        })
    }

    
    
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}.`)
})