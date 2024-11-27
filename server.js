// primeiro passo: importa as os recursos
import http from "http"
import fs from "fs"
import path from "path"

// Segundo passo: Define a porta que o servidor irá ouvir
const PORT = 3000

// Segundo passo: inicializa função que irá lidar com as requisições
function requestHandler(req, res) {
  // Computa o nome do arquivo solicitado baseado na url da requisção
  let filePath = "." + req.url
  if (filePath === "./") filePath = "./index.html"

  // Captura a extensão do arquivo solicitado
  const extname = String(path.extname(filePath)).toLocaleLowerCase()
  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  }

  // Define a o Content-Type que deve ser retornado para o cliente
  const contentType = mimeTypes[extname] || "application/octet-stream"

  // Executa método readFile, trata erros e retorna o arquivo para o cliente caso ele exista
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain" })
        res.end("404 - Arquivo não encontrado")
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" })
        res.end("500 - Erro interno no servidor")
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType })
      res.end(content, "utf-8")
    }
  })
}

// Terceiro passo: Criar o server http
const server = http.createServer(requestHandler)

// Quarto passo: Executar o server http
server.listen(PORT, () => {
  console.log(`O servidor está rodando em http://localhost:${PORT}`)
})
