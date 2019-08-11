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
    const {img} = this.props;
    let lbl;
    if (img.lbl) {
      lbl = <Label lbl={img.lbl}/>
    }
    return(
      <ImageBackground style={styles.img} source={{uri:img.url}}>
        {lbl}
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  img:{
    position:'relative',
    aspectRatio:4/3,
    // width:150,
    height:100
  }
})