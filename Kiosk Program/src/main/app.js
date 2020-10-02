

/**
 * Called when the window is fully loaded
 */
window.addEventListener('load', (event) =>
{
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



