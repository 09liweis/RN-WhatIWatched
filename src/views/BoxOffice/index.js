import React, {Component} from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Douban from './Douban';
import Maoyan from './Maoyan';

const BoxOffice = createBottomTabNavigator({
  Douban: {
		screen: Douban,
		navigationOptions: {
			title: "豆瓣",
			tabBarIcon: ({ tintColor }) => (
				<Icon
					name="film"
					size={17}
					color={tintColor} />
			)
		}
  },
	Maoyan: {
		screen: Maoyan,
		navigationOptions: {
			tabBarLabel: "猫眼",
			tabBarIcon: ({ tintColor }) => (
				<Icon
					name="memory"
					size={17}
					color={tintColor} />
			)
		}
	}
},{
	tabBarPosition:'top'
});

export default createStackNavigator({ BoxOffice }, { headerMode: "none" });