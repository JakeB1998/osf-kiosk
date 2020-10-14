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
        }
    }
}


function Apps(apps = null, size = 0){
    this.appsArray = apps;
    this.size = size; // this is so i know when all async request are finished.
    this.getApp = (index) => {
        if (this.appsArray !== null){
            return this.appsArray[index];
        }
        return null;
    }

    this.addApp = (app = null) => {
        if (app !== null && this.appsArray !== null){
            console.log(this.appsArray);
            if (this.appsArray.length < this.size){
                this.appsArray.push(app);
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
    }

    this.isAllAppsLoaded = () => {
        if (this.appsArray !== null){
            return this.appsArray.length === this.size;
        }
        return false;
    }
}

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
           app.setMainFile(mainURL);
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
        req.getHttpRequest().overrideMimeType("application/json");
        server.applyCredentialsToRequest(req, defaulCred[0], defaulCred[1]);  
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

    this.getApp = () => app;
    this.getAppName = () => appName;
    this.getAppVersion = () => appVersion;
    this.getMainUrl = () => mainURL;
    this.getAppPictureUrl = () => appPictureURL;
    this.toString = () => {
        return 'App Name: ' + appName
                + '\nApp Version:' + appVersion
                + '\nMain URL: ' + mainURL
                + '\nPicture URL' + appPictureURL;
    }

    
}
