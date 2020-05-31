import React, {Component} from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Dashboard from '../views/Dashboard';
import Visuals from '../views/Visuals';
import BoxOffice from '../views/BoxOffice';

const Home = createBottomTabNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      tabBarLabel: "Home"
    }
  },
  Visuals: {
    screen: Visuals,
    navigationOptions: {
      tabBarLabel: "Visuals"
    }
  },
  BoxOffice: {
    screen: BoxOffice,
    navigationOptions: {
      tabBarLabel: "Box Office"
    }
  }
});

//Issue: the tab navigator needs to be wrapped inside a stack navigator
export default createStackNavigator({ Home }, { headerMode: "none" });