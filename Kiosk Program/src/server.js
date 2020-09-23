//var http = require('http');
//var fs = require('fs');
var server = new Server(new ServerInfo("172.16.0.6",'8080',null));
const PORT=8080; 


function createServerConncection(http,fs,server){
    return new ServerConnection(server).connect(http,fs);
}

function Server(serverInformation){
    let serverInfo = serverInformation;
    this.getServerInfo = () => serverInfo;
}

function ServerConnection(server){
    this.connect = (http,fs) => {
        /*
        fs.readFile("./Kiosk Program/src/main/index.html", function (err, html) {

            if (err) throw err;    
        
            http.createServer(function(request, response) {  
                response.writeHeader(200, {"Content-Type": "text/html"});  
                response.write(html);  
                response.end();  
            }).listen(PORT);
        });
        */
       console.log("Server connected to: " + server.getServerInfo().toString());
        return this;
    };
}
function ServerInfo(ip,port,permissions){
    this.getIp = () => ip;
    this.getPort = () => port;
    this.getPermissions = () => permissions;
    this.toString = () => {return '\nIP adress: ' + this.getIp() + '\nPort number: ' + this.getPort() + '\nPermissions: ' + this.getPermissions() }
}