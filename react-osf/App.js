
import { useState,useRef } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { ScreenStackHeaderCenterView } from 'react-native-screens';
//import BrowserHistory from './node_modules/react-router/lib/BrowserHistory';
//import { Router, Route, Link ,withRouter, useHistory} from './node_modules/react-router';
import history from './node_modules/history';
import React from './node_modules/react';
import { StyleSheet, 
  Text,
  Button, 
  View, 
  Dimensions, 
  TouchableOpacity,
   Image, 
   SafeAreaView,
  StatusBar,
  ActivityIndicator } from './node_modules/react-native';
import {WebView} from "./node_modules/react-native-webview";
//const browserHistory = BrowserHistory.default;
const homeURL = "http://50.83.113.1/osf%20project/kiosk%20program/src/login%20page/login.html";
const listOfURLS = [homeURL];

/**
 * Returns true if the screen is in portrait mode
 */
const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

const nativeEventOnStartListener = DeviceEventEmitter.addListener('onStart',
  (e)=>{
    console.log("NATIVE_EVENT : " + e);
    dispatch({type: "NATIVE_EVENT"})
})
const nativeEventOnStopListener = DeviceEventEmitter.addListener('onStop',
  (e)=>{
    console.log("NATIVE_EVENT : " + e);
    dispatch({type: "NATIVE_EVENT"})
})
/**
* Returns true of the screen is in landscape mode
*/
const isLandscape = () => {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
};
const tabBarButtonStyle = {

}
// <Button title={url} onClick={this.someEvent}  />
export default class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {url: homeURL, orientation: isPortrait() ? 'portrait' : 'landscape'}; 
    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      //window.alert('orientation changed');
      this.setState({
          url: this.state['url'] , orientation: isPortrait() ? 'portrait' : 'landscape'
      });
  }); 
  }

  goBack(){
    console.log("Going back");
    const {canGoBack} = this.webView.state;
    console.log(canGoBack);
    /*
    if (canGoBack){
    this.webView.goBack();
    }
    */
    this.webView.goBack();
    
  }

  goForward(){
    console.log("Going forward");
    this.webView.goForward();
  }

  goHome(){
    console.log("Going homr");
    if(this.state['url'] !== homeURL){
    const redirectTo = 'window.location = "' + homeURL + '"';
    this.webView.injectJavaScript(redirectTo);
    this.forceUpdateState(this,this.state, 'url', homeURL );
    }
    
  }

  componentDidMount() {
    //window.addEventListener("resize", this.handleResize);
   }
  
   componentWillUnMount() {
    //window.addEventListener("resize", this.handleResize);
   } 

   handleResize(e){
    console.log(e);
   }
  /**
   * Renders elements natively.
   */
   render(){
      const { url } = this.state;
      const title = url;
      this.webView = null;
      
      return(
          <React.Fragment>
            
            <View style={{ backgroundColor: '#9FA8DA' }}>
              <View style={ {width:1000,flexDirection:"row"}}>
                <TouchableOpacity  activeOpacity={0.5} onPress = {() => {console.log("Click"); this.goBack()}}>
                  <Image
                  source={require('./images/back-btn1.png')}
                  style={{height:50, width:50}}
                  />
                </TouchableOpacity>
                <TouchableOpacity  activeOpacity={0.5}  onPress = {() => this.goForward()}>
                    <Image
                    source={require('./images/back-btn1.png')}
                    style={{height:50, width:50,  transform: [{ rotate: '180deg' }]}}
                    />
                </TouchableOpacity>
                <TouchableOpacity  activeOpacity={0.5}   onPress = {() => this.goHome()}>
                    <Image
                    source={require('./images/home-btn.png')}
                    style={{height:35, width:35, top:7 , left:5}}
                    />
                </TouchableOpacity>
              </View>
              <View style= {{ position: 'relative', backgroundColor: 'red'}}>
                <Text style = {styles.title}>OSF Kisok</Text>
              </View>
          </View>
            <WebView ref = {(ref) => {
              this.webView = ref;
              
              }} 
            cacheEnabled={false}
            source={{uri: url}}
            onNavigationStateChange={ (e) => this.handleWebViewNavigationStateChange(e)} 
            onMessage={(event) => {
              console.log("Message Recived");
              console.log(event);
            }}
            style= {styles}
            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator
                color='black'
                size='large'
                style={styles.flexContainer}
              />
            )}/>
        </React.Fragment>
        );
      }
    /**
     * 
     * @param {*} newNavState 
     */
    handleWebViewNavigationStateChange = (newNavState) => {
      //window.alert(newNavState['title']);
      const {url} = newNavState;
      this.state['url'] = url;
      console.log(newNavState);
      
      
      
    }

    forceUpdateState(caller,state,key,value){
      state[key] = value;
      caller.setState(state);
    }
    /**
     * 
     */
    someEvent(){
      console.log("URL: "  + this.state["url"])
      this.state = {url: "www.google.com"};
      
    }
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    
  },
  title:{
    flex:1,
    width:100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  
});
