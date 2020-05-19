import React, { useState } from 'react';
import {Platform, StyleSheet, Text,ScrollView,View, Image, TouchableOpacity, Button,Dimensions} from 'react-native';

const Dashboard = (props) => {
  // const [stats, setStats] = useState(0);
  return (
    <View>
      <Text style={styles.viewTitle}>Dashboard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  viewTitle: {
    fontSize: 30,
    textAlign: 'center'
  }
});

export default Dashboard;