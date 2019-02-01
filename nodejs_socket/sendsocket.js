var WebSocketClient = require('websocket').client;


var client = new WebSocketClient();

var buffer =  new Buffer(2000);//["Saab", "Volvo", "BMW"];//new ArrayBuffer(15000);
var sendCount=0;

console.log('length '+ buffer.length)

//buffer.writeInt8(100);
for(var chunk=0; chunk<buffer.length; chunk++){
    buffer[chunk] = 101;///Math.round(Math.random() * 0xFFFFFF);
    console.log(buffer[chunk]);
}

//console.log('buffer ==> ', buffer);
// var viewBuffer = new DataView(buffer);
// console.log('buffer view : '+viewBuffer.getInt32(0).toString(16))
 
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
 
client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
    
    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            setTimeout(sendNumber, 0.1);
            sendCount++;
            console.log('Total Sent : '+sendCount);
        }
    }
    //sendNumber();

    function sendMessage(){
        if(connection.connected){
            connection.sendUTF(buffer);
            setTimeout(sendMessage,100);
            sendCount+=1;
            console.log('sendcount : '+sendCount);
        }
    }

    sendMessage();
});
 
client.connect('ws://localhost:8000/', 'echo-protocol');