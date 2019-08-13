import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground} from 'react-native';
import ElmStyle from './ElmStyle'
import Thumbnail from './frac/Thumbnail'
import Tag from './frac/Tag'

export default class Block1 extends Component {
  constructor(props) {
    super(props);    
  }
  componentDidMount() {

  }
  render() {
    const {feed} = this.props;
    let thumb,sbtl,tag,source,textStyle = {};
    if (feed.clr) {
      textStyle.color = feed.clr;
    }
    if (feed.thumb) {
      thumb = <Thumbnail thumb={feed.thumb}/>
    }
    if (feed.sbtl) {
      sbtl = <Text style={textStyle}>{feed.sbtl}</Text>
    }
    if (feed.tag) {
      tag = <Tag tag={feed.tag}/>
    }
    if (feed.bg && feed.bg.url) {
      source = {uri:feed.bg.url}
    }
    return(
      <ImageBackground source={source} style={[ElmStyle.view,ElmStyle.viewOne,{backgroundColor:feed.bg}]}>
        <View>
          <Text style={[ElmStyle.viewTl,textStyle]}>{feed.tl}</Text>
          {sbtl}
          {tag}
        </View>
        <View>{thumb}</View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
})