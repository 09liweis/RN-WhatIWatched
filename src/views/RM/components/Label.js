import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Button} from 'react-native';

export default class Label extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posMatch:{
        2:styles.pos2,
        3:styles.pos3
      }
    }
  }
  componentDidMount() {

  }
  render() {
    const {lbl} = this.props;
    let posStyle = this.state.posMatch[lbl.pos];
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