import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput,Button} from 'react-native';
import {API_DOUBAN_USBO} from '../../utils/constants.js'

export default class Douban extends Component {
	constructor(props) {
		super(props);
		this.page = 1;
		this.state = {
			douban: {}
		}
	}
	componentDidMount() {
		this.getDoubanBO()
	}
	getDoubanBO(){
		this.setState({loading:true});
		fetch(API_DOUBAN_USBO)
		.then(res => res.json())
		.then((res) => {
			console.log(res);
			this.setState({douban:res});
		})
		.catch((err) => {
			console.error(err);
		})
	}
  render() {
		const {douban} = this.state;
    return (
      <View>
				<Text>{douban.title} {douban.date}</Text>
				<FlatList
					data={douban.subjects}
					keyExtractor={item => item.subject.id.toString()}
					renderItem={({item}) =>
						<View>
							<Text>{item.subject.original_title}</Text>
						</View>
					}
					/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  
});