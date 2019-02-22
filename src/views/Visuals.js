import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Button, View, FlatList, Image, TouchableOpacity} from 'react-native';


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
  	const {navigation} = this.props;
    return (
      <View>
      	<Text>Visual List Page {this.state.visuals.length}</Text>
      	<FlatList
				  data={this.state.visuals}
				  keyExtractor={item => item.id.toString()}
				  renderItem={({item}) =>
				  	<TouchableOpacity onPress={() => navigation.navigate('VisualDetail',{visual: item})}>
					  	<View style={{flex: 1, flexDirection: 'row', marginBottom: 15}}>
					  		<Image style={{width: '30%', height: 200}} source={{uri: item.poster}} />
					  		<View style={{marginLeft: 15}}>
					  			<Text style={{fontSize: 24}}>{item.title}</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
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