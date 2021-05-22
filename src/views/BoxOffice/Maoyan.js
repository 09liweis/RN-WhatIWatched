import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList,Image,ActivityIndicator,Dimensions} from 'react-native';
import {API_MAOYAN} from '../../utils/constants.js'
import {post} from '../../utils/services';
const {width,height} = Dimensions.get('window');
export default class Maoyan extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      maoyan: {},
      movies:[],
      loading:false,
    }
  }
  componentDidMount() {
    this.getMaoyan()
    setInterval(()=>{
      this.getMaoyan();
    },10000);
  }
  getMaoyan(){
    if (this.state.movies.length == 0) {
      this.setState({loading:true});
    }
    post(API_MAOYAN,{},(err,ret)=> {
      this.setState({movies:ret.movies,loading:false});
    })
  }
  render() {
    const {maoyan,loading,movies} = this.state;
    let view;
    if (loading) {
      view = <View style={styles.loading}><ActivityIndicator size="large" color="#0000ff" /></View>;
    } else {
      view = (
        <React.Fragment>
          <Text style={styles.title}>猫眼票房</Text>
          <FlatList
            data={movies}
            keyExtractor={item => item.movieInfo.movieId.toString()}
            renderItem={({item}) =>
              <View style={styles.maoyan}>
                <View style={styles.boxofficeInfo}>
                  <Text style={styles.maoyanTl}>{item.movieInfo.movieName}</Text>
                  <Text>{item.movieInfo.releaseInfo}</Text>
                  <Text>分账票房: {item.sumSplitBoxDesc}</Text>
                  <Text>总票房: {item.sumBoxDesc}</Text>
                </View>
              </View>
            }
            />
        </React.Fragment>
      );
    }
    return (
      <View style={styles.container}>
        {view}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
  },
  loading:{
    height,
    alignItems:'center',
    justifyContent:'center'
  },
  title:{
    fontSize:30,
    fontWeight: 'bold',
    textAlign:'center',
    margin:10
  },
  maoyan:{
    padding:20,
    borderBottomColor:'#ccc',
    borderBottomWidth:1,
    borderStyle:'solid'
  },
  maoyanTl:{
    fontSize:24
  }
});