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
			api: 'https://what-i-watched.herokuapp.com/api/visuals'
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
      	<Text>Visual List Page {this.state.visuals.length}</Text>
      	<TextInput
	        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
	        onChangeText={(search) => this.searchVisual(search)}
	        value={this.state.search}
	      />
      	<FlatList
				  data={this.state.visuals}
				  keyExtractor={item => item.id.toString()}
				  renderItem={({item}) =>
				  	<TouchableOpacity onPress={() => navigation.navigate('VisualDetail',{visual: item})}>
					  	<View style={styles.VisualRow}>
					  		<Image style={{width: '30%', height: 200}} source={{uri: item.poster}} />
					  		<View style={{marginLeft: 15}}>
					  			<Text style={[styles.VisualTitle, styles.VisualText]}>{item.title}</Text>
									<Text style={styles.VisualText}>豆瓣评分: {item.douban_rating}</Text>
									<Text style={styles.VisualText}>IMDB: {item.imdb_rating}</Text>
									<Text style={styles.VisualText}>{item.release_date}</Text>
									<Text style={styles.VisualText}>{item.current_episode}/{item.episodes}</Text>
					  		</View>
					  	</View>
				  	</TouchableOpacity>
				  }
				/>
				<TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('VisualForm')}
          style={styles.TouchableOpacityStyle}>
          <Image
            source={{uri:'http://aboutreact.com/wp-content/uploads/2018/08/bc72de57b000a7037294b53d34c2cbd1.png'}}

            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  MainContainer: {
		color: '#FFFFFF',
    backgroundColor: '#090f2b',
	},
	
	VisualRow: {
		flex: 1,
		flexDirection: 'row',
		marginBottom: 15,
		marginLeft: 15,
		marginRight: 15
	},

	VisualText: {
		color: '#FFFFFF'
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
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});