import React, {Component} from 'react';
import {Platform, StyleSheet, Text,ScrollView,View, Image, TouchableOpacity, Button,Dimensions} from 'react-native';
import {API_DETAIL,API_INCREASE_EPISODE,API_DOUBAN_DETAIL,API_DOUBAN_DETAIL_PHOTO,API_DELETE} from '../utils/constants.js'
import { FlatList } from 'react-native-gesture-handler';
import VisualBasic from '../components/VisualBasic.js';
import {get,post,updateVisual} from '../utils/services';
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
    this.delete = this.delete.bind(this)
    this.edit = this.edit.bind(this);
	}
	componentDidMount() {
    const {visual} = this.state;
    get(API_DETAIL+visual.id,(err,res)=> {
      var visual = res.result;
      // updateVisual(visual,(err,douban)=>{
      //   this.setState({douban});
      // });
      // this.getPhotos(doubanId)
      this.setState({
        visual
      })
    });
  }
  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;
    };
  }
  getPhotos(id) {
    const url = API_DOUBAN_DETAIL_PHOTO.replace('{id}',id);
    get(url, (err, res)=> {
      this.setState({photos:res.photos});
    });
  }
  increaseEpisode() {
    const {visual} = this.state;
    get(API_INCREASE_EPISODE+visual.id,(err, res)=>{
      visual.current_episode = res.current_episode
      this.setState({
        visual: visual
      });
    });
  }
  edit() {
    const {visual} = this.state;
    const {navigation} = this.props;
    navigation.navigate('VisualForm',{visualId: visual.id})
  }
  delete() {
    const {id} = this.state.visual;
    post(API_DELETE,{id},(err,ret)=>{
      if (ret.status == 200) {
        this.props.navigation.goBack(null);
      }
    });
  }
  render() {
    const {visual,douban,photos} = this.state;
    const v = visual;
    let res = (
      <Text>Loading</Text>
    );
    if (v.id) {
      res = (
        <ScrollView>
          <VisualBasic visual={v} />
          <View style={styles.btns}>
            <Button style={styles.btn}
              onPress={this.increaseEpisode}
              title="+1 Episode"
            />
            <Button style={styles.btn}
              onPress={this.edit}
              title="Edit"
            />
            <Button style={styles.btn}
              onPress={this.delete}
              title="Delete"
            />
          </View>
          <Text style={styles.summary}>{v.summary}</Text>
          {(douban.casts && douban.casts.length > 0)?
          <FlatList
            showsHorizontalScrollIndicator={false}
            // ItemSeparatorComponent={()=><View style={{width:10}}/>}
            horizontal
            data={douban.casts}
            keyExtractor={(item, index) => 'key'+index}
            renderItem={({item}) =>
              <View style={styles.avtContainer}>
                <Image resizeMode="contain" style={styles.avt} source={{uri:item.avt}}/>
                <View style={styles.avtName}>
                  <Text>{item.name}</Text>
                  <Text>{item.role}</Text>
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
  btns: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btn: {
    width: '48%',
    borderRadius: 10
  },
  photoContainer:{
    width:width/4
  },
  photo:{
    width:100,
    height:100
  }
});