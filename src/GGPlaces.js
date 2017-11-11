import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

export default class  extends Component {
    openSearchModal() {
        RNGooglePlaces.openAutocompleteModal(
            {
                latitude: 16.4684634,
                longitude: 107.5786145,
                radius: 10
            } 
        )
        .then((place) => {
            console.log(place);
        })
        .catch(error => console.log(error.message));  
      }
    
    render() {
        return (
            <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => this.openSearchModal()}
                    >
                    <Text>Pick a Place</Text>
                    </TouchableOpacity>
                
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    }
})