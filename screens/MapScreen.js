import React, {Component} from 'react';
import Api from '../config/Api';
import { View, Text, StyleSheet, AsyncStorage} from 'react-native';
import axios from 'axios';
import MapHeader from '../components/Map/MapHeader';
import MapDisplay from '../components/Map/MapDisplay';
import MapModal from '../components/Map/MapModal';

export default class MapScreen extends Component {
    static navigationOptions = {
        title: 'Carte',
        headerStyle:{
            shadowColor:"transparent", 
            elevation: 0
        },
        headerTintColor: "#FBBA00", 
        headerTitleStyle :{
            color: "#59358B",
            fontSize: 20,
        },
    };

    constructor (props) {
        super(props);

        this.state = {
            modalVisible: false,
            pois: [],
            idPoi: [],
            region: {
                latitude: 48.858372,
                longitude: 2.294481,
                latitudeDelta: 7.0,
                longitudeDelta: 4.0,
            },
            user: {}
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleChangeModal = this.handleChangeModal.bind(this)
    }

    // componentDidMount = async () => {
    //     const token = await AsyncStorage.getItem('userToken')
    //     console.log(token)
    //     const headers = {
    //         'Authorization': 'bearer ' + token,
    //     }

    //     axios.get(Api.url('/user/region'), {headers : headers })
    //     .then(async response => {
    //         console.log(response.data)
    //         this.setState({userRegionId: response.data.region_id})
    //         console.log(this.state.userRegionId)

    //     })
    //     .catch(error => {
    //         console.log(error.response.data);
    //     })
    // }
    
    handleChangeModal(value, id) {
        if (id !== '') {
            axios.get(Api.url(`/poi/edit/${id}`))
            .then(async poi => {
                this.setState({
                    idPoi: poi.data,
                    modalVisible: value
                })
            })
            .catch(error => {
                console.log(error.response.data);
            })
        } else {
            this.setState({
                idPoi: '',
                modalVisible: value
            })
        }
    }

    handleChange(region) {
        axios.get(Api.url(`/region/${region}`))
        .then(async response => {
            this.setState({
                region: {
                    latitude: response.data.latitude,
                    longitude: response.data.longitude,
                    latitudeDelta: 10 * response.data.latitudeDelta,
                    longitudeDelta: 10 *response.data.longitudeDelta,
                },
                pois: response.data.pois
            })
        })
        .catch(error => {
            console.log(error.response.data);
        })
    }
  
    render() {
        return (
            <View style={styles.container}>
                <MapModal
                    modalVisible={this.state.modalVisible}
                    modal={this.handleChangeModal}
                    poi={this.state.idPoi} />
                <MapHeader
                    handleChange={this.handleChange} user={this.state.user}/>
                <MapDisplay
                    pois={this.state.pois}
                    modal={this.handleChangeModal}
                    region={this.state.region}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#fff',
    },
});