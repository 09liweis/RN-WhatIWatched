import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput,Button} from 'react-native';
import VisualCard from '../components/VisualCard'

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
				<Button
          title='Add New'
          onPress={() => navigation.navigate('VisualForm')}
        />
      	<TextInput
					style={styles.searchBar}
					placeholder={'Search Something'}
	        onChangeText={(search) => this.searchVisual(search)}
	        value={this.state.search}
	      />
      	<FlatList
					numColumns={3}
		  	refreshing={loading == true}
			onRefresh={() => this.pullToRefresh()}
			data={visuals}
			keyExtractor={item => item.id.toString()}
			onEndReachedThreshold={0.4}
          	onEndReached={this.handleLoadMore.bind(this)}
			renderItem={({item}) =>
				<VisualCard v={item} navigation={navigation}/>
			}
		/>
      </View>
    );
  }
}
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
});