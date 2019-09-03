import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import BlocComments from './BlocComments.js';

export default class BackgroundComment extends Component {
  render() {
    return (
      <View style={styles.flexRow} >
      <Image style={styles.stretchImg}
          source={require('../../../../assets/logoHeleOrange.png')} />
        <View style={styles.view}>
          <BlocComments {...this.props}/>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "3%",
    marginRight: "3%",
    marginBottom: "2%"
  },
  view: {
    backgroundColor: "#F1F0EF",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "80%",
    height: "auto",
    marginLeft : 10,
    padding :4,
    borderRadius: 20,
  },
  stretchImg: {
    resizeMode:"contain",
    width: 35,
    height: 35,
  }
});