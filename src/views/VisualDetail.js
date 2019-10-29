import React, {Component} from 'react';
import {Platform, StyleSheet, Text,ScrollView,View, Image, TouchableOpacity, Button,Linking,Dimensions} from 'react-native';
import {API} from '../utils/constants.js'
const {width,height} = Dimensions.get('window');

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
      }
		}
    this.increaseEpisode = this.increaseEpisode.bind(this)
    this.edit = this.edit.bind(this);
	}
	componentDidMount() {
		const {visual} = this.state;
    fetch(API+visual.id)
    .then(res => res.json())
    .then((res) => {
      this.setState({
        visual: res.result
      })
    })
    .catch((err) => {
      console.error(err);
    })
	}
  increaseEpisode() {
    const {visual} = this.state;
    fetch(API+'increase_episode?id='+visual.id)
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
    const {visual} = this.state;
    const v = visual;
    let res = (
      <Text>Loading</Text>
    );
    if (v.title) {
      res = (
        <ScrollView>
          <View style={styles.header}>
            <Image style={styles.poster} source={{uri:v.poster}}/>
            <View style={styles.title}>
              <Text style={styles.tl}>{v.title}</Text>
              <Text style={styles.sbtl}>{v.original_title}</Text>
              <TouchableOpacity style={styles.ratingRow} onPress={()=>Linking.openURL('https://movie.douban.com/subject/'+v.douban_id)}>
                <Text style={[styles.douban,styles.ratingLabel]}>豆</Text>
                <Text>{v.douban_rating}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ratingRow} onPress={()=>Linking.openURL('https://imdb.com/title/'+v.imdb_id)}>
                <Text style={[styles.imdb,styles.ratingLabel]}>IMDB</Text>
                <Text>{v.imdb_rating}</Text>
              </TouchableOpacity>
              <Text>{v.current_episode}/{v.episodes}</Text>
              <Text>{v.release_date}</Text>
              <Text>国家: {v.countries.join(',')}</Text>
              <Text>语言: {v.languages.join(',')}</Text>
            </View>
          </View>
          <Text style={styles.summary}>{v.summary}</Text>
          <Button 
            onPress={this.increaseEpisode}
            title="Increate Episode"
          />
          <Button 
            onPress={this.edit}
            title="Edit"
          />
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
  header:{
    flexDirection:'row',
  },
  title:{
    padding:10
  },
  tl:{
    fontSize:20,
    fontWeight:'bold',
    fontFamily:'monospace'
  },
  sbtl:{
    fontSize:16,
    color:'#bbc2cf'
  },
  poster:{
    width:width/3,
    height:250
  },
  ratingRow:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:5
  },
  ratingLabel:{
    marginRight:5,
    paddingLeft:4,
    paddingRight:4,
    paddingTop:2,
    paddingBottom:2
  },
  douban:{
    backgroundColor:'#187610',
    color:'#fff',
  },
  imdb:{
    backgroundColor:'#f5c617',
  },
  summary:{
    marginTop:20,
    fontSize:16,
    lineHeight:25
  }
});