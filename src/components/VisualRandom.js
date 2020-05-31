import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {API_RANDOM} from '../utils/constants.js'
import {get, updateVisual} from '../utils/services.js'
import VisualBasic from './VisualBasic'

export default class VisualRandom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visual:{},
      loading: false,
      countdown: 0
    };
  }
  componentDidMount() {
    this.getRandomVisual();
    this.timer = setInterval(() => {
      this.getRandomVisual();
    },15000);
  }
  getRandomVisual() {
    if (this.countDown) {
      clearInterval(this.countDown);
      delete this.countDown;
    }
    this.setState({loading:true,countdown:15}, () => {
      this.countDown = setInterval(() => {
        this.setState({countdown:this.state.countdown -= 1})
      },1000);
    })
    get(API_RANDOM, (err, res) => {
      this.setState({visual:res.result,loading:false}, () => {
        updateVisual(this.state.visual, (err, ret) => {
          
        });
      });
    });
  }
  componentWillUnmount() {
    this.timer.clearInterval();
    delete this.timer;
  }
  render() {
    const {navigation} = this.props;
    const {visual, loading, countdown} = this.state;
    let visualView;
    if (!loading) {
      visualView = (
        <TouchableOpacity onPress={() => navigation.navigate('VisualDetail',{id:visual.id,title:visual.title})}>
          <VisualBasic visual={visual} />
          <View>
            <Text>{countdown}</Text>
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