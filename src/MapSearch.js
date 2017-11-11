import React, {Component} from 'react';
import {
	AppRegistry, 
	StyleSheet, 
	Text, 
	View, 
	TextInput,
	ListView,
	TouchableHighlight,
	Dimensions
} from 'react-native';
var {height, width} = Dimensions.get('window');
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import Geocoder from 'react-native-geocoder';

var placesArray = [];
var History = ['someWhere', 'someWhere Neh', 'someWhere'];

export default class MapViewClass extends Component {
  constructor(props){
    super(props);
	var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	
    this.state = {
		region: {
			latitude: 16.4684634,
			longitude: 107.5786145,
			latitudeDelta: 3,
			longitudeDelta: 3,
		},
		dataSource: dataSource.cloneWithRows(placesArray),
		isLoading:true,
		isMarkerShow:false,
		Address:'',
			
		};
		this.onRegionChange = this.onRegionChange.bind(this);
	}

	onRegionChange(region) {
		this.setState({ region });
	}
  
	onSearch(text){
		RNGooglePlaces.getAutocompletePredictions(text)
		.then((places) => {this.onChange(places);})
		.catch((error) => console.log(error.message));
	}
	
	onMove(region)
	{
		this.setState({
			region:this.state.region,
			dataSource:this.state.dataSource,
			isLoading:true,
			isMarkerShow:false,
			Address:'',
		});
		this.onRegionChange(region);
	}
	
  	onChange(places)
	{
		this.setState({
			region:this.state.region,
			dataSource:this.state.dataSource.cloneWithRows(places),
			isLoading:false,
			isMarkerShow:false,
			Address:'',
		});
		this.onRegionChange(this.state.region);
	}
  
	onPickPlaces(places)
	{
		RNGooglePlaces.lookUpPlaceByID(places.placeID)
		.then((results) => {
			var region = {
				latitude: results.latitude,
				longitude: results.longitude,
				latitudeDelta: 3,
				longitudeDelta: 3,
			};
			this.onMove(region)
						})
		.catch((error) => console.log(error.message));
	}
	
	onMarkerPress(coordinate)
	{
		var Co = {
			  lat: coordinate.latitude,
			  lng: coordinate.longitude
			};
		Geocoder.geocodePosition(Co)
		.then((res) => {
			console.log(res);
			this.setState({
				region:this.state.region,
				dataSource:this.state.dataSource,
				isLoading:true,
				isMarkerShow:true,
				Address:res[0].formattedAddress,
			});
			this.onRegionChange(this.state.region);
		})
		.catch(err => console.log(err))
	}
	
    renderRow(rowData, sectionID, rowID) {
 	return (
    	<TouchableHighlight 
			onPress={()=>this.onPickPlaces(rowData)}
			underlayColor='#dddddd' 
			style={{height:44}}>
			<View>
				<Text style={{fontSize: 16, color: '#000000'}} numberOfLines={1}>{rowData.fullText}</Text>
				<View style={{height: 1, backgroundColor: '#dddddd'}}/>
			</View>
    	</TouchableHighlight>
		);
	}

	render() 
	{
		var currentView = 
			(this.state.isLoading)?
				<View/>:
				<ListView 
					dataSource={this.state.dataSource} 
					renderRow={this.renderRow.bind(this)} 
					enableEmptySections={true}
				/>
		var History = 
			(this.state.isMarkerShow)?
				<Text>{this.state.Address}</Text>:
				<View/>
				
		return (
		  <View style={styles.container}>
		  
			<View>
				<TextInput underlineColorAndroid='transparent' style={styles.input}
					onChangeText={(text)=>this.onSearch(text)}
					placeholder='Tìm kiếm'>
				</TextInput>
				<TextInput underlineColorAndroid='transparent' style={styles.input}
					onChangeText={(text)=>this.onSearch(text)}
					placeholder='Tìm kiếm2'>
				</TextInput>
					{currentView}
					{History}
			</View>
			
			<MapView style={styles.map}
			  region={this.state.region}
			>

			<MapView.Marker draggable
			   coordinate={this.state.region}
			   onDragEnd={(e)=>this.setState({x: e.nativeEvent.coordinate})}
			   onPress={(e) => {e.stopPropagation(); this.onMarkerPress(this.state.region)}}
			 />
			</MapView>
		  </View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map:{
	flex:1,
	justifyContent: 'center',
    alignItems: 'center',
  },
  searchbox:{
	alignItems:'center',
	marginBottom:0,
	paddingBottom:0,
	alignSelf:'stretch',
	borderWidth:1,
	borderColor:'#fff',
	backgroundColor:'#fff',
  },
  input:{
	width:width,
	fontSize:16,
	height:40,
	backgroundColor:'#fff',
  },
});