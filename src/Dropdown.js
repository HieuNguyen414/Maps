import React, { Component } from 'react';
import {Select, Option} from "react-native-chooser";

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Dropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {value : "Vui lòng chọn"}
  }
  onSelect(value, label) {
    this.setState({value : value});
  }

  render() {
    return (
      <View >
        <Select
            onSelect = {this.onSelect.bind(this)}
            defaultText  = {this.state.value}
            style = {{flex:1}}
          >
          <Option value = {{name : "Abc"}}>ABC</Option>
          <Option value = "def">DEF</Option>
          <Option value = "2">2</Option>
          <Option value = "3">3</Option>
          <Option value = "4">4</Option>
          <Option value = "5">5</Option>
          <Option value = "6">6</Option>
          <Option value = "7">7</Option>
          <Option value = "8">8</Option>

        </Select>
      </View>
    );
  }
}