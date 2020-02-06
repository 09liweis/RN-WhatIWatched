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

// class Home extends Component<Props> {
//   static navigationOptions = {
//     title: 'What I Watched!',
//     headerStyle: {
//       backgroundColor: '#fff',
//     },
//     headerTintColor:'#090f2b'
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <Visuals navigation={this.props.navigation} />
//       </View>
//     );
//   }
// }
const AppContainer = createAppContainer(Home);
// export default createDrawerNavigator({
//   Home: {
//     screen: Home,
//     navigationOptions: {
//       drawerLabel: 'Home',
//       drawerIcon: ({ tintColor }) => <Icon name="cog" size={17} />,
//     }
//   },
//   Visuals: {
//     screen: Visuals,
//     navigationOptions: {
//       drawerLabel: 'Visuals',
//       drawerIcon: ({ tintColor }) => <Icon name="user-circle" size={17} />,
//     }
//   }
// });