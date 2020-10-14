<<<<<<< HEAD
var dir_base = () => "/osf project/kiosk program/src/main page/plugins/plugin-dir/directory-info.json";
var infoFileBase = () => "info.json";
var pluginApps = null;
var pluginAppsOnLoad = null;
const defaulCred = ['admin', 'admin'];


function loadApps(){
    let req = server.createServerRequest("GET", dir_base(),true, directoryInfoCallback, null, 'text');
    req.getHttpRequest().overrideMimeType("application/json"); 
    server.applyCredentialsToRequest(req, defaulCred[0], defaulCred[1]);
    server.sendServerRequest(req);

    
}

function directoryInfoCallback(){
    if (this.readyState == 4){
        let json =  JSON.parse(this.responseText);
        let urls = json.urls;
        let size = json.size;
        let apps = new Apps(new Array(0), size);
        for (i = 0; i < size; i++){
            createButton();
        }
        for (i = 0; i < urls.length; i++){
            apps.addApp(new App(null,urls[i]));
=======
var dir_base = () => "./plugins/plugin-dir/";
var infoFileBase = () => "info.json";
var pluginApps = null;
var pluginAppsOnLoad = null;

function loadApps(){
    let req = server.createServerRequest("GET", dir_base(),true,generalFileCallback, null, 'document');
    server.sendServerRequest(req);
}

function generalFileCallback(){
    if (this.readyState == 4 && this.status == 200) {
        let doc = this.response;
        let apps = getFilesInDirectoryHtml(doc);
        apps.shift();
        console.log(apps);
        pluginApps = new Apps(new Array(0), apps.length);
        loadDirectoryData(apps);
       }
    else{
        console.log(this.status);
    }

}

/**
 * Callback for retriving files from app directorty
 * @param {*} index 
 */
function appFileRetrievedCallback(){
    if (this.readyState === 4 && this.status === 200) {
        let doc = this.response;
        if (pluginApps != null){
            pluginApps.addApp(new App(doc, doc.URL + infoFileBase()));
        }
        console.log(doc);
    }
    else{
        console.log(this.status);
    }
}

function loadDirectoryData(array = null){
    handleMultipleRequests("GET", array, "document", appFileRetrievedCallback, array);
}

function handleMultipleRequests(requestType = null,files = null, responseType = null, callback = null, callbackParams = null){
    let array = files
    console.log("Started ");
    if (array != null){
        for (i = 0; i < array.length; i++){
            console.log('contents' + array[i]);
            let req = server.createServerRequest(requestType,array[i], true, callback, callbackParams, responseType);
            req.getHttpRequest().setRequestHeader("Access-Control-Allow-Origin", "*");
            req.getHttpRequest().setRequestHeader("Cache-Control", "no-cache");

            server.sendServerRequest(req);
>>>>>>> 837c8ee7575852c4adefb560661555701903b280
        }
    }
}

<<<<<<< HEAD
=======
function getFilesInDirectoryHtml(htmlDocumenet = null){
    let doc = htmlDocumenet;
    let apps = null;
    if (doc != null){
        console.log(doc);
        let files = doc.getElementById("wrapper");
        if(files != null){
            files = files.getElementsByTagName("ul")[0].getElementsByTagName("li");
            apps = new Array(files.length - 1);
            for (i = 0; i < files.length; i++){
                let localDir = files[i].getElementsByTagName("a");
                let href = localDir[0];
                console.log('file name: ' + href);
                apps[i] = href.href;
            }
        }
    }
    return apps;   
}

function getDirectoriesFromPaths(paths = null){
    if (paths!= null){
        
    }
    return paths;
}

>>>>>>> 837c8ee7575852c4adefb560661555701903b280

function Apps(apps = null, size = 0){
    this.appsArray = apps;
    this.size = size; // this is so i know when all async request are finished.
    this.getApp = (index) => {
<<<<<<< HEAD
        if (this.appsArray !== null){
=======
        if (this.appsArray != null){
>>>>>>> 837c8ee7575852c4adefb560661555701903b280
            return this.appsArray[index];
        }
        return null;
    }

    this.addApp = (app = null) => {
        if (app !== null && this.appsArray !== null){
            console.log(this.appsArray);
            if (this.appsArray.length < this.size){
                this.appsArray.push(app);
<<<<<<< HEAD
                app.appIndex = this.appsArray.length - 1;
                if (this.isAllAppsLoaded()){
                    if (pluginAppsOnLoad !== null){
                        //pluginAppsOnLoad(apps);
                        
                    }
                }
            }
            return app;
        }

        return null;
=======
                if (this.isAllAppsLoaded()){
                    console.log(pluginAppsOnLoad);
                    if (pluginAppsOnLoad !== null){
                        
                        pluginAppsOnLoad(apps);
                    }
                }
            }
        }
>>>>>>> 837c8ee7575852c4adefb560661555701903b280
    }

    this.isAllAppsLoaded = () => {
        if (this.appsArray !== null){
            return this.appsArray.length === this.size;
        }
        return false;
    }
}

<<<<<<< HEAD
function App(mainFile = null, infoFile = null, appindx = null){
    this.appIndex = appindx;
    this.infoFile = infoFile;
    this.appInfo = new AppInfo(this, infoFile).extractAppInfoFromFile();
    this.mainFile = this.appInfo != null ? this.appInfo.getMainUrl() : null;
    this.setMainFile = (file) => this.mainFile = file;
    this.getAppNumber = () => parseInt(this.appIndex) + 1;
    this.toString = () => 'Main entry file: ' + mainFile + '\nInfo ' + this.appInfo + '\nApp Number: ' + this.getAppNumber();
}

function AppInfo(app = null, infoResFile = null){
=======
function App(mainFile = null, infoFile = null){
    this.mainFile = mainFile;
    this.infoFile = infoFile;
    this.appInfo = new AppInfo(infoFile).extractAppInfoFromFile();
    this.toString = () => 'Main entry file: ' + mainFile + '\nInfo ' + this.appInfo
}

function AppInfo(infoResFile = null){
>>>>>>> 837c8ee7575852c4adefb560661555701903b280
    let infoFile = infoResFile;
    let appName = null;
    let appVersion = null;
    let mainURL = null;
    let appPictureURL = null;
    
    let callback = () => pluginAppInfoLoaded(this);
    let organizeAppInfo = function() {
        
        if (this.readyState === 4 && this.status === 200) {
           let json = JSON.parse(this.responseText);
           appName = json.Name;
            appVersion = json.Version;
            mainURL = json.MainURL;
           appPictureURL = json.PictureURL;
<<<<<<< HEAD
           app.setMainFile(mainURL);
=======
>>>>>>> 837c8ee7575852c4adefb560661555701903b280
           callback();
        }
        else{
            console.log(this.status);
        }
    }
    this.extractAppInfoFromFile = () => {
        //add 
        console.log('Attemting to extract info from app file : ' + infoFile);
        req = server.createServerRequest("GET", infoFile, true, organizeAppInfo, null, "text");
<<<<<<< HEAD
        req.getHttpRequest().overrideMimeType("application/json");
        server.applyCredentialsToRequest(req, defaulCred[0], defaulCred[1]);  
=======
        req.getHttpRequest().overrideMimeType("application/json");  
>>>>>>> 837c8ee7575852c4adefb560661555701903b280
        server.sendServerRequest(req);
        return this;
    }

    this.setInfo = (appName1, appVersion1, mainURL1, appPictureURL1) => {
        appName = appName1;
        appVersion = appVersion1;
        mainURL = mainURL1;
        appPictureURL = appPictureURL1;
        callback();
    }
<<<<<<< HEAD

    this.getApp = () => app;
    this.getAppName = () => appName;
    this.getAppVersion = () => appVersion;
    this.getMainUrl = () => mainURL;
    this.getAppPictureUrl = () => appPictureURL;
=======
>>>>>>> 837c8ee7575852c4adefb560661555701903b280
    this.toString = () => {
        return 'App Name: ' + appName
                + '\nApp Version:' + appVersion
                + '\nMain URL: ' + mainURL
                + '\nPicture URL' + appPictureURL;
    }

    
}
