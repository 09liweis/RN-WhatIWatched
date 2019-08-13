import React, {Component} from 'react';
import {Platform, StyleSheet, View, FlatList} from 'react-native';
import feeds from './feeds'
import Block from './components/Block';

export default class RMHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds:feeds,
      loading:false
    }
  }
  componentDidMount() {

  }
  pullToFresh() {
    this.setState({loading:true});
    setTimeout(()=> this.setState({loading:false}),3000);
  }
  render() {
    const {feeds,loading} = this.state;
    return(
      <View style={styles.container}>
        <FlatList
          refreshing={loading == true}
          onRefresh={() => this.pullToFresh()}
          data={feeds}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) =>
            <Block feed={item}/>
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
  }
})