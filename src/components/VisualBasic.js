import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity,Linking, Image,Dimensions} from 'react-native';
const {width,height} = Dimensions.get('window');

export default VisualBasic = (props) => {
  const v = props.visual;
  return (
    <View style={styles.header}>
      <Image style={styles.poster} source={{uri:v.poster}}/>
      <View style={styles.title}>
        <Text style={styles.tl}>{v.title}</Text>
        <Text style={styles.sbtl}>{v.original_title}</Text>
        <TouchableOpacity style={styles.ratingRow} onPress={()=>Linking.openURL('https://movie.douban.com/subject/'+v.douban_id)}>
          <Text style={[styles.douban,styles.ratingLabel]}>豆</Text>
          <Text>{v.douban_rating}</Text>
        </TouchableOpacity>
        {v.imdb_id ?
        <TouchableOpacity style={styles.ratingRow} onPress={()=>Linking.openURL('https://imdb.com/title/'+v.imdb_id)}>
          <Text style={[styles.imdb,styles.ratingLabel]}>IMDB</Text>
          <Text>{v.imdb_rating}</Text>
        </TouchableOpacity>
        :null}
        <Text>{v.current_episode}/{v.episodes}</Text>
        <Text>{v.release_date}</Text>
        {v.countries?<Text>国家: {v.countries.join(',')}</Text>:null}
        {v.languages?<Text>语言: {v.languages.join(',')}</Text>:null}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    marginLeft:10,
    marginRight:10
  },
  header:{
    flexDirection:'row',
  },
  title:{
    padding:10,
    width:width - width/3
  },
  tl:{
    fontSize:20,
    fontWeight:'bold',
    fontFamily:'monospace'
  },
  sbtl:{
    fontSize:16,
    color:'#bbc2cf'
  },
  poster:{
    width:width/3,
    height:250
  },
  ratingRow:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:5
  },
  ratingLabel:{
    marginRight:5,
    paddingLeft:4,
    paddingRight:4,
    paddingTop:2,
    paddingBottom:2
  },
  douban:{
    backgroundColor:'#187610',
    color:'#fff',
  },
  imdb:{
    backgroundColor:'#f5c617',
  }
});