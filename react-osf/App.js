import { StatusBar } from 'expo-status-bar';
import React from './node_modules/react';
import { StyleSheet, Text, View} from './node_modules/react-native';
import {WebView} from "./node_modules/react-native-webview";

export default function App() {
  return (
    
    <WebView
        source={{
          uri: "http://50.83.113.1/osf%20project/kiosk%20program/src/login%20page/login.html"
        }}
        style={{ marginTop: 20 }}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
