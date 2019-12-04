import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList,Image,ActivityIndicator,Dimensions} from 'react-native';
import {API_MAOYAN} from '../../utils/constants.js'
const {width,height} = Dimensions.get('window');
export default class Maoyan extends Component {
	constructor(props) {
		super(props);
		this.page = 1;
		this.state = {
			maoyan: {},
			loading:false,
		}
	}
	componentDidMount() {
		this.getMaoyan()
	}
	getMaoyan(){
		if (!this.state.maoyan.serverTime) {
			this.setState({loading:true});
		}
		fetch(API_MAOYAN)
		.then(res => res.json())
		.then((res) => {
			this.setState({maoyan:res.data,loading:false});
		})
		.catch((err) => {
			console.error(err);
		})
	}
  render() {
		const {maoyan,loading} = this.state;
		let view;
		if (loading) {
			view = <View style={styles.loading}><ActivityIndicator size="large" color="#0000ff" /></View>;
		} else {
			view = <React.Fragment>
								<Text style={styles.title}>{maoyan.serverTime}</Text>
								<FlatList
									data={maoyan.list}
									keyExtractor={item => item.movieId.toString()}
									renderItem={({item}) =>
										<View style={styles.boxoffice}>
											<View style={styles.boxofficeInfo}>
												<Text>{item.movieName}</Text>
												<Text>{item.releaseInfo}</Text>
												<Text>{item.sumBoxInfo}</Text>
											</View>
										</View>
									}
									/>
							</React.Fragment>
		}
    return (
			<View style={styles.container}>
				{view}
			</View>
    );
  }
}
const styles = StyleSheet.create({
	container:{
	},
	loading:{
		height,
		alignItems:'center',
		justifyContent:'center'
	},
	title:{
		fontSize:30,
		textAlign:'center',
		margin:10
	}
});