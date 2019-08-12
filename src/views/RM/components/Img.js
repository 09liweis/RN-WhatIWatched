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
    let lbl,prop,proj;
    if (img.lbl) {
      lbl = <Label lbl={img.lbl}/>
    }
    let ratio = {
      // aspectRatio:4/numImgs
    }
    if (numImgs == 1) {
      ratio.height = 150
    }
    if (numImgs == 2) {
      ratio.height = 120
    }
    if (img.prop) {
      prop = (
        <View>
          <Text style={[styles.propTxt,styles.propLp]}>{img.prop.lp}</Text>
          <Text style={[styles.propTxt,styles.propSp]}>{img.prop.sp}</Text>
          <Text style={[styles.propTxt,styles.dom]}>DOM: {img.prop.dom}</Text>
          <Text style={[styles.propTxt]}>Tax: {img.prop.tax}</Text>
          <Text style={[styles.propTxt]}>{img.prop.addr}</Text>
          <Text style={[styles.propTxt]}>{img.prop.sid}</Text>
        </View>
      );
    }
    if (img.proj) {
      const p = img.proj;
      proj = (
        <View style={styles.proj}>
          <Text>{p.nm}</Text>
          <Text>{p.txt}</Text>
        </View>
      );
    }
    return(
      <View style={styles.imgContainer}>
        <ImageBackground style={[styles.img]} source={{uri:img.url}}>
          {lbl}
          {prop}
        </ImageBackground>
        {proj}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  imgContainer:{
    flex:1,
    justifyContent:'space-around'
  },
  img:{
    position:'relative',
    height:100,
    padding:10
  },
  propTxt:{
    color:'#fff'
  },
  propLp:{
    fontWeight:'bold'
  },
  propSp:{
    textDecorationLine:'line-through'
  },
  dom:{
    color:'#fcae28'
  },
  proj:{
    marginTop:5
  }
})