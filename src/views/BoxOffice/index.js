import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput,Button} from 'react-native';
import Douban from './Douban';

export default class BoxOffice extends Component {
	constructor(props) {
		super(props);
		this.page = 1;
		this.state = {
			visuals: [],
		}
	}
	componentDidMount() {
	}
	
  render() {
    return (
      <View>
				<Text>box office</Text>
				<Douban/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  
});