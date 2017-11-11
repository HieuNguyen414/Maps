import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

export default class Geo extends Component {
    constructor(props){
        super(props);
        this.state = {
            region:{
                latitude:16.4684634,
                longitude:107.5786145,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }, 
            marker:{
                latitude:20, 
                longitude:105
            }
        }
    }
    componentWillMount(){
        navigator.geolocation.getCurrentPosition((position) =>{
        this.setState({
            region:{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude,
            latitudeDelta:0.01,
            longitudeDelta:0.01,
        },
        marker:{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        }
        })
        },
        (error) => console.log(error),
        {enableHighAccuracy:true, timeout: 20000, maximumAge:1000}
    )
    }
    render() {
        return (
            <View style = {{flex:1}}>
                <MapView
                    style = {{flex:1}}
                    initialRegion={this.state.region}
                    >
                   <MapView.Marker coordinate = {this.state.marker}/>
                </MapView>
            </View>
        );
    }
}