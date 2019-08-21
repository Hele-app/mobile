import React from 'react';
import Api from '../config/Api';
import { View, Text} from 'react-native';
import axios from 'axios';

import MapHeader from '../components/Map/MapHeader';
import MapDisplay from '../components/Map/MapDisplay';
import MapModal from '../components/Map/MapModal';

export default class MapScreen extends React.Component
{
    static navigationOptions = {
        title: 'Carte',
    };

    constructor() {
        super();

        this.state = {
            region: '',
            pois: [],
            modalVisible: false,
            idPoi: [],
            coorRegion: {
                lattitude: 45.1474456787,
                longitude: 4.2578635216,
                lattitudeDelta: 3.231590092,
                longitudeDelta: 24.890310764     
            },
            info : null

        };

        // TODO: get user details here and passthem to the MapHeader in props
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeModal = this.handleChangeModal.bind(this)
    }

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

    handleChange = (region) => {
        this.setState({region: region})

        axios.get(Api.url(`/region/show/${region}`))
        .then(async response => {
            this.setState({
                coorRegion: response.data,
                pois: response.data.pois
            })
        })
        .catch(error => {
            console.log(error.response.data);
        })
    }

    render() {
        return (
            <View>
                <MapModal
                    modalVisible={this.state.modalVisible}
                    modal={this.handleChangeModal}
                    poi={this.state.idPoi} />
                <MapHeader
                    change={this.handleChange} />
                <MapDisplay
                    pois={this.state.pois}
                    modal={this.handleChangeModal}
                    coordregion={this.state.coorRegion}
                />
            </View>
        )
    }
}
