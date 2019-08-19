import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image,} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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
  }
  render() {
    let {visual} = this.state;
    const fields = Object.keys(visual);
    let forms = fields.map((fields)=>
      <FormInput updateInput={this.updateInput} key={fields} fields={fields} value={visual[fields].toString()} />
    );
    return (
      <ScrollView style={styles.pageContainer}>
        {forms}
      </ScrollView>
    );
  }
}

class FormInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>{this.props.fields}</Text>
        <TextInput
          style={styles.TextInput}
          onChangeText={(value) => this.props.updateInput(this.props.fields, value)}
          value={this.props.value}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    height: '100%'
	},
  TextInput: {
    borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 10,
  }
});