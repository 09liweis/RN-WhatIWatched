import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Button} from 'react-native';
import Tag from './Tag'

export default class Tags extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {

  }
  render() {
    const {tags} = this.props;
    const ts = tags.map((tag)=>{
      return <Tag tag={tag}/>
    });
    return(
      <View style={styles.tags}>{ts}</View>
    );
  }
}
const styles = StyleSheet.create({
  tags:{
    flex:1,
    flexDirection:'row',
    alignSelf:'flex-start'
  }
})