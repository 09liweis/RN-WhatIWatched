import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Button} from 'react-native';

export default class Label extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posMatch:{}
    }
  }
  componentDidMount() {
    let posMatch = {};
    for(let i = 2;i <=8;i++) {
      posMatch[i] = styles['pos'+i];
    }
    this.setState({
      posMatch:posMatch
    });
  }
  render() {
    const {lbl} = this.props;
    const posMatch = this.state.posMatch;
    let posStyle;
    if (posMatch) {
      posStyle = posMatch[lbl.pos];
    }
    return(
      <Text style={[styles.lbl,posStyle]}>{lbl.tl}</Text>
    );
  }
}
const styles = StyleSheet.create({
  lbl:{
    position:'absolute',
    color:'#fff',
    backgroundColor:'#000',
    padding:3,
    opacity:0.5
  },
  pos2:{
    right:0
  },
  pos3:{
    bottom:0,
    right:0
  },
  pos4:{
    bottom:0,
    left:0
  },
  pos5:{
    top:5,
    left:5
  }
})