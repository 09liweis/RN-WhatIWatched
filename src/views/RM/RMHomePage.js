import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Button} from 'react-native';
import feeds from './feeds'
import Block1 from './components/Block1';
import Block2 from './components/Block2';

export default class RMHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds:feeds
    }
  }
  componentDidMount() {

  }
  // renderBlock(item) {
  //   if (item.id == 1) {
  //     return <BLock1 feed={item}/>;
  //   }
  // }
  render() {
    const {feeds} = this.state;
    return(
      <View style={styles.container}>
        <FlatList
          data={feeds}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) =>
            {if (item.tp == 1) {
              return <Block1 feed={item}/>;
            } else if (item.tp == 2) {
              return <Block2 feed={item}/>;
            }}
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    marginLeft:20,
    marginRight:20
  }
})