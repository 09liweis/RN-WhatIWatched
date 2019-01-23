import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';

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
			visuals: []
		}
	}
	componentDidMount() {
		fetch('https://what-i-watched.herokuapp.com/api/visuals')
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
    return (
      <View>
      	<Text>Visual List Page {this.state.visuals.length}</Text>
      	<FlatList
				  data={this.state.visuals}
				  keyExtractor={item => item.id.toString()}
				  renderItem={({item}) =>
				  	<TouchableOpacity onPress={() => console.log('Test')}>
					  	<View style={{flex: 1, flexDirection: 'row', marginBottom: 15}}>
					  		<Image style={{width: '30%', height: 200}} source={{uri: item.poster}} />
					  		<View style={{marginLeft: 15}}>
					  			<Text style={{fontSize: 24}}>{item.title}</Text>
					  		</View>
					  	</View>
				  	</TouchableOpacity>
				  }
				/>
      </View>
    );
  }
}