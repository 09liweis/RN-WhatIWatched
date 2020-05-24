import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {API_RANDOM} from '../utils/constants.js'
import {get} from '../utils/services.js'
import VisualBasic from './VisualBasic'

export default class VisualRandom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visual:{},
      loading: false
    };
  }
  componentDidMount() {
    this.getRandomVisual();
    this.timer = setInterval(() => {
      this.getRandomVisual();
    },15000);
  }
  getRandomVisual() {
    this.setState({loading:true})
    get(API_RANDOM, (err, res) => {
      this.setState({visual:res.result,loading:false});
    });
  }
  componentWillUnmount() {
    this.timer.clearInterval();
    delete this.timer;
  }
  render() {
    const {navigation} = this.props;
    const {visual, loading} = this.state;
    let visualView;
    if (!loading) {
      visualView = (
        <TouchableOpacity onPress={() => navigation.navigate('VisualDetail',{id:visual.id,title:visual.title})}>
          <VisualBasic visual={visual} />
          <View>
            <Text>Loading</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      visualView = <ActivityIndicator size="large" color="#0000ff" />;
    }
    return(
      <View>{visualView}</View>
    );
  }
}
const styles = StyleSheet.create({

});