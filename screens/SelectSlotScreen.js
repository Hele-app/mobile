import React, { Component } from 'react'
import {AsyncStorage,Text, View, StyleSheet,TouchableOpacity, Alert, Button } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import axios from 'axios';
import Api from '../config/Api'

export default class SelectSlotScreen extends Component {
    static navigationOptions = {
        title: 'Vos créneaux',
    };

    constructor(props) {
        super(props);
        this.state = {
          tableData: [],
          token: '',
        }
    }

    _SelectIndex(index) {
      alert(`This is row ${index}`);
    }
    
    async componentDidMount() {

        const token = await AsyncStorage.getItem('userToken');
        const headers = {
            'Authorization': 'bearer ' + token,
        }

          axios.get( Api.url('/get/slot'),{headers: headers})
          .then((response) => {
            const tab =  response.data.result
            this.setState({tableData: tab})
          })
          .catch(function (error) {
              console.log(error);
          });

    }

      render() {
        const state = this.state;
        return (
          <View style={styles.container}>
              {
                state.tableData.map(index => 
                (
                  <TouchableOpacity  key={index.id} onPress={() => this._SelectIndex(index.id)}>
                      <View style={styles.button}>
                        <Text style={styles.buttonText}>
                          {index.start_time}
                        </Text>
                      </View>
                  </TouchableOpacity>                   
                ))
              }
          </View>
        )
      }
    }
     
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        marginLeft:50,
        marginRight:50,
        alignItems: 'center',
        justifyContent: 'center',
    },
      button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
      },
      buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white'
      }
    });

