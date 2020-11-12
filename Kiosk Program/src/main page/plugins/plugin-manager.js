
var dir_base = () => "/osf project/kiosk program/src/main page/plugins/plugin-dir/directory-info.json";
var infoFileBase = () => "info.json";
var pluginApps = null;
var pluginAppsOnLoad = null;
var apps = null;
const defaulCred = ['admin', 'admin'];
const JSONKeys = {
    "additionalParams": "AdditionalParams",
    "priority" : "Priority",
    "size": "Size",
    "catagoryTypes" : "CatagoryTypes",
    "catagoryTypeKeys" : "CatagoryTypeKeys"
};


function loadApps(){
    let req = server.createServerRequest("GET", dir_base(),true, directoryInfoCallback, null, 'text');
    server.applyJsonOverride(req);
    server.applyCredentialsToRequest(req.getHttpRequest(), defaulCred[0], defaulCred[1]);
    server.sendServerRequest(req);

    
}

function directoryInfoCallback(){
    if (this.readyState == 4){
        let json =  JSON.parse(this.responseText);
        let urls = json.urls;
        let size = json.size;
        createButtons(allApplicationButtons,size);
        apps = new Apps(new Array(0), size);
        for (i = 0; i < urls.length; i++){
            apps.addApp(new App(null,urls[i]));

        }
    }
}

function isAllAppsLoaded(){
    return apps !== null ? apps.isAllAppsLoaded() : false;
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
                    if (buttonsLoaded === false){
                        loadButtonsToTabs(this.appsArray)
                    }
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
            let flag = false;
            if (this.appsArray.length === this.size){
                let flag2 = false;
                //console.log(this.appsArray);
                for (let i = 0; i < this.appsArray.length; i++){
                    //console.log(this.appsArray[i].getAppInfo().isAppInfoLoaded())
                    if (this.appsArray[i].getAppInfo().isAppInfoLoaded() === false){
                        flag2 = true;
                        break;
                    }
                }
                flag = flag2 === false;
            }
            return flag === true ;
        }
        return false;
    }
}

function App(mainFile = null, infoFile = null, appindx = null){
    this.appIndex = appindx;
    this.infoFile = infoFile;
    this.appButton = null;
    this.appInfo = new AppInfo(this, infoFile).extractAppInfoFromFile();
    this.mainFile = this.appInfo != null ? this.appInfo.getMainUrl() : null;
    this.setMainFile = (file) => this.mainFile = file;
    this.getAppNumber = () => parseInt(this.appIndex) + 1;
    this.getAppInfo = () => this.appInfo;
    this.toString = () => 'Main entry file: ' + mainFile + '\nInfo ' + this.appInfo + '\nApp Number: ' + this.getAppNumber();
}

function AppInfo(app = null, infoResFile = null){
    let infoFile = infoResFile;
    let appName = null;
    let appVersion = null;
    let mainURL = null;
    let appPictureURL = null;
    let catagoryTypesArray = null;
    let appInfoLoaded = false;
    
    let callback = () => {
        let button = pluginAppInfoLoaded(this);
        console.log(button);
        app.appButton = button;
        console.log(app);
        appInfoLoaded = true;
        console.log("App loaded: " + appName);
        if (buttonsLoaded === false && isAllAppsLoaded() === true){
            loadButtonsToTabs(apps.appsArray);
        }

    }

    let organizeAppInfo = function() {
        if (this.readyState === 4 && this.status === 200) {
           let json = JSON.parse(this.responseText);
           appName = json.Name;
            appVersion = json.Version;
            mainURL = json.MainURL;
           appPictureURL = json.PictureURL;
           app.setMainFile(mainURL);
           if (json.hasOwnProperty(JSONKeys.additionalParams)){
               let additional = json[JSONKeys.additionalParams];
               let catagoryTypes = additional != null && additional.hasOwnProperty(JSONKeys.catagoryTypes) === true ? additional[JSONKeys.catagoryTypes] : null;
               let size = catagoryTypes != null && catagoryTypes.hasOwnProperty(JSONKeys.size) === true? catagoryTypes[JSONKeys.size] : -1;
               if (size >= 0){
                   catagoryTypesArray = catagoryTypes != null && catagoryTypes.hasOwnProperty(JSONKeys.catagoryTypeKeys) === true? catagoryTypes[JSONKeys.catagoryTypeKeys] : null
                   if (catagoryTypesArray != null){
                        for (let i =0; i < catagoryTypesArray.length; i++){
                            let type = catagoryTypesArray[i];
                            catagoryTypesArray[i] = catagoryTypes[type];
                            let priority = catagoryTypesArray[i].hasOwnProperty(JSONKeys.priority) === true ? catagoryTypesArray[i]["Priority"] : null;
                            catagoryTypesArray[i] = new CatagoryType(this,type,priority);
                        }
                        console.log(catagoryTypesArray);
                    }else{
                        console.log(catagoryTypes);
                    }
               }
               else{
                   console.log("Size: " + size + "\n Params not read");
               }
           }
           else{
               console.log("JSOn does not have adittional params");
           }
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
        server.applyCredentialsToRequest(req.getHttpRequest(), defaulCred[0], defaulCred[1]);  
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

    this.isAppInfoLoaded = () => appInfoLoaded;
    this.getApp = () => app;
    this.getAppName = () => appName;
    this.getAppVersion = () => appVersion;
    this.getMainUrl = () => mainURL;
    this.getAppPictureUrl = () => appPictureURL;
    this.getAppCatagoryTypes = () => catagoryTypesArray;
    this.toString = () => {
        return 'App Name: ' + appName
                + '\nApp Version:' + appVersion
                + '\nMain URL: ' + mainURL
                + '\nPicture URL' + appPictureURL;
    }

    function CatagoryType(appInfo = null, catagoryType = null, priority = null){
        this.catagoryType = catagoryType;
        this.priority = priority;
        this.getAppInfo = () => appInfo;
        this.getPriority = () => this.priority;
        
    }
    function OptionalParam(priority = null, paramKey = null, param = null){
        
        this.getPriority = () => priority;
        this.getParamKey = () => paramKey;
        this.getParam = () => param;

    }
    
}
