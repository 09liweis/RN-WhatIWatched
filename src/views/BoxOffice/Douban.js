import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList,Image} from 'react-native';
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
				<Text style={styles.title}>{douban.title} {douban.date}</Text>
				<FlatList
					data={douban.subjects}
					keyExtractor={item => item.subject.id.toString()}
					renderItem={({item}) =>
						<View style={styles.boxoffice}>
							<Image style={styles.boxofficeImg} source={{uri:item.subject.images.small}}/>
							<View style={styles.boxofficeInfo}>
								<Text>{item.subject.title}</Text>
								<Text>{item.subject.original_title}</Text>
								<Text>{item.subject.durations.join(',')}</Text>
								<Text>{item.subject.genres.join(',')}</Text>
								<Text>${item.box}</Text>
							</View>
						</View>
					}
					/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
	title:{
		textAlign:'center',
		fontSize:20
	},
  boxoffice:{
		marginBottom:5,
		padding:10,
		flexDirection:'row',
	},
	boxofficeImg:{
		width:100,
		height:150
	},
	boxofficeInfo:{
		padding:10
	}
});