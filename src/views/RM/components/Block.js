import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity,ToastAndroid} from 'react-native';
import Block1 from './Block1';
import Block2 from './Block2';
import Block4 from './Block4';

export default class Block extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {

  }
  getBlock(feed) {
    switch(feed.tp) {
      case 1:
        return <Block1 feed={feed}/>;
      case 2:
        return <Block2 feed={feed}/>;
      default:
        return <Block4 feed={feed}/>;
    }
  }
  render() {
    const {feed} = this.props;
    let block = this.getBlock(feed);
    return(
      <TouchableOpacity onPress={()=> ToastAndroid.show(JSON.stringify(feed),ToastAndroid.SHORT)}>
        {block}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
})