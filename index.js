const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');


const server = http.createServer();
server.listen(webSocketsServerPort);

console.log('PORT',webSocketsServerPort)

const wsServer = new webSocketServer({
  httpServer: server
});


const clients = {};

// Tạo ID người dùng
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};


wsServer.on('request', function(request) {
    let userID = getUniqueID();


    // console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

    // You can rewrite this part of the code to accept only the requests from allowed origin
    // console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))
    const connection = request.accept(null, request.origin);
    
    
    connection.on('message', function(message) {
        
        
        
        
        console.log('Dl XUống ',typeof message)
        console.log('Dl XUống ',typeof message.utf8Data)
        
        console.log('Dl XUống ',JSON.parse(message.utf8Data))
        let dataClient = JSON.parse(message.utf8Data)
        userID = dataClient.user
        
        clients[userID] = connection;



        
        // console.log('Check message',message)

        if(message.type === 'utf8'){
            // Lấy ra ID từ clients
            for(key in clients){
            
                    clients[key].sendUTF(message.utf8Data)
              
            }
        }
      
        // // let a = '{"type":"message","msg":"dddd","user":"Nguyen"}'

        // if(message.type === 'utf8')
        // // console.log('Received massage', message.utf8Data)

        // for(key in clients){
        //     clients[key].sendUTF(message.utf8Data)
        //     // console.log('Send message to', clients[key] + 'lll')

        //     // console.log('key laf gi ',key)

        // }
    });

});
