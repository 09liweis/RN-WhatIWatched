import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Image,TouchableOpacity,Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const cardWdith = (width)/3

export default Visuals = (props) => {
  const {navigation,v} = props;
  let progress = {backgroundColor:'red'}
  if (v.current_episode == v.episodes) {
    progress.backgroundColor = '#3e8c3e';
  } else if (v.current_episode > 0) {
    progress.backgroundColor = '#ffc107'
  }
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('VisualDetail',{id:v.id,title:v.title})}>
      <Image style={styles.VisualImage} source={{uri: v.poster}} />
      <Text style={[styles.VisualText,styles.progress,progress]}>{v.current_episode}/{v.episodes}</Text>
    </TouchableOpacity>
  );
}
const elevation = 5;
const styles = StyleSheet.create({
  card: {
    backgroundColor:'#fff',
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation,
    position:'relative',
    width: cardWdith,
  },
  VisualImage: {
    width: cardWdith,
    height: 230,
    // borderRadius: 5
  },
  VisualDetail: {
    padding: 10
  },
  VisualText: {
    fontFamily:'monospace',
    fontSize: 14
  },
  VisualTitle: {
    fontSize: 20,
    fontFamily:'Roboto',
    fontWeight:'bold'
  },
  progress:{
    position:'absolute',
    top:0,
    left:0,
    color:'#fff',
    padding:4,
    borderRadius:5
  }
});