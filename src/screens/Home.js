import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Visuals from '../views/Visuals';
import DoubanBoxOffice from '../views/DoubanBoxOffice'

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
    DoubanBoxOffice: {
        screen: DoubanBoxOffice,
        navigationOptions: {
            tabBarLabel: "Douban Box Office",
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