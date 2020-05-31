import React, {Component} from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Douban from './Douban';
import Maoyan from './Maoyan';

const BoxOffice = createBottomTabNavigator({
  Douban: {
    screen: Douban,
    navigationOptions: {
      title: "豆瓣"
    }
  },
  Maoyan: {
    screen: Maoyan,
    navigationOptions: {
      tabBarLabel: "猫眼"
    }
  }
},{
  tabBarPosition:'top'
});

export default createStackNavigator({ BoxOffice }, { headerMode: "none" });