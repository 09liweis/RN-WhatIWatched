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
		this.page = 1;
		this.state = {
			visuals: [],
			search: '',
			loading:false,
			api: 'https://what-i-watched.herokuapp.com/api/visuals?limit=20&page='
		}
	}
	componentDidMount() {
		this.getVisuals();
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
	pullToRefresh() {
		this.page = 1;
	}
	handleLoadMore(){
		this.page = this.page + 1;
		this.getVisuals();
	}
	searchVisual(search) {
		this.setState({search});
		let url;
		if (search == '') {
			url = this.state.api;
		} else {
			url = 'https://what-i-watched.herokuapp.com/api/search?keyword=' + search;
		}
		fetch(url)
		.then(res => res.json())
		.then((res) => {
			this.setState({
				visuals: res.results
			})
		})
		.catch((err) => {
			console.error(err);
		})
	}
  render() {
		const {navigation} = this.props;
		const {visuals,loading} = this.state;
    return (
      <View style={styles.MainContainer}>
      	<TextInput
					style={styles.searchBar}
					placeholder={'Search Something'}
	        onChangeText={(search) => this.searchVisual(search)}
	        value={this.state.search}
	      />
      	<FlatList
		  	refreshing={loading == true}
			onRefresh={() => this.pullToRefresh()}
			data={visuals}
			keyExtractor={item => item.id.toString()}
			onEndReachedThreshold={0.4}
          	onEndReached={this.handleLoadMore.bind(this)}
			renderItem={({item}) =>
			<TouchableOpacity onPress={() => navigation.navigate('VisualDetail',{visual: item})}>
				<View style={styles.VisualRow}>
					<Image style={styles.VisualImage} source={{uri: item.poster}} />
					<View style={styles.VisualDetail}>
						<Text style={[styles.VisualText, styles.VisualTitle]}>{item.title}</Text>
							<Text style={[styles.VisualText]}>{item.original_title}</Text>
							<Text style={styles.VisualText}>豆瓣评分: {item.douban_rating}</Text>
							<Text style={styles.VisualText}>IMDB: {item.imdb_rating}</Text>
							<Text style={styles.VisualText}>{item.release_date}</Text>
							<Text style={styles.VisualText}>进度: {item.current_episode}/{item.episodes}</Text>
							<Text style={styles.VisualText}>国家: {item.countries.join(',')}</Text>
							<Text style={styles.VisualText}>语言: {item.languages.join(',')}</Text>
					</View>
				</View>
			</TouchableOpacity>
			}
		/>
				<TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('VisualForm')}
          style={styles.TouchableOpacityStyle}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const elevation = 5;
const styles = StyleSheet.create({
  MainContainer: {
	},
	searchBar: {
		height: 40,
		borderColor: 'gray',
		color: '#000',
		borderWidth: 1,
		borderRadius: 5,
		marginLeft: 15,
		marginRight: 15
	},
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
		padding: 15
	},
	VisualText: {
		fontSize: 16
	},
	VisualTitle: {
		fontSize: 24
	},
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  }
});