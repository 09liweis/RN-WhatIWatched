import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Button} from 'react-native';

export default class Thumbnail extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {

  }
  render() {
    let {thumb,tStyle} = this.props;
    let style = styles.round;
    if (thumb.tp && thumb.tp == 2) {
      style = styles.square;
    }
    if (thumb.bClr) {
      tStyle.borderColor = thumb.bClr;
      tStyle.borderWidth = 1;
    }
    return(
      <TouchableOpacity onPress={()=> console.log('test')}>
        <Image style={[style,tStyle]} source={{uri:thumb.url}}/>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  round:{
    borderRadius:50/2,
    width:50,
    height:50
  },
  square:{
    width:100,
    height:100
  }
})