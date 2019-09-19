import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Button,Linking} from 'react-native';

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
    const {navigation} = this.props;
    navigation.navigate('VisualForm',{visualId: visual.id})
  }
  render() {
    const {visual} = this.state;
    return (
      <View>
      	<Text>{visual.title}</Text>
        <Text>{visual.current_episode}/{visual.episodes}</Text>
				<View style={styles.VisualDetail}>
					<Text>{visual.original_title}</Text>
					<TouchableOpacity onPress={()=>Linking.openURL('https://movie.douban.com/subject/'+visual.douban_id)}>
						<Text>豆瓣评分: {visual.douban_rating}</Text>
					</TouchableOpacity>
					<Text>IMDB: {visual.imdb_rating}</Text>
					<Text>{visual.release_date}</Text>
					<Text>国家: {visual.countries.join(',')}</Text>
					<Text>语言: {visual.languages.join(',')}</Text>
				</View>
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
const styles = StyleSheet.create({
});