import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Api from '../../config/Api';
import axios from 'axios';

export default class MapHeader extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            regions: [],
            selectedRegion: '',
            userRegionId: null
            // TODO: userRegionId: this.props.user.region_id
        }
    }

    componentDidMount = async () => {
        axios.get(Api.url('/region'))
        .then(async regions => {
            this.setState({ regions: regions.data})

        })
        .catch(error => {
            console.log(error.response.data);
        })
    }

    render() {
        return (
            <View style={{ borderBottomColor: "#FBBA00", borderBottomWidth : 1}}>

                <ModalSelector
                    data={this.state.regions}
                    cancelText={'Annuler'}
                    selectedKey={this.state.userRegionId}
                    keyExtractor={item => item.id}
                    labelExtractor={item => item.name}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option)=>{ this.setState({selectedRegion:option.name}), this.props.handleChange(option.id)}}>   
                    <TextInput
                        style={styles.textInput}
                        editable={false}
                        placeholderTextColor = "#808080"
                        placeholder="&#x1F50D; Rechercher..."
                        value={this.state.selectedRegion} />
                </ModalSelector>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'rgba(0,0,0, .04)',
        borderWidth: 1,
        borderColor: '#DCDCDC',
        padding: 7,
        height: 35,
        marginTop: 9,
        borderRadius: 30,
        marginBottom: 18,
        marginRight: 40,
        marginLeft: 40,
        fontSize: 15,
        

    }
})