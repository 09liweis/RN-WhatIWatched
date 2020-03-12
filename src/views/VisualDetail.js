import React, {Component} from 'react';
import {Platform, StyleSheet, Text,ScrollView,View, Image, TouchableOpacity, Button,Dimensions} from 'react-native';
import {API_DETAIL,API_INCREASE_EPISODE,API_DOUBAN_DETAIL,API_DOUBAN_DETAIL_PHOTO} from '../utils/constants.js'
import { FlatList } from 'react-native-gesture-handler';
import VisualBasic from '../components/VisualBasic.js';
const {width} = Dimensions.get('window');

export default class VisualDetail extends Component {
	static navigationOptions = ({navigation}) => {
    const title = navigation.getParam('title')
    return {
      title
    }
  };
	constructor(props) {
		super(props);
    const { navigation } = props;
		this.state = {
			visual: {
        id:navigation.getParam('id')
      },
      douban:{},
      photos:[]
		}
    this.increaseEpisode = this.increaseEpisode.bind(this)
    this.edit = this.edit.bind(this);
	}
	componentDidMount() {
		const {visual} = this.state;
    fetch(API_DETAIL+visual.id)
    .then(res => res.json())
    .then((res) => {
      var doubanId = res.result.douban_id;
      this.getDoubanDetail(doubanId);
      this.getPhotos(doubanId)
      this.setState({
        visual: res.result
      })
    })
    .catch((err) => {
      console.error(err);
    });
  }
  getDoubanDetail(id) {
    const url = API_DOUBAN_DETAIL.replace('{id}',id);
    fetch(url).then(res=>res.json()).then((res)=>{
      this.setState({douban:res});
    })
  }
  getPhotos(id) {
    const url = API_DOUBAN_DETAIL_PHOTO.replace('{id}',id);
    fetch(url).then(res=>res.json()).then((res)=>{
      this.setState({photos:res.photos});
    })
  }
  increaseEpisode() {
    const {visual} = this.state;
    fetch(API_INCREASE_EPISODE+visual.id)
    .then(res => res.json())
    .then((res) => {
      visual.current_episode = res.current_episode
      this.setState({
        visual: visual
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }
  edit() {
    const {visual} = this.state;
    const {navigation} = this.props;
    navigation.navigate('VisualForm',{visualId: visual.id})
  }
  render() {
    const {visual,douban,photos} = this.state;
    const v = visual;
    let res = (
      <Text>Loading</Text>
    );
    if (v.title) {
      res = (
        <ScrollView>
          <VisualBasic visual={v} />
          <Button 
            onPress={this.increaseEpisode}
            title="Increate Episode"
          />
          <Button 
            onPress={this.edit}
            title="Edit"
          />
          <Text style={styles.summary}>{v.summary}</Text>
          {(douban.casts && douban.casts.length > 0)?
          <FlatList
            showsHorizontalScrollIndicator={false}
            // ItemSeparatorComponent={()=><View style={{width:10}}/>}
            horizontal
            data={douban.casts}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) =>
              <View style={styles.avtContainer}>
                <Image resizeMode="contain" style={styles.avt} source={{uri:item.avatars.large}}/>
                <View style={styles.avtName}>
                  <Text>{item.name}</Text>
                  <Text>{item.name_en}</Text>
                </View>
              </View>
            }
          />
          :null}
          {(photos && photos.length > 0)?
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={photos}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) =>
              <View style={styles.photoContainer}>
                <Image resizeMode="cover" style={styles.photo} source={{uri:item.icon}}/>
              </View>
            }
          />
          :null}
        </ScrollView>
      );
    }
    return (
      <View style={styles.container}>
        {res}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    marginLeft:10,
    marginRight:10
  },
  summary:{
    marginTop:20,
    fontSize:16,
    lineHeight:25
  },
  avtContainer:{
    flexDirection:'column',
    width:width/4,
  },
  avt: {
    width:width/4,
    height:150
  },
  avtName:{
    padding:5
  },
  photoContainer:{
    width:width/4
  },
  photo:{
    width:100,
    height:100
  }
});