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
			api: 'https://what-i-watched.herokuapp.com/api/visuals?limit=20'
		}
	}
	componentDidMount() {
		fetch(this.state.api)
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
    return (
      <View style={styles.MainContainer}>
      	<Text style={[styles.pageTitle]}>你睇左 {this.state.visuals.length} 个野!</Text>
      	<TextInput
					style={styles.searchBar}
					placeholder={'Search Something'}
	        onChangeText={(search) => this.searchVisual(search)}
	        value={this.state.search}
	      />
      	<FlatList
				  data={this.state.visuals}
				  keyExtractor={item => item.id.toString()}
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
		marginLeft: 15,
		marginRight: 15
	},
	VisualRow: {
		flex: 1,
		flexDirection: 'row',
		margin: 15,
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