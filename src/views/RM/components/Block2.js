import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ElmStyle from './ElmStyle'
import Profile from './Profile'
import Tags from './Tags'
import Img from './Img'

export default class Block2 extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {

  }
  render() {
    const {feed} = this.props;
    let profile,sbtl,tags,imgs;
    if (feed.profile) {
      profile = <Profile profile={feed.profile}/>
    }
    if (feed.sbtl) {
      sbtl = <Text>{feed.sbtl}</Text>
    }
    if (feed.tags) {
      tags = <Tags tags={feed.tags}/>
    }
    if (feed.imgs) {
      const numImgs = feed.imgs.length;
      imgs = feed.imgs.map((img,i)=>{
        return <Img key={i} img={img} numImgs={numImgs} />
      })
    }
    return(
      <TouchableOpacity onPress={()=> console.log('test')}>
        <View style={[ElmStyle.view,styles.viewTwo]}>
          {profile}
          <Text style={ElmStyle.viewTl}>{feed.tl}</Text>
          <View style={styles.imgContainer}>{imgs}</View>
          <Text style={styles.txt}>{feed.txt}</Text>
          {tags}
          {sbtl}
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  viewTwo:{
    padding:10,
    borderWidth:1,
    borderColor:'#ccc',
    // shadowColor: '#ccc',
    // shadowOffset: { width: 2, height: 2 },
    // elevation: 2,
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
  },
  imgContainer:{
    marginTop:15,
    flex:1,
    flexDirection:'row'
  },
  txt:{
    marginTop:5,
    color:'#808080'
  }
})