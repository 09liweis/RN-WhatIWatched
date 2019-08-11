import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Button} from 'react-native';

export default class Tag extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {

  }
  render() {
    const {tag} = this.props;
    return(
      <Text style={styles.tag}>{tag.tl}</Text>
    );
  }
}
const styles = StyleSheet.create({
  tag:{
    backgroundColor:'red',
    color:'#fff',
    textAlign:'center',
    borderRadius:2,
    paddingTop:7,
    paddingBottom:7,
    paddingLeft:25,
    paddingRight:25,
    marginTop:10,
    alignSelf:'flex-start'
  }
})