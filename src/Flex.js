import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet } from 'react-native';

export default class  extends Component {
    render() {
        return (
            <View style = {{flex:1, flexDirection:'column'}}>
                <View style = {{flex:1, backgroundColor:'red'}}></View>
                <View style = {{flex:1, backgroundColor:'blue'}}></View>
                <View style = {{flex:2, backgroundColor:'white'}}></View>
                <View style = {{flex:1, backgroundColor:'yellow'}}></View>
            </View>
        );
    }
}