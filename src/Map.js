import React, { Component } from 'react';
import { 
    View,Text,StyleSheet,Button
 } from 'react-native';
 import MapView from 'react-native-maps';
 import RNGooglePlaces from 'react-native-google-places';

 export default class Map extends Component {

     constructor(props){
         super(props);
         arrayMarkers=[
             {
                latitude:16.4684634,
                longitude:107.5786145,
             }
         ];
         this.state={
             region:{
                latitude:16.4684634,
                longitude:107.5786145,
                latitudeDelta: 4,
                longitudeDelta:4,
             },
             markers:arrayMarkers
         };
        }

     onPress(data){
         let latitude = data.nativeEvent.coordinate.latitude;
         let longitude = data.nativeEvent.coordinate.longitude;
         arrayMarkers.push({
            latitude:latitude,
            longitude:longitude,
         });
         this.setState({markers:arrayMarkers});
         console.log(this.state.marker);
     }
     renderMarkers(){
         markers = [];
         for (marker of this.state.markers){
             markers.push(
                <MapView.Marker key = {marker.longitude} title={'Here is: ' + marker.latitude}
                coordinate={marker}
                />
             )
         }
         return markers;
     }

     render() {
         return (
             <View style = {{flex:1}} >
                <MapView
                    style = {{flex:1}}
                    initialRegion={this.state.region}
                    onPress = {this.onPress.bind(this)}
                    >
                {this.renderMarkers()}
                </MapView>
            </View>
         );
     }
 }
