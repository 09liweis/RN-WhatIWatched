import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Button, View, FlatList, Image, TouchableOpacity, TextInput} from 'react-native';


export default class Visuals extends Component {
	static navigationOptions = {
		title: 'Welcome',
		headerStyle: {
			backgroundColor: 'green'
		}
	};
	constructor(props) {
		super(props);
	}
	componentDidMount() {
	}
	
  	render() {
		const {navigation,v} = this.props;
		return (
			<View style={styles.VisualRow}>
				<Image style={styles.VisualImage} source={{uri: v.poster}} />
				<View style={styles.VisualDetail}>
					<Text style={[styles.VisualText, styles.VisualTitle]}>{v.title}</Text>
					<Text style={[styles.VisualText]}>{v.original_title}</Text>
					<Text style={styles.VisualText}>豆瓣评分: {v.douban_rating}</Text>
					<Text style={styles.VisualText}>IMDB: {v.imdb_rating}</Text>
					<Text style={styles.VisualText}>{v.release_date}</Text>
					<Text style={styles.VisualText}>进度: {v.current_episode}/{v.episodes}</Text>
					<Text style={styles.VisualText}>国家: {v.countries.join(',')}</Text>
					<Text style={styles.VisualText}>语言: {v.languages.join(',')}</Text>
				</View>
			</View>
		);
  }
}
const elevation = 5;
const styles = StyleSheet.create({
	VisualRow: {
		backgroundColor:'#fff',
		flex: 1,
		flexDirection: 'row',
		marginTop:15,
		marginLeft:15,
		marginRight:15,
		elevation,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 0.5 * elevation },
		shadowOpacity: 0.3,
		shadowRadius: 0.8 * elevation
	},
	VisualImage: {
		width: '30%',
		height: '100%',
		borderRadius: 5
	},
	VisualDetail: {
		padding: 10
	},
	VisualText: {
		fontSize: 14
	},
	VisualTitle: {
		fontSize: 20
	}
});