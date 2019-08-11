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
    let tagStyle = styles.tag;
    let cusStyle = {};
    if (tag.style) {
      if (tag.style == 2) {
        tagStyle = styles.btn;
      }
    }
    if (tag.color) {
      cusStyle.color = tag.color;
      cusStyle.borderColor = tag.color;
    }
    return(
      <Text style={[styles.common,tagStyle,cusStyle]}>{tag.tl}</Text>
    );
  }
}
const styles = StyleSheet.create({
  common:{
    marginTop:10,
    marginRight:10
  },
  tag:{
    color:'red',
    borderWidth:1,
    borderColor:'red',
    padding:2,
    textAlign:'center',
    alignSelf:'flex-start'
  },
  btn:{
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