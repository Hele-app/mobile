import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Connexion from '../../SocketConn.js';

export default class PostNewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      message: ''
    };
    Connexion().then(({ post }) => {
      this.setState({ post })
    })
  }
  render() {
    onPress = () => {
      const message = this.state.message
      this.state.post.emit('message', message)
      this.setState({ message: '' })
    }
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={Platform.select({ ios: 80, android: 83 })} style={styles.keyboard} behavior="padding" enabled>
        <View style={styles.view} >
          <TextInput multiline style={styles.textInput} placeholder="votre commentaire ... "
            onChangeText={(message) => this.setState({ message })}
            value={this.state.message} autoCorrect={false} onSubmitEditing={this._submit} />
          <TouchableOpacity onPress={() => onPress()} style={styles.touchableButton}>
            <Text style={styles.text}>envoyer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  keyboard: {
    flex: 1.6,
    width: "auto",
    justifyContent: "flex-end",
  },
  view: {
    flex: 0.6,
    alignContent: "space-around",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
  },
  textInput: {
    marginBottom: 0,
    height: "50%",
    borderRadius: 50,
    backgroundColor: "#F1F0EF",
    color: "grey",
    width: "70%",
    padding: "2%",
  },
  text: {
    color: "white",
  },
  touchableButton: {
    backgroundColor: "#59358B",
    marginLeft: 10,
    marginBottom: 0,
    marginTop: 0,
    padding: "2%",
    width: "auto",
    color: "white",
    textDecorationColor: "white",
    borderRadius: 50,
  }
});