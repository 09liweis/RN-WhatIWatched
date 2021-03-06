import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image,Button, TouchableOpacity,Dimensions} from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import {API_DOUBAN_DETAIL,API_DETAIL,API_GET_IMDB_ID,API_UPSERT,API_DOUBAN_SEARCH} from '../utils/constants';
import {post,get} from '../utils/services';
const {width} = Dimensions.get('window');

export default class VisualForm extends Component {
	static navigationOptions = {
    title: 'Visual Form',
  };
	constructor(props) {
		super(props);
		this.state = {
      searchs: [],
      q:'',
      focusField:'',
			visual: {
				id: 0,
        title: '',
        original_title: '',
        douban_id: '',
        douban_rating: '0.0',
        imdb_id: '',
        imdb_rating: '0.0',
        rotten_id: '',
        rotten_rating: 0,
        rotten_audience_rating: 0,
        release_date: '',
        poster: '',
        summary: '',
        online_source: '',
        episodes: 1,
        current_episode: 0,
        visual_type: 'movie',
        website: '',
        languages:[],
        countries:[],
        duration:0,
			}
    };
    this.updateInput = this.updateInput.bind(this);
  }
  getVisualDetail(id) {
    get(API_DETAIL+id,(err, res)=> {
      const douban_id = res.result.douban_id;
      this.getIMDB(douban_id);
      this.setState({visual:res.result},()=>{
        this.getDoubanDetail(douban_id);
      });
    })
  }
  getIMDB(id) {
    get(API_GET_IMDB_ID+id,(err,res)=> {
      console.log(res);
    })
  }
  getSearch(q) {
    post(API_DOUBAN_SEARCH,{keyword:q},(err,res) => {
      this.setState({
        searchs: res.visuals
      })
    });
  }
  getDoubanDetail(id) {
    post(API_DOUBAN_DETAIL,{douban_id:id},(err,res)=>{
      let visual = this.state.visual;
      visual.douban_id = res.douban_id;
      visual.title = res.title;
      visual.original_title = res.original_title;
      visual.douban_rating = res.douban_rating;
      visual.summary = res.summary;
      visual.episodes = res.episodes;
      visual.visual_type = res.episodes > 1 ? 'tv' : 'movie';
      visual.poster = res.poster || res.douban_poster;
      visual.languages = res.languages;
      visual.countries = res.countries;
      if (date = res.release_dates[0]) {
        visual.release_date = date.substr(0,10);
      }
      visual.imdb_id = res.imdb_id;
      visual.imdb_rating = res.imdb_rating;
      visual.duration = res.duration;
      visual.website = res.website;
			this.setState({
        visual,
        view:'form',
        searchs:[]
			})
    });
  }
	componentDidMount() {
    const {navigation} = this.props;
    const visualId = navigation.getParam('visualId')
    if (visualId) {
      this.getVisualDetail(visualId);
    }
  }
  updateFocusStyle(field) {
    this.setState({focusField:field});
  }
  updateInput(key, value) {
    let visual = this.state.visual;
    visual[key] = value;
    this.setState({visual});
  }
  upsert() {
    const visual = this.state.visual;
    post(API_UPSERT, visual, (err, ret) => {
      if (ret.status == 200) {
        this.props.navigation.goBack(null);
      }
    });
  }
  render() {
    let {visual,view,searchs,q,focusField} = this.state;
    const fields = Object.keys(visual);
    
    let forms = fields.map((field)=>{
      var value = '';
      let focusStyle;
      if (visual[field]) {
        value = visual[field].toString()
      }
      if (focusField == field) {
        focusStyle = styles.focusStyle;
      }
      return (
        <View style={styles.formField} key={field}>
          <Text style={styles.textLabel}>{field}</Text>
          <TextInput
            onFocus={()=>this.updateFocusStyle(field)}
            style={[styles.textInput,focusStyle]}
            onChangeText={(value) => this.updateInput(field, value)}
            value={value}
          />
        </View>
      )
      }
    );
    let pageView = (
      <ScrollView style={styles.pageContainer} showsVerticalScrollIndicator={false} >
        <Button style={styles.upsertBtn} title="Add/Update" onPress={()=>this.upsert()}/>
        {forms}
      </ScrollView>
    );
    if (view == 'search') {
      pageView = (
        <View>
          <TextInput onChangeText={(val)=>this.setState({q:val})}/>
          <Button title="search" onPress={()=>this.getSearch(q)}/>
          <FlatList
            data={searchs}
            keyExtractor={item => item.douban_id}
            renderItem={({item}) => 
              <TouchableOpacity onPress={()=>this.getDoubanDetail(item.douban_id)}>
                <View style={styles.searchResult}>
                  <Image style={styles.searchResultImg} source={{uri:item.poster}}/>
                  <View style={styles.searchResultDetail}>
                    <Text>{item.name}</Text>
                    <Text>{item.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            }
          />
        </View>
      );
    }
    return (
      <View>
        <Button title='Search on douban' onPress={()=>this.setState({view:'search'})}/>

        {pageView}
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    position:'relative',
    // height: '100%',
    margin:10,
    paddingBottom:400
  },
  formField:{
    marginBottom:10
  },
  textLabel:{
    // textTransform:'capitalize',
    marginBottom:5
  },
  textInput: {
    padding:0,
    borderWidth:0,
    borderBottomColor:'gray',
		borderBottomWidth: 1,
  },
  focusStyle:{
    borderBottomColor:'green',
    borderBottomWidth:2
  },
  searchResult:{
    flexDirection:'row',
    padding:15
  },
  searchResultImg:{
    width:width/5,
    height:width/5*400/270
  },
  searchResultDetail:{
    padding:15
  }
});