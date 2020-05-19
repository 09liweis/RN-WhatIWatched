import React, { Component } from 'react';
import {Platform, StyleSheet, Text,ScrollView,View, Image, TouchableOpacity, Button,Dimensions} from 'react-native';
import VisualRandom from '../components/VisualRandom'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {navigation} = this.props;
    return (
      <View>
        <Text style={styles.viewTitle}>Dashboard</Text>
        <VisualRandom navigation={navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewTitle: {
    fontSize: 30,
    textAlign: 'center'
  }
});