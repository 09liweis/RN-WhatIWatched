import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList,Image,ActivityIndicator,Dimensions} from 'react-native';
import {API_DOUBAN_USBO} from '../../utils/constants.js'
const {width,height} = Dimensions.get('window');
export default class Douban extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      douban: {},
      loading:false
    }
  }
  componentDidMount() {
    this.getDoubanBO()
  }
  getDoubanBO(){
    this.setState({loading:true});
    fetch(API_DOUBAN_USBO)
    .then(res => res.json())
    .then((res) => {
      this.setState({douban:res,loading:false});
    })
    .catch((err) => {
      console.error(err);
    })
  }
  render() {
    const {douban,loading} = this.state;
    let view;
    if (loading) {
      view = <View style={styles.loading}><ActivityIndicator size="large" color="#0000ff" /></View>;
    } else {
      view = (
        <React.Fragment>
          <Text style={styles.title}>{douban.title} {douban.date}</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={douban.subjects}
            keyExtractor={item => item.subject.id.toString()}
            renderItem={({item}) =>
              <View style={styles.boxoffice}>
                <View style={styles.imgWrapper}>
                  <Image style={styles.boxofficeImg} source={{uri:item.subject.images.small}}/>
                </View>
                <View style={styles.boxofficeInfo}>
                  <Text style={styles.itemTitle}>{item.subject.title}</Text>
                  <Text>{item.subject.original_title}</Text>
                  <Text>{item.subject.durations.join(',')}</Text>
                  <Text>{item.subject.genres.join(',')}</Text>
                  <Text>${item.box}</Text>
                </View>
              </View>
            }
          />
        </React.Fragment>
      )
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
    backgroundColor:'#f1f1f1',
    paddingLeft:20,
    paddingRight:20
  },
  loading:{
    height,
    alignItems:'center',
    justifyContent:'center'
  },
  title:{
    textAlign:'center',
    fontSize:20
  },
  boxoffice:{
    marginTop:40,
    padding:20,
    borderRadius:20,
    flexDirection:'row',
    backgroundColor:'#fafafa'
  },
  imgWrapper:{
    width:100,
    height:100,
    position:'relative'
  },
  boxofficeImg:{
    position:'absolute',
    top:-40,
    width:100,
    height:150,
    borderRadius:20
  },
  boxofficeInfo:{
    paddingLeft:20
  },
  itemTitle:{
    fontSize:20,
    fontWeight:'bold'
  }
});