import React, { useMemo, useState } from 'react';
import {SafeAreaView,View,ScrollView,Text,StyleSheet,StatusBar,Image,TextInput, TouchableOpacity, FlatList} from 'react-native';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
// documentation for radio buttons: https://www.npmjs.com/package/react-native-radio-buttons-group
import DateTimePicker from '@react-native-community/datetimepicker';
import { ResizeMode } from 'expo-av';
import Checkbox from 'expo-checkbox';
 // documentation for checkbox: https://docs.expo.dev/versions/latest/sdk/checkbox/
import * as ImagePicker from "expo-image-picker";
// documentation for date picker: https://github.com/react-native-datetimepicker/datetimepicker?tab=readme-ov-file
import MapView, {Marker, MapPressEvent} from 'react-native-maps';
// documentation for map view: https://docs.expo.dev/versions/latest/sdk/map-view/
import * as Location from 'expo-location';

export default function Form() {
	// options for "have you seen flies on flowers as pictured below?"
	const [selectedFlyIdentify, setSelectedFlyIdentify] = useState<string | undefined>();
	const flyIdentify: RadioButtonProps[] = useMemo(() => ([
		{ id: 'yes', label: 'Yes', value: 'Yes' },
		{ id: 'no', label: 'No', value: 'No' }
	  ]), []);
	// options for "in what type of place did you see the flies?"
	const [selectedLocationType, setSelectedLocationType] = useState<string | undefined>();
	const locationType: RadioButtonProps[] = useMemo(() => ([
		{ id: 'park', label: 'Park', value: 'Park' },
		{ id: 'bgarden', label: 'Botanical Garden', value: 'Botanical Garden' },
		{ id: 'rgarden', label: 'Residence [Garden]', value: 'Residence [Garden]' },
		{ id: 'farm', label: 'Farm', value: 'Farm' },
		{ id: 'campus', label: 'School Campus', value: 'School Campus' },
		{ id: 'other', value: 'Other', label: <TextInput style={styles.locationTypeInput} placeholder="Other"/> }
	]), []);

	// storing the selected date flowers were seen
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const onDateChange = (event: any, selectedDate: Date | undefined) => {
		if (selectedDate) setSelectedDate(selectedDate);
	};

	// storing given address/location
	const [address, setAddress] = useState<string>('');

	// storing coordinates for location of fly sighting
	const [location, setLocation] = useState({ latitude: 37.78825, longitude: -122.4324 });
	const [coordsText, setCoordsText] = useState<string>('');
	const handleLocateMe = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if(status !== 'granted') {
			alert('Permission to access location was denied');
			return;
		}

		let userLocation = await Location.getCurrentPositionAsync({});
		const { latitude, longitude } = userLocation.coords;
		setLocation({ latitude, longitude });
		setCoordsText(`${latitude}, ${longitude}`);
	};
	const handleMapPress = (event: MapPressEvent) => {
		const { latitude, longitude } = event.nativeEvent.coordinate;
		setLocation({ latitude, longitude });
		setCoordsText(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
	};
	

	// all flower options
  	type flowerObj = {id: string, flowerName: string, flowerGenus: string, flowerImg: any};
  	const flowerData = [
		{ id: "morning_glory", flowerName: "Morning Glory", flowerGenus: "genus Ipomoea",
			flowerImg: require("../assets/images/morning_glory.png"),
		},
		{ id: "hibiscus", flowerName: "Hibiscus", flowerGenus: "genus Hibiscus",
			flowerImg: require("../assets/images/hibiscus.png"),
		},
		{ id: "jasmine", flowerName: "Brazilian Jasmine", flowerGenus: "genus Mandevilla",
			flowerImg: require("../assets/images/brazilian_jasmine.png"),
		},
		{ id: "ginger", flowerName: "Wild Ginger", flowerGenus: "genus Alpinia",
			flowerImg: require("../assets/images/wild_ginger.png"),
		},
		{ id: "angel_trumpet", flowerName: "Angel's Trumpet", flowerGenus: "genus Brugmansia",
			flowerImg: require("../assets/images/angels_trumpet.png"),
		},
		{ id: "king_mantle", flowerName: "Bush Clock Vine/ King's Mantle", flowerGenus: "genus Thunbergia Erecta",
			flowerImg: require("../assets/images/thunbergia_erecta.png"),
		},
		{ id: "amyrillis", flowerName: "Red-Netted Amyrillis", flowerGenus: "Hippeaestrum",
			flowerImg: require("../assets/images/rednetted_amyrillis.png"),
		},
		{ id: "garlic_vine", flowerName: "Garlic Vine", flowerGenus: "genus Mansoa",
			flowerImg: require("../assets/images/garlic_vine.png"),
		},
		{ id: "rhododendron", flowerName: "Rhododendron", flowerGenus: "genus Rhododendron",
			flowerImg: require("../assets/images/rhododendron.png"),
		},
		{ id: "zephyr_lily", flowerName: "Rosepink Zephyr Lily/ Pink Rain Lily", flowerGenus: "genus Zephyrlily",
			flowerImg: require("../assets/images/zephyr_lily.png"),
		},
	];
	const [selectedFlower, setSelectedFlower] = useState<string|undefined>();
  
	// render all flower options
	const renderItem = ({ item }: { item: flowerObj }) => {
		const color = item.id === selectedFlower ? "#508991" : "black";
		return (
			<TouchableOpacity
				style={[
					styles.flowerCard,
					item.id == selectedFlower ? { borderColor: color } : undefined,
				]}
				onPress={() => {
					setSelectedFlower(item.id);
					console.log(item.id);
				}}>
				<Text
					style={[
						styles.text,
						{ width: "100%" },
						item.id == selectedFlower ? { color: color } : {},
					]}>
					{item.flowerName} ({item.flowerGenus})
				</Text>
				<Image style={styles.flowerImg} source={item.flowerImg} />
			</TouchableOpacity>
		);
	};
	type timeObj= {id: number, time: string};

  	// multi-select for time of fly sighting 
	const timeData: timeObj[] = [
		{id: 0, time: "12AM - 4AM"},
		{id: 1, time: "4AM - 6AM"},
		{id: 2, time: "6AM - 8AM"},
		{id: 3, time: "8AM - 10AM"},
		{id: 4, time: "10AM - 12PM"},
		{id: 5, time: "12PM - 2PM"},
		{id: 6, time: "2PM - 4PM"},
		{id: 7, time: "4PM - 6PM"},
		{id: 8, time: "6PM - 8PM"},
		{id: 9, time: "8PM - 10PM"},
		{id: 10, time: "10PM - 12PM"},
	];
	const [isChecked, setChecked] = useState(new Array(timeData.length).fill(false));
	function toCheck (timeItem: timeObj) {setChecked(isChecked.map((e, idx) => (idx === timeItem.id ? !e : e)));}

  // ImagePicker -----------------------------
  const [image, setImage] = useState<string | null>(null);
  const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) setImage(result.assets[0].uri);
  };

  return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<View style={{ marginTop: 40 }}></View>
				<View style={styles.questionCard}>
					<Text style={styles.text}>
						Have you seen flies on flowers as pictured below?
					</Text>
					<Image
						source={require("../assets/images/d-elegans.png")}
						style={{ width: 250, height: 190, marginBottom: 10 }}
					/>
					<Text style={styles.subtext}>
						The males of this species have black spots on their wings. The
						females do not. The flies are about 2 mm long.
					</Text>
					<View style={{ paddingLeft: 30, alignSelf: "flex-start" }}>
						<RadioGroup
							containerStyle={{ alignItems: "flex-start", flexDirection: "row"}}
							radioButtons={flyIdentify}
							onPress={setSelectedFlyIdentify}
							selectedId={selectedFlyIdentify}>
						</RadioGroup>
					</View>
				</View>
				<View style={styles.questionCard}>
					<Text style={styles.text}>
						Please enter the date on which you saw the flies.
					</Text>
					<View style={{ flexDirection: "row", alignItems: "flex-start" }}>
						<Text style={{ fontSize: 30 }}>📅</Text>
						<DateTimePicker
							value={selectedDate}
							mode="date"
							display="default"
							onChange={onDateChange}
							is24Hour={true}/>
					</View>
				</View>
				<View style={styles.questionCard}>
					<Text style={styles.text}>
						In what type of place did you see the flies?
					</Text>
					<RadioGroup
						containerStyle={styles.radioButtons}
						radioButtons={locationType}
						onPress={setSelectedLocationType}
						selectedId={selectedLocationType}>
					</RadioGroup>
				</View>
				<View style={styles.questionCard}>
					<Text style={styles.text}>
						Please enter the name of the place [e.g. name of the park] or the
						address where you saw the flies.
					</Text>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text style={{ fontSize: 20 }}>🏡</Text>
						<TextInput
							style={styles.nameAddressInput}
							placeholder="Name / Address"
							value={address}
							onChangeText={setAddress}/>
					</View>
				</View>
				<View style={styles.questionCard}>
					<Text style={styles.text}>
						Please select the geographical coordinates of the location where you
						saw the flies.
					</Text>
					<Text style={styles.subtext}>
						Tap "Locate Me" to get your current location, or select location manually on the map.
					</Text>
					<View style={{ flexDirection: "column", alignItems: "center" }}>
						<MapView
							style={styles.map}
							showsUserLocation={true}
							onPress={handleMapPress}
							initialRegion={{
								latitude: location.latitude,
								longitude: location.longitude,
								latitudeDelta: 0.0922,
								longitudeDelta: 0.0421,
							}}>
							<Marker coordinate={location} />
						</MapView>
						<TouchableOpacity style={styles.locateButton} onPress={handleLocateMe}>
							<Text style={styles.buttonText}>Locate Me</Text>
						</TouchableOpacity>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text style={{ fontSize: 20 }}>📍</Text> 
							<TextInput
								style={styles.nameAddressInput}
								placeholder="Coordinates"
								value={coordsText}
								editable={false}/>
						</View>
					</View>
				</View>
				<View style={styles.questionCard}>
					<Text style={styles.text}>
						On which flower did you see the flies?
					</Text>
					<FlatList
					  data={flowerData}
					  renderItem={renderItem}
					  keyExtractor={(item) => item.id}
					  horizontal={false}
					  numColumns={2}
					  scrollEnabled={false}
					  columnWrapperStyle={{ justifyContent: "space-between" }}
					  contentContainerStyle={{ paddingBottom: 20 }}
					/>
				</View>
				<View style={styles.questionCard}>
					<Text style={styles.text}>
						What time of day did you see the flies? Please check all times when
						you saw them.
					</Text>
					{timeData.map((timeItem) => (
						<View key={timeItem.id} style={styles.checkItem}>
							<Checkbox
								onValueChange={() => toCheck(timeItem)}
								value={isChecked.at(timeItem.id)}
								color={isChecked ? "#508991" : "black"}
							/>
							<Text style={[styles.text, { marginLeft: 10 }]}>
								{timeItem.time}
							</Text>
						</View>
					))}
				</View>
				<View style={styles.questionCard}>
					<Text style={styles.text}>
						If you took a picture of the flies, please upload it here.
					</Text>
					<TouchableOpacity style={styles.button} onPress={pickImage}>
						<Text style={styles.buttonText}>
							{image ? "Reupload" : "Upload"}
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.questionCard}>
					<Text style={styles.text}>
						Please add any information that might be helpful to the researchers.
					</Text>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<TextInput multiline style={styles.additionInfoInput} />
					</View>
				</View>
				<TouchableOpacity
					style={[
						styles.button,
						{ alignSelf: "center", width: "100%", backgroundColor: "#FFE7C3" },
					]}>
					<Text style={[styles.buttonText, { color: "#1E314F" }]}>Submit Form</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: "white",
	},
	scrollView: {
		marginHorizontal: 20,
	},
	questionCard: {
		flex: 1,

		backgroundColor: "#F5F5F5",
		borderRadius: 20,
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
		// Shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 1,
		// Shadow for Android
		elevation: 2,
	},
	text: {
		width: 270,
		fontSize: 18,
		marginBottom: 10,
		fontFamily: "NunitoSansMedium",
	},
	subtext: {
		width: 250,
		fontSize: 13,
		fontFamily: "NunitoSansRegular",
		marginBottom: 10,
	},
	radioButtons: {
		marginLeft: 30,
		alignSelf: "flex-start",
		alignItems: "flex-start",
		flexDirection: "column",
	},
	locationTypeInput: {
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 8,
		marginLeft: 10,
		borderRadius: 5,
		width: 150,
		color: "black",
	},
	nameAddressInput: {
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 8,
		marginLeft: 10,
		borderRadius: 5,
		width: 250,
		color: "black",
	},
	map: {
		width: 275,
		height: 190,
		marginBottom: 10,
	},
	flowerCard: {
		width: "45%",
		margin: 5,
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 8,
		borderRadius: 5,
	},
	flowerImg: {
		width: "100%",
		height: 100,
		flex: 1,
		borderRadius: 5,
		resizeMode: ResizeMode.COVER,
	},
	additionInfoInput: {
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 8,
		borderRadius: 5,
		width: 270,
		height: 100,
		color: "black",
		fontSize: 18,
	},
	button: {
		width: 270,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		backgroundColor: "#508991",
	},
	locateButton: {
		backgroundColor: '#508991',
		padding: 10,
		borderRadius: 10,
		marginBottom: 10,
		alignItems: 'center',
	},
	buttonText: {
		color: "#FEFEFE",
		textAlign: "center",
		fontFamily: "NunitoSansBold",
		fontSize: 18,
  },
  checkItem: {
    flexDirection: "row",
    width: 270,
  },
  checkBox: {
	  borderColor: 'black',
  }
});
