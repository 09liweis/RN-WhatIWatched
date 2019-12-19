import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image,Button} from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

export default class VisualForm extends Component {
	static navigationOptions = {
    title: 'Visual Form',
  };
	constructor(props) {
		super(props);
		this.state = {
      searchs: [],
      q:'',
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
		}
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
      console.log(res);
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
      visual.episodes = res.episodes_count;
      visual.visual_type = res.subtype;
      visual.poster = res.images.large;
      visual.languages = res.languages;
      visual.countries = res.countries;
      visual.duration = res.duration;
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
  updateInput(key, value) {
    let visual = this.state.visual;
    visual[key] = value;
    this.setState({visual});
  }
  render() {
    let {visual,view,searchs,q} = this.state;
    delete visual.countries;
    delete visual.languages;
    const fields = Object.keys(visual);
    
    let forms = fields.map((field)=>{
      var value = '';
      if (visual[field]) {
        value = visual[field].toString()
      }
      return <FormInput updateInput={this.updateInput} key={field} field={field} value={value} />;
      }
    );
    let pageView = (
      <ScrollView style={styles.pageContainer} showsVerticalScrollIndicator={false} >
        {forms}
        <Button title="Add/Update" onPress={()=>console.log('test')}></Button>
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

class FormInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.formField}>
        <Text>{this.props.field}</Text>
        <TextInput
          style={styles.TextInput}
          onChangeText={(value) => this.props.updateInput(this.props.field, value)}
          value={this.props.value}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    height: '100%',
    margin:10,
    paddingBottom:100
  },
  formField:{
    marginBottom:10
  },
  TextInput: {
    borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 10,
  }
});