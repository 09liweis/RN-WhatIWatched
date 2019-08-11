import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ElmStyle from './ElmStyle'
import Thumbnail from './Thumbnail'
import Tag from './Tag'

export default class Block2 extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {

  }
  render() {
    const {feed} = this.props;
    let thumb,sbtl,tag,source;
    if (feed.thumb) {
      thumb = <Thumbnail thumb={feed.thumb}/>
    }
    if (feed.sbtl) {
      sbtl = <Text>{feed.sbtl}</Text>
    }
    if (feed.tag) {
      tag = <Tag tag={feed.tag}/>
    }
    return(
      <TouchableOpacity onPress={()=> console.log('test')}>
        <View style={[ElmStyle.view,styles.viewTwo]}>
          <View>
            <Text style={ElmStyle.viewTl}>{feed.tl}</Text>
            {sbtl}
            {tag}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  viewTwo:{
    padding:10,
    borderColor:'#ccc',
    borderWidth:1
  }
})