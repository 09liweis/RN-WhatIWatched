import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {API_RANDOM} from '../utils/constants.js'
import VisualBasic from './VisualBasic'

export default class VisualRandom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visual:{}
    };
  }
  componentDidMount() {
    fetch(API_RANDOM)
		.then(res => res.json())
		.then((res) => {
			this.setState({visual:res.result});
		})
		.catch((err) => {
			console.error(err);
		})
  }
  render() {
    const {navigation} = this.props;
    const {visual} = this.state;
    let visualView;
    if (visual) {
      visualView = (
        <TouchableOpacity onPress={() => navigation.navigate('VisualDetail',{id:visual.id,title:visual.title})}>
          <VisualBasic visual={visual} />
        </TouchableOpacity>
      );
    } else {
      visualView = <Text>Loading</Text>;
    }
    return(
      <View>{visualView}</View>
    );
  }
}
const styles = StyleSheet.create({

});