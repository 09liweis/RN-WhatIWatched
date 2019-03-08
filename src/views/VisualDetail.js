import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Button} from 'react-native';

export default class VisualDetail extends Component {
	static navigationOptions = {
    title: 'Visual Detail',
  };
	constructor(props) {
		super(props);
    const { navigation } = props;
		this.state = {
			visual: navigation.getParam('visual')
		}
    this.increaseEpisode = this.increaseEpisode.bind(this)
    this.edit = this.edit.bind(this);
	}
	componentDidMount() {
		
	}
  increaseEpisode() {
    const {visual} = this.state;
    fetch('https://what-i-watched.herokuapp.com/api/visual/increase_episode?id='+visual.id)
    .then(res => res.json())
    .then((res) => {
      visual.current_episode = res.current_episode
      this.setState({
        visual: visual
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }
  edit() {
    const {visual} = this.state;
  }
  render() {
    const {visual} = this.state;
    return (
      <View>
      	<Text>{visual.title}</Text>
        <Text>{visual.current_episode}/{visual.episodes}</Text>
        <Button 
          onPress={this.increaseEpisode}
          title="Increate Episode"
        />
        <Button 
          onPress={this.edit}
          title="Edit"
        />
      </View>
    );
  }
}