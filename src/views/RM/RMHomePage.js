import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Button} from 'react-native';
import Block1 from './components/Block1';
import Block2 from './components/Block2';

export default class RMHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: [
        {id:1,tl:'Upgrade to Premium VIP',sbtl:'Get more advanced features',bg:'#ccc',thumb:{tp:2,url:'https://www.realmaster.com/img/icon_index_sale.png'},tags:[{tl:'Tag'}]},
        {id:1,tl:'This is an Adddddddd',color:'#fff',bg:'#efdfdf',tag:{tl:'Detail',style:2}},
        {id:1,tl:'This is an Ad',sbtl:'Get more info',color:'#fff',bg:{url:'https://img.realmaster.com/mls/1/766/C4420766.jpg?5552753'}},
        {id:2,tl:'Cost of living Comparison between Markham and Toronto',imgs:[{url:'https://img.realmaster.com/mls/1/766/C4420766.jpg?5552753',}]},
      ]
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
            {if (item.id == 1) {
              return <Block1 feed={item}/>;
            } else if (item.id == 2) {
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