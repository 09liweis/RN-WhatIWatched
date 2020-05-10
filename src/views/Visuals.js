import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import {Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput,Button} from 'react-native';
import VisualCard from '../components/VisualCard'
import VisualRandom from '../components/VisualRandom'
import {API,API_LIST} from '../utils/constants.js'

class Visuals extends Component {
  static navigationOptions = {
    title: 'Welcome',
    headerStyle: {
      backgroundColor: 'green'
    }
  };
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      visuals: [],
      search: '',
      loading:false,
      api: API_LIST+'?limit=20&page='
    }
  }
  componentDidMount() {
    this.getVisuals();
  }
  getVisuals(){
    const {api,visuals} = this.state;
    const url = api+this.page;
    let results = [];
    this.setState({loading:true});
    fetch(url)
    .then(res => res.json())
    .then((res) => {
      if (this.page == 1) {
        results = res.results;
      } else {
        results = visuals.concat(res.results);
      }
      this.setState({
        visuals:results,
        loading:false
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }
  pullToRefresh() {
    this.page = 1;
    this.getVisuals();
  }
  handleLoadMore(){
    this.page = this.page + 1;
    this.getVisuals();
  }
  searchVisual(search) {
    this.setState({search});
    let url;
    if (search == '') {
      url = this.state.api;
    } else {
      url = API + 'search?keyword=' + search;
    }
    fetch(url)
    .then(res => res.json())
    .then((res) => {
      this.setState({
        visuals: res.results
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }
  render() {
    const {navigation} = this.props;
    const {visuals,loading} = this.state;
    return (
      <View style={styles.MainContainer}>
        <TouchableOpacity style={styles.addNew}>
          <Button
            title='Add'
            onPress={() => navigation.navigate('VisualForm')}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.searchBar}
          placeholder={'Search Visual'}
          onChangeText={(search) => this.searchVisual(search)}
          value={this.state.search}
        />
        <VisualRandom navigation={navigation}/>
        <FlatList
          numColumns={3}
          refreshing={loading == true}
          onRefresh={() => this.pullToRefresh()}
          data={visuals}
          keyExtractor={item => item.id.toString()}
          onEndReachedThreshold={0.4}
            onEndReached={this.handleLoadMore.bind(this)}
          renderItem={({item}) =>
            <VisualCard v={item} navigation={navigation}/>
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    position:'relative'
  },
  addNew:{
    position:'absolute',
    bottom:100,
    right:30,
    alignSelf:'flex-start',
    zIndex:1000
  },
  searchBar: {
    marginBottom:20,
    height: 40,
    borderColor: 'gray',
    color: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15
  },
});

import VisualDetail from './VisualDetail';
import VisualForm from './VisualForm';

class VisualHome extends Component {
  static navigationOptions = {
    title: 'What I Watched!',
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor:'#090f2b'
  };
  render() {
    return (
      <View style={styles.container}>
        <Visuals navigation={this.props.navigation} />
      </View>
    );
  }
}

const AppStackNavigator = createStackNavigator(
{
  VisualHome: VisualHome,
  VisualDetail: VisualDetail,
  VisualForm: VisualForm,
},
{
  initialRouteName: 'VisualHome'
},
{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'orange'
    }
  }
}
);
export default AppStackNavigator;