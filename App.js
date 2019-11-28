/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import Visuals from './src/views/Visuals';
import VisualDetail from './src/views/VisualDetail';
import VisualForm from './src/views/VisualForm';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <AppContainer />
  }
}

class Home extends Component<Props> {
  static navigationOptions = {
    title: 'What I Watched!',
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor:'#090f2b'
  };
  render() {
    return (
      <View style={styles.container}>
        <Visuals navigation={this.props.navigation} />
      </View>
    );
  }
}

const AppStackNavigator = createStackNavigator(
{
  Home: Home,
  VisualDetail: VisualDetail,
  VisualForm: VisualForm,
},
{
  initialRouteName: 'Home'
},
{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'orange'
    }
  }
}
);
const AppContainer = createAppContainer(AppStackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
});
