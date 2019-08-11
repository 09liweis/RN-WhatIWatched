import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground, TouchableOpacity, Button} from 'react-native';
import Label from './Label'
export default class Img extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {

  }
  render() {
    const {img,numImgs} = this.props;
    let lbl;
    if (img.lbl) {
      lbl = <Label lbl={img.lbl}/>
    }
    let ratio = {
      aspectRatio:4/numImgs
    }
    if (numImgs == 1) {
      ratio.height = 150
    }
    return(
      <ImageBackground style={[styles.img,ratio]} source={{uri:img.url}}>
        {lbl}
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  img:{
    position:'relative',
    height:100
  }
})