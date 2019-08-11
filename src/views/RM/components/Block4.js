import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ElmStyle from './ElmStyle'
import Thumbnail from './Thumbnail'
import Tags from './Tags'

export default class Block4 extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {

  }
  render() {
    const {feed} = this.props;
    let thumb,sbtl,tags,imgs;
    if (feed.thumb) {
      thumb = <Thumbnail thumb={feed.thumb}/>
    }
    if (feed.tags) {
      tags = <Tags tags={feed.tags}/>
    }
    return(
      <TouchableOpacity onPress={()=> console.log('test')}>
        <View style={[ElmStyle.view,styles.viewTwo]}>
          <View>
            <Text style={ElmStyle.viewTl}>{feed.tl}</Text>
            <Text style={styles.txt}>{feed.txt}</Text>
            {tags}
          </View>
          <View>{thumb}</View>
        </View>
      </TouchableOpacity>
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