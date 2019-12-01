import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput,Button} from 'react-native';
import {API,API_LIST} from '../utils/constants.js'

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
	getVisuals(){
		const {api,visuals} = this.state;
		const url = api+this.page;
		let results = [];
		this.setState({loading:true});
		fetch(url)
		.then(res => res.json())
		.then((res) => {
			if (this.page == 1) {
				results = res.results;
			} else {
				results = visuals.concat(res.results);
			}
			this.setState({
				visuals:results,
				loading:false
			})
		})
		.catch((err) => {
			console.error(err);
		})
	}
  render() {
    return (
      <View>
				<Text>douban box office</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  
});