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
		this.state = {
			visuals: [],
			search: '',
			loading:false,
			page:1,
			api: 'https://what-i-watched.herokuapp.com/api/visuals?limit=20&page='
		}
	}
	componentDidMount() {
		this.getVisuals();
	}
	getVisuals(){
		this.setState({loading:true});
		fetch(this.state.api+this.state.page)
		.then(res => res.json())
		.then((res) => {
			this.setState({
				visuals: this.state.visuals.concat(res.results),
				loading:false
			})
		})
		.catch((err) => {
			console.error(err);
		})
	}
	pullToRefresh() {
		this.setState({page:1});
	}
	handleLoadMore(){
		this.setState({page:this.state.page+1});
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
		<Text style={[styles.pageTitle]}>你睇左 {visuals.length} 个野!</Text>
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

const styles = StyleSheet.create({
  MainContainer: {
		color: '#090f2b',
		marginLeft:15,
		marginRight:15
	},
	pageTitle: {
		fontSize: 36,
		textAlign: 'center',
		margin:20
	},
	searchBar: {
		height: 40,
		borderColor: 'gray',
		color: '#000',
		borderWidth: 1,
		borderRadius: 5,
		// marginLeft: 15,
		// marginRight: 15
	},
	VisualRow: {
		flex: 1,
		flexDirection: 'row',
		marginTop:15,
		borderRadius: 5,
		borderWidth:1,
		borderColor:'#ccc'
	},
	VisualImage: {
		width: '30%',
		height: 200,
		borderRadius: 10
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