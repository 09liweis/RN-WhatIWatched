import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Button} from 'react-native';

export default class Img extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {

  }
  render() {
    const {img} = this.props;
    return(
      <TouchableOpacity onPress={()=> console.log('test')}>
        <View>
          <Image style={styles.image} source={{uri:img.url}}/>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  image:{
    aspectRatio:4/3,
    // width:150,
    height:100
  }
})