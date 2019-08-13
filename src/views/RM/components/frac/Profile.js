import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Button} from 'react-native';
import ElmStyle from '../ElmStyle'
import Thumbnail from './Thumbnail'
export default class Profile extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {

  }
  render() {
    const {profile} = this.props;
    return(
      <TouchableOpacity onPress={()=> console.log('test')}>
        <View style={styles.profile}>
          <Thumbnail thumb={profile.thumb} />
          <View style={{marginLeft:5}}>
            <Text style={ElmStyle.viewTl}>{profile.tl}</Text>
            <Text>{profile.sbtl}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  profile:{
    flexDirection:'row',
    alignSelf:'flex-start',
    alignItems:'center',
    marginBottom:10
  }
})