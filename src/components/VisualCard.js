import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,Linking,TouchableOpacity,Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const cardWdith = (width)/3

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
			<TouchableOpacity style={styles.card} onPress={() => navigation.navigate('VisualDetail',{visual: v})}>
				<Image style={styles.VisualImage} source={{uri: v.poster}} />
				<Text style={[styles.VisualText,styles.progress]}>{v.current_episode}/{v.episodes}</Text>
				{/* <Text style={[styles.VisualText, styles.VisualTitle]}>{v.title}</Text> */}
				{/* <View style={styles.VisualDetail}>
					<Text style={[styles.VisualText]}>{v.original_title}</Text>
					<TouchableOpacity onPress={()=>Linking.openURL('https://movie.douban.com/subject/'+v.douban_id)}>
						<Text style={styles.VisualText}>豆瓣评分: {v.douban_rating}</Text>
					</TouchableOpacity>
					<Text style={styles.VisualText}>IMDB: {v.imdb_rating}</Text>
					<Text style={styles.VisualText}>{v.release_date}</Text>
					<Text style={styles.VisualText}>国家: {v.countries.join(',')}</Text>
					<Text style={styles.VisualText}>语言: {v.languages.join(',')}</Text>
				</View> */}
			</TouchableOpacity>
		);
  	}
}
const elevation = 5;
const styles = StyleSheet.create({
	card: {
		backgroundColor:'#fff',
		// flex: 1,
		// flexDirection: 'row',
		// marginTop:15,
		// marginLeft:15,
		// marginRight:15,
		elevation,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 0.5 * elevation },
		shadowOpacity: 0.3,
		shadowRadius: 0.8 * elevation,
		position:'relative',
		width: cardWdith,
	},
	VisualImage: {
		width: cardWdith,
		height: 270,
		// borderRadius: 5
	},
	VisualDetail: {
		padding: 10
	},
	VisualText: {
		fontFamily:'monospace',
		fontSize: 14
	},
	VisualTitle: {
		fontSize: 20,
		fontFamily:'Roboto',
		fontWeight:'bold'
	},
	progress:{
		position:'absolute',
		top:0,
		left:0,
		backgroundColor:'#fff',
		padding:4,
		borderRadius:2
	}
});