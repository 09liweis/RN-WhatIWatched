import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';

export default class Visuals extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visuals: []
		}
	}
	componentDidMount() {
		fetch('https://what-i-watched.herokuapp.com/api/visuals')
		.then(res => res.json())
		.then((res) => {
			console.log(res)
			this.setState({
				visuals: res.results
			})
		})
		.catch((err) => {
			console.error(err);
		})
	}
  render() {
    return (
      <View>
      	<Text>Visual List Page {this.state.visuals.length}</Text>
      	<FlatList
				  data={this.state.visuals}
				  keyExtractor={item => item.id.toString()}
				  renderItem={({item}) => <Text>{item.title}</Text>}
				/>
      </View>
    );
  }
}