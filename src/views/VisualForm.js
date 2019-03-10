import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';

export default class VisualForm extends Component {
	static navigationOptions = {
    title: 'Add New Visual',
  };
	constructor(props) {
		super(props);
		this.state = {
			searchs: [],
			visual: {
				id: 0,
        title: '',
        original_title: '',
        douban_id: '',
        douban_rating: '0.0',
        imdb_id: '',
        imdb_rating: '0.0',
        rotten_id: '',
        rotten_rating: 0,
        rotten_audience_rating: 0,
        release_date: '',
        poster: '',
        summary: '',
        online_source: '',
        episodes: 1,
        current_episode: 0,
        visual_type: 'movie'
			}
		}
	}
	componentDidMount() {
    const {navigation} = this.props;
    const visualId = navigation.getParam('visualId')
		fetch('https://what-i-watched.herokuapp.com/api/visual/' + visualId)
		.then(res => res.json())
		.then((res) => {
			this.setState({
				visual: res.result
			})
		})
		.catch((err) => {
			console.error(err);
		})
  }
  updateInput(key, value) {
    let visual = this.state.visual;
    visual[key] = value;
    this.setState({visual});
    console.log(this.state.visual);
  }
  render() {
    let {visual} = this.state;
    return (
      <View style={styles.pageContainer}>
      	<Text>Visual Form</Text>
        <TextInput
					style={styles.TextInput}
					placeholder={'Search Something'}
	        onChangeText={(title) => this.updateInput('title',title)}
	        value={visual.title}
	      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#090f2b',
    height: '100%'
	},
  TextInput: {
    color: '#FFFFFF'
  }
});