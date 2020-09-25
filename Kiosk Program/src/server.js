//var http = require('http');
//var fs = require('fs');
const SERVER_REQUEST_GET = 1648;
const SERVER_REQUEST_POST = 23849;
const SERVER_REQUEST_UPDATE = 33532;
const SERVER_REQUEST_DELETE = 43283;
const PORT=8080; 
const IP = '50.83.113.1';

var server = new Server(new ServerInfo(IP,PORT,null));

function createServerConncection(http,fs,server){
    return new ServerConnection(server).connect(http,fs);
}

function Server(serverInformation){
    let serverInfo = serverInformation;
    this.getServerInfo = () => serverInfo;
}

function ServerConnection(server){
    this.connect = (http) => {
       
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

function ServerTransaction(request){
    this.getRequest = () => request; //request code
    this.getRequestDescription = () => {
        switch(this.getRequest()){
            case SERVER_REQUEST_GET:
                return "GET";
            case SERVER_REQUEST_POST:
                return 'POST';
            case SERVER_REQUEST_UPDATE:
                return 'UPDATE';
            case SERVER_REQUEST_DELETE:
                return 'DELETE';
            default:
                return null;
        }
    }
}