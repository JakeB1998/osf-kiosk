//var http = require('http');
//var fs = require('fs');
const SERVER_REQUEST_GET = "GET";
const SERVER_REQUEST_POST = "POST";
const SERVER_REQUEST_UPDATE = "UPDATE";
const SERVER_REQUEST_DELETE = "DELETE";
const PORT=8080;  //delete later
const IP = '50.83.113.1'; // delete later

/**
 * Base server variable
 */
var server = new Server(new ServerInfo(IP,PORT,null));

function createServerConncection(server, serverRequest){
    return new ServerConnection(server).connect(serverRequest);
}

/**
 * Construcotr for Server Object.
 * @param {*} serverInformation 
 */
function Server(serverInformation){
    let serverInfo = serverInformation;
    this.getServerInfo = () => serverInfo;
    this.createServerRequest = (requestCode = null, resource = null, async = null, callback = null, callbackParams = null, responseType = null)  => new ServerRequest(requestCode, resource,async,callback,callbackParams,responseType);
    this.applyCredentialsToRequest = (request = null, email = null, password = null) => {
        if (request !== null && email !== null && password !== null){
            request.setRequestHeader("Authorization", "Basic " + btoa(email + ":" + password));
            request.withCredentials = true;
        }
        return request;
    }
    this.sendServerRequest = (serverRequest) => serverRequest.getHttpRequest().send(); 
}

/**
 * Constructor for ServerRequest Object.
 * @param {*} requestCode 
 * @param {*} resource 
 * @param {*} async 
 * @param {*} completeCallback 
 */
function ServerRequest(requestCode = null, resource = null, async = null,completeCallback = null, callbackParams = null, responseType){ //the = is a default value assigned if argument is not passed
    let httpRequest = null;
    let requestCreated = false;
    let requestSent = false;
    this.requestResponseCallback = completeCallback;
    let createHttpRequest = (requestType, resource, async) =>{
        httpReq = new XMLHttpRequest();
        if (responseType != null && async === true){
            httpReq.responseType = responseType;
        }
        httpReq.open(requestType, resource, async);
        httpReq.onreadystatechange = this.requestResponseCallback;
        this.requestCreated = true;
        return httpReq;
    } 
    httpRequest = createHttpRequest(requestCode,resource,async);
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