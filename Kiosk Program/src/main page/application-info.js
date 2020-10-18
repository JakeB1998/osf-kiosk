const appInfoFilePath = "/osf project/kiosk program/src/main page/res/app-info.json";
const version = getVersion();
const validated = isValidated();

/**
 * 
 */
function getVersion(){
    /*
    let req = server.createServerRequest("GET", appInfoFilePath,true, function(){
        if (this.readyState === 4 && this.status === 200){
            let jsonObj = JSON.parse(this.responseText);
            version = jsonObj.version
        }

    }, null, 'text');
    server.applyJsonOverride(req);
    server.applyCredentialsToRequest(req.getHttpRequest(), defaulCred[0], defaulCred[1]);
    server.sendServerRequest(req);
    */
   return null;

}


/**
 * 
 */
function isValidated(){
    return false;
}