import React, { useMemo, useState } from 'react';
import { router } from 'expo-router';
import {SafeAreaView,View,ScrollView,Text,StyleSheet,StatusBar,Image,TextInput, TouchableOpacity, FlatList, Platform} from 'react-native';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import LanguageToggleButton from './langToggle';
import stylesDefault from "./styles";

export default function Form() {
	const { t, i18n } = useTranslation();
	// options for "have you seen flies on flowers as pictured below?"
	const [selectedFlyIdentify, setSelectedFlyIdentify] = useState<string | undefined>();
	const flyIdentify: RadioButtonProps[] = useMemo(() => ([
		{ id: 'yes', label: t("Yes"), value: 'Yes' },
		{ id: 'no', label: t("No"), value: 'No' }
	  ]), []);

	// storing the selected date flowers were seen
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);

	const onDateChange = (event: any, selectedDate: Date | undefined) => {
		setShowDatePicker(!showDatePicker);
		if (selectedDate) setSelectedDate(selectedDate);
	};

	// options for "in what type of place did you see the flies?"
	const [selectedLocationType, setSelectedLocationType] = useState<string | undefined>();
	const locationType: RadioButtonProps[] = useMemo(() => ([
		{ id: 'park', label: t("q3Park"), value: 'Park' },
		{ id: 'bgarden', label: t("q3BotanicalGarden"), value: 'Botanical Garden' },
		{ id: 'rgarden', label: t("q3Residence"), value: 'Residence [Garden]' },
		{ id: 'farm', label: t("q3Farm"), value: 'Farm' },
		{ id: 'campus', label: t("q3SchoolCampus"), value: 'School Campus' },
		{ id: 'other', value: 'Other', label: <TextInput style={styles.locationTypeInput} placeholder={t("q3Other")}/> }
	]), [t]);

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
  	type flowerObj = {id: string, flowerName_Genus: string, flowerImg: any};
  	const flowerData = [
			{
				id: "morning_glory",
				flowerName_Genus: t("q6.1"),
				flowerImg: require("../assets/images/morning_glory.png"),
			},
			{
				id: "hibiscus",
				flowerName_Genus: t("q6.2"),
				flowerImg: require("../assets/images/hibiscus.png"),
			},
			{
				id: "jasmine",
				flowerName_Genus: t("q6.3"),
				flowerImg: require("../assets/images/brazilian_jasmine.png"),
			},
			{
				id: "ginger",
				flowerName_Genus: t("q6.4"),
				flowerImg: require("../assets/images/wild_ginger.png"),
			},
			{
				id: "angel_trumpet",
				flowerName_Genus: t("q6.5"),
				flowerImg: require("../assets/images/angels_trumpet.png"),
			},
			{
				id: "king_mantle",
				flowerName_Genus: t("q6.6"),
				flowerImg: require("../assets/images/thunbergia_erecta.png"),
			},
			{
				id: "amyrillis",
				flowerName_Genus: t("q6.7"),
				flowerImg: require("../assets/images/rednetted_amyrillis.png"),
			},
			{
				id: "garlic_vine",
				flowerName_Genus: t("q6.8"),
				flowerImg: require("../assets/images/garlic_vine.png"),
			},
			{
				id: "rhododendron",
				flowerName_Genus: t("q6.11"),
				flowerImg: require("../assets/images/rhododendron.png"),
			},
			{
				id: "zephyrlily",
				flowerName_Genus: t("q6.12"),
				flowerImg: require("../assets/images/zephyr_lily.png"),
			},
			{
				id: "other",
				flowerName_Genus: t("q6.13"),
				flowerImg: require("../assets/images/other.png"),
			},
			{
				id: "none",
				flowerName_Genus: t("q6.14"),
				flowerImg: require("../assets/images/none.png"),
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
					item.id == selectedFlower
						? { borderColor: color, borderWidth: 2, backgroundColor: "#50899140" }
						: undefined,
				]}
				onPress={() => {
					setSelectedFlower(item.id);
				}}
			>
				<Text
					style={[
						stylesDefault.text,
						{ width: "100%" },
						item.id == selectedFlower ? { color: color, fontFamily: 'NunitoSansBold' } : {},
					]}
				>
					{item.flowerName_Genus}
				</Text>
				<Image style={styles.flowerImg} source={item.flowerImg} />
			</TouchableOpacity>
		);
	};
	type timeObj= {id: number, time: string};

  	// multi-select for time of fly sighting 
	const timeData: timeObj[] = [
		{id: 0, time: t("q7.1")},
		{id: 1, time: t("q7.2")},
		{id: 2, time: t("q7.3")},
		{id: 3, time: t("q7.4")},
		{id: 4, time: t("q7.5")},
		{id: 5, time: t("q7.6")},
		{id: 6, time: t("q7.7")},
		{id: 7, time: t("q7.8")},
		{id: 8, time: t("q7.9")},
		{id: 9, time: t("q7.10")},
		{id: 10, time: t("q7.11")},
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

	// storing additional information
	const [additionalInfo, setAdditionalInfo] = useState<string>('');

	// submit form -> send data to backend/database
	const handleSubmit = async () => {
		console.log(selectedFlyIdentify, selectedLocationType, selectedDate, address, location, additionalInfo);
		router.push("/completed");
		
	};

  	return (
			<SafeAreaView style={styles.container}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginHorizontal: 25,
						paddingVertical: 5,
					}}
				>
					<TouchableOpacity onPress={() => router.push("/home")}>
						<FontAwesome
							name='arrow-left'
							style={stylesDefault.navigationIcon}
							onPress={() => router.push("/home")}
						/>
					</TouchableOpacity>
					<LanguageToggleButton />
				</View>
				<ScrollView style={styles.scrollView}>
					<View style={{ marginTop: 40 }}></View>
					<View style={styles.questionCard}>
						<Text style={stylesDefault.text}>{t("q1")}</Text>
						<Image
							source={require("../assets/images/d-elegans.png")}
							style={{ width: 250, height: 190, marginBottom: 10 }}
						/>
						<Text style={stylesDefault.subText}>{t("q1Description")}</Text>
						<View style={{ paddingLeft: 30, alignSelf: "flex-start" }}>
							<RadioGroup
								containerStyle={{
									alignItems: "flex-start",
									flexDirection: "row",
								}}
								radioButtons={flyIdentify}
								onPress={setSelectedFlyIdentify}
								selectedId={selectedFlyIdentify}
							></RadioGroup>
						</View>
					</View>
					<View style={styles.questionCard}>
						<Text style={stylesDefault.text}>{t("q2")}</Text>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text style={{ fontSize: 30 }}>📅</Text>
							{(Platform.OS === "ios" || showDatePicker) && (
								<DateTimePicker
									value={selectedDate}
									mode='date'
									display='default'
									onChange={onDateChange}
									is24Hour={true}
								/>
							)}
							{Platform.OS === "android" && (
								<TouchableOpacity
									onPress={() => setShowDatePicker(!showDatePicker)}
								>
									<Text
										style={[
											stylesDefault.text,
											{
												marginLeft: 5,
												backgroundColor: "#E7E6E6",
												borderRadius: 10,
												paddingHorizontal: 10,
												paddingVertical: 5,
											},
										]}
									>
										{selectedDate.toLocaleDateString()}
									</Text>
								</TouchableOpacity>
							)}
						</View>
					</View>
					<View style={styles.questionCard}>
						<Text style={stylesDefault.text}>{t("q3")}</Text>
						<RadioGroup
							containerStyle={styles.radioButtons}
							radioButtons={locationType}
							onPress={setSelectedLocationType}
							selectedId={selectedLocationType}
						></RadioGroup>
					</View>
					<View style={styles.questionCard}>
						<Text style={stylesDefault.text}>{t("q4")}</Text>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text style={{ fontSize: 20 }}>🏡</Text>
							<TextInput
								style={styles.nameAddressInput}
								placeholder={t("q4Box")}
								value={address}
								onChangeText={setAddress}
							/>
						</View>
					</View>
					<View style={[styles.questionCard]}>
						<Text style={stylesDefault.text}>{t("q5")}</Text>
						<Text style={stylesDefault.subText}>{t("q5Description")}</Text>
						<View
							style={{
								flexDirection: "column",
								alignItems: "center",
								gap: 10,
								width: "100%",
							}}
						>
							{/* <MapView
								style={styles.map}
								showsUserLocation={true}
								onPress={handleMapPress}
								initialRegion={{
									latitude: location.latitude,
									longitude: location.longitude,
									latitudeDelta: 0.0922,
									longitudeDelta: 0.0421,
								}}
							>
								<Marker coordinate={location} />
							</MapView> */}
							<TouchableOpacity
								style={[
									stylesDefault.button,
									{
										backgroundColor: "#508991",
										shadowOpacity: 0,
										width: "100%",
										elevation: 0,
									},
								]}
								onPress={handleLocateMe}
							>
								<Text style={[stylesDefault.buttonText, { color: "#FEFEFE" }]}>
									{t("q5LocateMe")}
								</Text>
							</TouchableOpacity>
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<Text style={{ fontSize: 20 }}>📍</Text>
								<TextInput
									style={styles.nameAddressInput}
									placeholder={t("q5Coordinates")}
									value={coordsText}
									editable={false}
								/>
							</View>
						</View>
					</View>
					<View style={styles.questionCard}>
						<Text style={stylesDefault.text}>{t("q6")}</Text>
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
						<Text style={stylesDefault.text}>{t("q7")}</Text>
						{timeData.map((timeItem) => (
							<View key={timeItem.id} style={styles.checkItem}>
								<Checkbox
									onValueChange={() => toCheck(timeItem)}
									value={isChecked.at(timeItem.id)}
									color={isChecked ? "#508991" : "black"}
								/>
								<Text style={[stylesDefault.text, { marginLeft: 10 }]}>
									{timeItem.time}
								</Text>
							</View>
						))}
					</View>
					<View style={styles.questionCard}>
						<Text style={stylesDefault.text}>{t("q8")}</Text>
						<TouchableOpacity
							style={[
								stylesDefault.button,
								{
									backgroundColor: "#508991",
									width: "100%",
									shadowOpacity: 0,
									elevation: 0,
								},
							]}
							onPress={pickImage}
						>
							<Text style={[stylesDefault.buttonText, { color: "#FEFEFE" }]}>
								{image ? t("q8Reupload") : t("q8Upload")}
							</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.questionCard}>
						<Text style={stylesDefault.text}>{t("q9")}</Text>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<TextInput
								multiline
								style={styles.additionInfoInput}
								onChangeText={setAdditionalInfo}
							/>
						</View>
					</View>
					<TouchableOpacity
						style={[
							stylesDefault.button,
							{
								width: "100%",
								marginBottom: 20,
								height: 50,
							},
						]}
						onPress={handleSubmit}
					>
						<Text style={[stylesDefault.buttonText, { color: "#1E314F" }]}>
							{t("Submit")}
						</Text>
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
		paddingHorizontal: 20,
	},
	questionCard: {
		flex: 1,
		gap: 10,
		backgroundColor: "#F5F5F5",
		borderRadius: 20,
		paddingHorizontal: "10%",
		paddingVertical: 25,
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
	radioButtons: {
		marginLeft: 30,
		alignSelf: "flex-start",
		alignItems: "flex-start",
		flexDirection: "column",
	},
	locationTypeInput: {
		borderWidth: 1,
		borderColor: "#ccc",
		paddingVertical: 2,
		paddingHorizontal: 5,
		marginLeft: 10,
		borderRadius: 5,
		width: 150,
		color: "black",
	},
	nameAddressInput: {
		borderWidth: 1,
		borderColor: "#ccc",
		paddingVertical: 2,
		paddingHorizontal: 5,
		marginLeft: 10,
		borderRadius: 5,
		width: 250,
		color: "black",
	},
	map: {
		width: 275,
		height: 190,
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
	checkItem: {
		flexDirection: "row",
		width: 270,
	},
	checkBox: {
		borderColor: "black",
	},
});
