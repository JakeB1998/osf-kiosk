

/**
 * Called when the window is fully loaded
 */
window.addEventListener('load', (event) =>
{
    let params = getURLParams();
    logParamaters(params);
    let loginInfo = retrieveLogInInformation(params);
    console.log('login info: ' + loginInfo);

    initButtons();
    pluginAppsOnLoad = pluginAppsLoadedCallback;
    loadApps();
    require(['crypto-js'], function (CryptoJS) {
    console.log("window fully loaded");
    console.log(CryptoJS);
    defaultCipherSettings = {
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.AnsiX923
    }
    var q = new Cryptography(CryptoJS);
    q.test("I like apples", "dhfubfskjdbkbk");
    
    let secureData = new SecureData(CryptoJS, 'jmbotka', "adom");
    console.log('decrypted data: ' + secureData.getData().toString()
                + '\nHashed data: ' + secureData.getHashDigest());
    return CryptoJS;
    });
});

function getURLParams(){
    return hasParameters(document.URL) === true ? parseParameters(document.URL) : null;
}

/**
 * Retrieves login information
 * @param {} params 
 */
function retrieveLogInInformation(params = null){
    let username = null;
    let password = null;
    if (params !== null){
        username = params.find((element) => element['key'] === 'username');
        password = params.find((element) => element['key'] === 'password');
        if (username !== undefined && password !== undefined){
            username = username['value'];
            password = password['value'];
            return {username,password};
        }
        console.log(username + ',' + password);
    }

    return null;
}
/**
 * Test callback for http request completed state change
 */
  function callback(){
    if (this.readyState == 4 && this.status == 200) {
        //console.log(this.responseText);
       }
  }

  /**
   * Checks if client is logged into account.
   */
  function checkIfLoggedIn(){
      // do a post with current logg in
  }

  /**
   * Callback
   * @param {*} apps Apps object
   */
  function pluginAppsLoadedCallback(apps) {
    console.log('Apps loaded and ready: ' + apps);
  }

  /**
   * Callback
   * @param {*} appInfo AppInfo object
   */
  function pluginAppInfoLoaded(appInfo = null){
      console.log(appInfo.toString());
  }



