import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';

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
    const visualId = this.props.visualId;
		fetch('https://what-i-watched.herokuapp.com/api/visual/' + visualId)
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
      	<Text>Visual Form</Text>
      </View>
    );
  }
}