//var http = require('http');
//var fs = require('fs');
const SERVER_REQUEST_GET = 1648;
const SERVER_REQUEST_POST = 23849;
const SERVER_REQUEST_UPDATE = 33532;
const SERVER_REQUEST_DELETE = 43283;
const PORT=8080; 
const IP = '50.83.113.1';

var server = new Server(new ServerInfo(IP,PORT,null));

function createServerConncection(server, serverRequest){
    return new ServerConnection(server).connect(serverRequest);
}

function Server(serverInformation){
    let serverInfo = serverInformation;
    this.getServerInfo = () => serverInfo;
    this.createServerRequest = (requestCode, params) => new ServerRequest(requestCode, params);
    this.sendServerRequest = (serverRequest) => serverRequest.getHttpRequest().send(); 
}

function ServerRequest(requestCode, resource, async){
    let httpRequest = createHttpRequest(requestCode,resource,async);
    let requestCreated = false;
    let requestSent = false;
    this.requestResponseCallback = null;
    let createHttpRequest = (requestType, resource, async) =>{
        httpReq = new XMLHttpRequest();
        httpReq.open(requestType, resource, async);
        this.requestCreated = true;
        return httpReq;
    } 
    this.sendHttpRequest = () => {
        if (requestSent === false && requestCreated === true){
            request = this.getHttpRequest();
            if (this.requestResponseCallback != null){
                //add callback
            }
            request.send();
            requestSent = true;
            return true;
        }
        else{
            return false;
        }
    }
    this.getHttpRequest = () => { 
        return httpRequest;
    }
    this.getRequestCode = () => requestCode;
    this.isRequestCreated = () => requestCreated;
    this.isRequestSent = () => requestSent;
}
function ServerConnection(server){
    this.connect = (httpReq, async, callback) => {
       console.log("Server connected to: " + server.getServerInfo().toString());
       httpReq.open();
       //Add callbacks asyc
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
        switch(this.getRequest().getRequestCode()){
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