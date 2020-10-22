import { StatusBar } from 'expo-status-bar';
import React from './node_modules/react';
import { StyleSheet, Text,Button, View} from './node_modules/react-native';
import {WebView} from "./node_modules/react-native-webview";


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {url: "http://50.83.113.1/osf%20project/kiosk%20program/src/login%20page/login.html"};  
  }
   render(){
      const { url } = this.state;
      const title = url;
      return(
        <React.Fragment>
          <WebView source={{uri: url}} />
          <Button title={url} onClick={this.someEvent}  />
        </React.Fragment>
        );
      }
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
