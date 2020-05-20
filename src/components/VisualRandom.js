import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {API_RANDOM} from '../utils/constants.js'
import {get} from '../utils/services.js'
import VisualBasic from './VisualBasic'

export default class VisualRandom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visual:{}
    };
  }
  componentDidMount() {
    get(API_RANDOM, (err, res) => {
      this.setState({visual:res.result});
    });
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