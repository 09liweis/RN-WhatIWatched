import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';

export default class VisualForm extends Component {
	static navigationOptions = {
    title: 'Welcome',
  };
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	componentDidMount() {
		
	}
  render() {
    return (
      <View>
      	<Text>Visual Form</Text>
      </View>
    );
  }
}