import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image,Button, Alert} from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

import axios from 'axios';
import qs from 'qs'

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
    fetch('https://what-i-watched.herokuapp.com/api/visual/' + id)
		.then(res => res.json())
		.then((res) => {
      const douban_id = res.result.douban_id;
      this.setState({visual:res.result},()=>{
        this.getDoubanDetail(douban_id);
      });
		})
		.catch((err) => {
			console.error(err);
		})
  }
  getSearch(q) {
    fetch('https://movie.douban.com/j/subject_suggest?q='+q)
		.then(res => res.json())
		.then((res) => {
			this.setState({
				searchs: res
			})
		})
		.catch((err) => {
			console.error(err);
		})
  }
  getDoubanDetail(id) {
    fetch('https://api.douban.com/v2/movie/subject/'+id+'?apikey=0df993c66c0c636e29ecbb5344252a4a')
		.then(res => res.json())
		.then((res) => {
      let visual = this.state.visual;
      visual.douban_id = res.id;
      visual.douban_rating = res.rating.average;
      visual.title = res.title;
      visual.original_title = res.original_title;
      visual.douban_rating = res.rating.average || 0;
      visual.summary = res.summary;
      visual.episodes = res.episodes_count || 1;
      visual.visual_type = res.subtype;
      visual.poster = res.images.large;
      visual.languages = res.languages;
      visual.countries = res.countries;
      visual.release_date = res.pubdates[0];
      if (res.durations.length > 0) {
        visual.duration = res.durations[0];
      }
			this.setState({
        visual,
        view:'form',
        searchs:[]
			})
		})
		.catch((err) => {
			console.error(err);
		})
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
    axios({
      method: 'post',
      headers:{
        'accept': 'application/json',
        'Content-Type':'application/x-www-form-urlencoded'
      },
      url: 'https://what-i-watched.herokuapp.com/api/visual/submit',
      data: qs.stringify(visual)//for django request post issue
    }).then(res => {
      if (res.status == 200) {
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
            keyExtractor={item => item.id}
            renderItem={({item}) => 
              <Button title={item.title} onPress={()=>this.getDoubanDetail(item.id)}></Button>
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
  upsertBtn:{
    position:'absolute',
    bottom:10,
    right:0
  }
});