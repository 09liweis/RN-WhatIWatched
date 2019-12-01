import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Visuals from '../views/Visuals';
import BoxOffice from '../views/BoxOffice'

const Home = createBottomTabNavigator({
  Visuals: {
		screen: Visuals,
		navigationOptions: {
			title: "Visuals",
			tabBarIcon: ({ tintColor }) => (
				<Icon
					name="microchip"
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