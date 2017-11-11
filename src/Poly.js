/**
 * link: https://medium.com/@ali_oguzhan/react-native-maps-with-google-directions-api-bc716ed7a366
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';

export default class RnDirectionsApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: []
    }
  }
// lấy điểm đi và điểm đến
  componentDidMount() {
    this.getDirections("16.356986,107.683087", "16.4498327,107.4922943")
  }
  async getDirections(startLoc, destinationLoc) {
    try {
      // fetch api 
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return{
            latitude : point[0],
            longitude : point[1]
        }
      })
      this.setState({coords: coords})
      return coords
        } catch(error) {
            alert(error)
            return error
        }
      } 

  render() {
    return (
      <View style = {{flex:1}}>
        <MapView style={{flex:1}} 
          initialRegion={{
            latitude:16.4498327, 
            longitude:107.4922943, 
            latitudeDelta: 0.5,  
            longitudeDelta: 0.5
        }}>
        
        <MapView.Polyline 
            strokeWidth ={3}
            coordinates={this.state.coords}
            strokeWidth={7}
            strokeColor="red"/>
        </MapView>
      </View>
    );
  }
}
