/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet,NativeModules} from 'react-native';
import {createAppContainer} from 'react-navigation';
import Home from './src/screens/Home';  //Tab Nav

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <AppContainer />
  }
}

const SharedStorage = NativeModules.SharedStorage;
let count = 1;
SharedStorage.set(
  JSON.stringify({text: 'This is data from the React Native app'})
);
setInterval(()=>{
  SharedStorage.set(
    JSON.stringify({text: 'What I watched ' + count})
  );
  count+=1;
},1000);

const AppContainer = createAppContainer(Home);