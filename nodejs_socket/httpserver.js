const http = require('http');


const server = http.createServer((req,resp) =>{
    console.log('req received')
    resp.writeHead(200,{'Content-Type': 'text/html'})
    resp.write("Hello World!")
  
}).listen(8080);



console.log('Server Running on 8080')