import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Button} from 'react-native';

export default class Thumbnail extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {

  }
  render() {
    const {thumb} = this.props;
    return(
      <TouchableOpacity onPress={()=> console.log('test')}>
        <View>
          <Image style={styles.thumb} source={{uri:thumb.url}}/>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  thumb:{
    width:100,
    height:100
  }
})