import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import ElmStyle from './ElmStyle'
import Thumbnail from './Thumbnail'
import Tag from './Tag'

export default class Block1 extends Component {
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
    if (feed.bg && feed.bg.url) {
      source = {uri:feed.bg.url}
    }
    return(
      <TouchableOpacity onPress={()=> console.log('test')}>
        <ImageBackground source={source} style={[ElmStyle.view,ElmStyle.viewOne,{backgroundColor:feed.bg,width:'100%',height:'100%'}]}>
          <View>
            <Text style={ElmStyle.viewTl}>{feed.tl}</Text>
            {sbtl}
            {tag}
          </View>
          <View>{thumb}</View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
})