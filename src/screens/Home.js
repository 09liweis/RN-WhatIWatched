import React, {Component} from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Dashboard from '../views/Dashboard';
import Visuals from '../views/Visuals';
import BoxOffice from '../views/BoxOffice/index';

const navigationOptions = (title, iconName) => {
  return {
    navigation: title,
    tabBarIcon: ({tintColor}) => {
      <Icon name={iconName} size={17} color={tintColor} />
    }
  }
}

const Home = createBottomTabNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => {
        <Icon
          name="home"
          size={17}
          color={tintColor} />
      }
    }
  },
  Visuals: {
    screen: Visuals,
    navigationOptions: {
      tabBarLabel: "Visuals",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="film"
          size={17}
          color={tintColor} />
      )
    }
  },
  BoxOffice: {
    screen: BoxOffice,
    navigationOptions: {
      tabBarLabel: "Box Office",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="memory"
          size={17}
          color={tintColor} />
      )
    }
  }
});

//Issue: the tab navigator needs to be wrapped inside a stack navigator
export default createStackNavigator({ Home }, { headerMode: "none" });