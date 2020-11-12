import { StatusBar } from 'expo-status-bar';
import { DeviceEventEmitter } from 'react-native';

import React from './node_modules/react';
import { StyleSheet, Text,Button, View, Dimensions } from './node_modules/react-native';
import {WebView} from "./node_modules/react-native-webview";


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

// <Button title={url} onClick={this.someEvent}  />
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {url: "http://50.83.113.1/osf%20project/kiosk%20program/src/login%20page/login.html", orientation: isPortrait() ? 'portrait' : 'landscape'}; 
    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      //window.alert('orientation changed');
      this.setState({
          url: this.state['url'] , orientation: isPortrait() ? 'portrait' : 'landscape'
      });
  }); 
  }

  /**
   * Renders elements natively.
   */
   render(){
      const { url } = this.state;
      const title = url;
      return(
        <React.Fragment>
          <WebView source={{uri: url}}
           onNavigationStateChange={this.handleWebViewNavigationStateChange} 
           style= {styles}/>
        </React.Fragment>
        );
      }
    /**
     * 
     * @param {*} newNavState 
     */
    handleWebViewNavigationStateChange = (newNavState) => {
      //window.alert(newNavState['title']);
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
