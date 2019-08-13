import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ElmStyle from './ElmStyle'
import Thumbnail from './frac/Thumbnail'
import Tags from './frac/Tags'

export default class Block2 extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {

  }
  render() {
    const {feed} = this.props;
    let thumb,tags,leftViewStyle = {flex:1};
    if (feed.thumb) {
      thumb = <View style={{flex:1}}><Thumbnail thumb={feed.thumb}/></View>
      leftViewStyle.flex = 3
    }
    if (feed.tags) {
      tags = <Tags tags={feed.tags}/>
    }
    return(
      <View style={[ElmStyle.view,styles.viewTwo]}>
        <View style={leftViewStyle}>
          <Text style={ElmStyle.viewTl}>{feed.tl}</Text>
          <Text style={styles.txt}>{feed.txt}</Text>
          {tags}
        </View>
        {thumb}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewTwo:{
    padding:10,
    borderColor:'#ccc',
    borderWidth:1,
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
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