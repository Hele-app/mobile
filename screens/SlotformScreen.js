import React, { Component } from 'react'
import { AsyncStorage, StyleSheet, View, Text,TouchableOpacity,Button} from 'react-native';
import TimePicker from 'react-native-simple-time-picker';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';

export default class SlotformScreen extends Component {
    static navigationOptions = {
        title: 'Crée un créneau',
    };
    
    state = {
        selectedHours: 0,
        selectedMinutes: 0,
        date: '',
      }

    Register = event => {
        // axios.post('/make/slot')
        // axios.post(burl + '/inscription',send,{headers: headers})
        alert('Vous venez de crée un créneau pour le '+ this.state.date + ' à ' +this.state.selectedHours + ' H '+  this.state.selectedMinutes)
    }
     
      render() {
        const { selectedHours, selectedMinutes } = this.state;
        return (
          <View style={styles.container}>

                <DatePicker
                    style={styles.Select}
                    date={this.state.date}
                    mode="date"
                    format="DD-MM-YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel" 
                    onDateChange={(date) => this.setState({date: date})}
                />
                
                <TimePicker
                    style={styles.Select}
                    selectedHours={selectedHours}
                    selectedMinutes={selectedMinutes}
                    onChange={(hours, minutes) => this.setState({ selectedHours: hours, selectedMinutes: minutes })}
                />

                <View>
                    <TouchableOpacity onPress={this.Register} ><Text style={styles.button}>REGISTER</Text></TouchableOpacity>
                </View>
          </View>
        );
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
    Select: {
        width: 350,
        height: 55,
        backgroundColor: '#fff',
        margin: 10,
        padding: 8,
        borderRadius: 14,
    },
    button : {
        margin:20,
        backgroundColor: '#8A2BE2',
        width : 200,
        height : 20,
        textAlign: 'center',
        borderRadius: 40,
    },
})