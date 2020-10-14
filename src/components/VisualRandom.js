import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {API_RANDOM} from '../utils/constants.js'
import {get, updateVisual} from '../utils/services.js'
import VisualBasic from './VisualBasic'

const styles = StyleSheet.create({
  countDown: {
    backgroundColor: 'red',
    height: 2
  }
});

export default class VisualRandom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visual:{},
      loading: false,
      countdown: 0,
      updating: false,
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
      let {countdown} = this.state;
      this.countDown = setInterval(() => {
        this.setState({countdown:countdown -= 1})
      },1000);
    })
    get(API_RANDOM, (err, res) => {
      this.setState({visual:res.result,loading:false}, () => {
        const {visual} = this.state;
        // update visual when visual douban_id or imdb_id is available
        this.setState({updating:true});
        updateVisual(visual, (err, ret) => {
          console.log(ret);
          this.setState({updating:false});
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
    const {visual, loading, countdown, updating} = this.state;
    const countDownStyle = styles.countDown;
    countDownStyle.width = countdown;
    let visualView;
    if (!loading) {
      visualView = (
        <TouchableOpacity onPress={() => navigation.navigate('VisualDetail',{id:visual.id,title:visual.title})}>
          <VisualBasic visual={visual} />
          <View style={countDownStyle}>
            <Text>{countdown} {(updating)?'Updating':''}</Text>
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
