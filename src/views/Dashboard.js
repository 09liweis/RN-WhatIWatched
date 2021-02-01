import React, { Component } from 'react';
import {Platform, StyleSheet, Text,ScrollView,View, Image, TouchableOpacity, Button,Dimensions} from 'react-native';
import VisualRandom from '../components/VisualRandom'
import { API_STATS } from '../utils/constants.js'
import { get } from '../utils/services.js';
const {height} = Dimensions.get('window');

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats:{}
    }
  }
  componentDidMount() {
    get(API_STATS, (err, res) => {
      this.setState({
        stats: res,
        loading:false,
      })
    });
  }

  render() {
    const {navigation} = this.props;
    const {stats} = this.state;
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.viewTitle}>Dashboard</Text>
        <VisualRandom navigation={navigation}/>
        <View style={styles.statsContainer}>
          <Text style={[styles.statsBlock]}>Movie: {stats.movie}</Text>
          <Text style={[styles.statsBlock]}>TV: {stats.tv}</Text>
        </View>
        <TouchableOpacity style={styles.addNewContainer} onPress={() => navigation.navigate('VisualForm')}>
          <Text style={styles.addNew}>Add New</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    padding: 10,
    height: height
  },
  addNewContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20
  },
  addNew: {
    marginTop: 10,
    backgroundColor: '#5a62b3',
    padding: 10,
    color: '#fff',
    borderRadius: 100,
    textAlign: 'center',
    width: 50
  },
  viewTitle: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20
  },
  statsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statsBlock: {
    textAlign: 'center',
    borderRadius: 5,
    color: '#fff',
    fontSize: 30,
    padding: 20,
    width: '48%',
    backgroundColor: '#e7bdd4'
  }
});