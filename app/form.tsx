import React, { useEffect, useMemo, useState } from 'react';
import { router } from 'expo-router';
import {SafeAreaView,View,ScrollView,Text,StyleSheet,StatusBar,Image,TextInput, TouchableOpacity, FlatList, Platform, Alert} from 'react-native';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
// documentation for radio buttons: https://www.npmjs.com/package/react-native-radio-buttons-group
import DateTimePicker from '@react-native-community/datetimepicker';
import { ResizeMode } from 'expo-av';
import Checkbox from 'expo-checkbox';
 // documentation for checkbox: https://docs.expo.dev/versions/latest/sdk/checkbox/
import * as ImagePicker from "expo-image-picker";
// documentation for date picker: https://github.com/react-native-datetimepicker/datetimepicker?tab=readme-ov-file
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// documentation for map view: https://docs.expo.dev/versions/latest/sdk/map-view/
import * as Location from 'expo-location';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import LanguageToggleButton from './langToggle';
import Loading from "./loading";
import stylesDefault from "./styles";
import { useGuest } from "./guestContext";

import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebaseConfig";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import { firebase } from '@react-native-firebase/firestore';
import { FontAwesome5 } from '@expo/vector-icons';


export default function Form() {
	const { isGuest, setIsGuest } = useGuest();

	const [isLoading, setIsLoading] = useState(false);
	const startTime = Date.now();
	
	const { t, i18n } = useTranslation();
	// options for "have you seen flies on flowers as pictured below?"
	const [selectedFlyIdentify, setSelectedFlyIdentify] = useState<
		string | undefined
	>();
	const flyIdentify: RadioButtonProps[] = useMemo(
		() => [
			{
				id: "yes",
				label: t("Yes"),
				value: "Yes",
				borderColor: "#1E314F",
				color: "#508991",
				size: 20,
			},
			{
				id: "no",
				label: t("No"),
				value: "No",
				borderColor: "#1E314F",
				color: "#508991",
				size: 20,
			},
		],
		[]
	);

	// storing the selected date flowers were seen
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);

	const onDateChange = (event: any, selectedDate: Date | undefined) => {
		setShowDatePicker(!showDatePicker);
		if (selectedDate) setSelectedDate(selectedDate);
	};

	// options for "in what type of place did you see the flies?"
	const [selectedLocationType, setSelectedLocationType] = useState<
		string | undefined
	>();
	const locationType: RadioButtonProps[] = useMemo(
		() => [
			{
				id: "park",
				label: t("q3Park"),
				value: "Park",
				borderColor: "#1E314F",
				color: "#508991",
				size: 20,
			},
			{
				id: "bgarden",
				label: t("q3BotanicalGarden"),
				value: "Botanical Garden",
				borderColor: "#1E314F",
				color: "#508991",
				size: 20,
			},
			{
				id: "rgarden",
				label: t("q3Residence"),
				value: "Residence [Garden]",
				borderColor: "#1E314F",
				color: "#508991",
				size: 20,
			},
			{
				id: "farm",
				label: t("q3Farm"),
				value: "Farm",
				borderColor: "#1E314F",
				color: "#508991",
				size: 20,
			},
			{
				id: "campus",
				label: t("q3SchoolCampus"),
				value: "School Campus",
				borderColor: "#1E314F",
				color: "#508991",
				size: 20,
			},
			{
				id: "other",
				value: "Other",
				label: (
					<TextInput
						style={styles.locationTypeInput}
						placeholder={t("q3Other")}
					/>
				),
				borderColor: "#1E314F",
				color: "#508991",
				size: 20,
			},
		],
		[t]
	);

	// storing given address/location
	const [address, setAddress] = useState<string>("");

	// storing coordinates for location of fly sighting
	const [location, setLocation] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
	});
	const [coordsText, setCoordsText] = useState<string>("");
	const handleLocateMe = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
		  alert("Permission to access location was denied");
		  return;
		}
	
		let userLocation = await Location.getCurrentPositionAsync({});
		const { latitude, longitude } = userLocation.coords;
		setLocation({ latitude, longitude });
		setCoordsText(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
	  };
	const handleMapPress = (event: any) => {
		const { latitude, longitude } = event.nativeEvent.coordinate;
		setLocation({ latitude, longitude });
		setCoordsText(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
	};

	// all flower options
	type flowerObj = { id: string; flowerName_Genus: string; flowerImg: any };
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
	const [selectedFlower, setSelectedFlower] = useState<string | undefined>();

	// render all flower options
	const renderItem = ({ item }: { item: flowerObj }) => {
		const color = item.id === selectedFlower ? "#508991" : "black";
		return (
			<TouchableOpacity
				style={[
					styles.flowerCard,
					item.id == selectedFlower
						? {
							borderColor: color,
							borderWidth: 2,
							backgroundColor: "#50899140",
						  }
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
						item.id == selectedFlower
							? { color: color, fontFamily: "NunitoSansBold" }
							: {},
					]}
				>
					{item.flowerName_Genus}
				</Text>
				<Image style={styles.flowerImg} source={item.flowerImg} />
			</TouchableOpacity>
		);
	};
	type timeObj = { id: number; time: string };

	// multi-select for time of fly sighting
	const timeData: timeObj[] = [
		{ id: 0, time: t("q7.1") },
		{ id: 1, time: t("q7.2") },
		{ id: 2, time: t("q7.3") },
		{ id: 3, time: t("q7.4") },
		{ id: 4, time: t("q7.5") },
		{ id: 5, time: t("q7.6") },
		{ id: 6, time: t("q7.7") },
		{ id: 7, time: t("q7.8") },
		{ id: 8, time: t("q7.9") },
		{ id: 9, time: t("q7.10") },
		{ id: 10, time: t("q7.11") },
	];
	const [isChecked, setChecked] = useState(
		new Array(timeData.length).fill(false)
	);
	function toCheck(timeItem: timeObj) {
		setChecked(isChecked.map((e, idx) => (idx === timeItem.id ? !e : e)));
	}

	// Image Picker
	const [image, setImage] = useState<string | null>(null);
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: .5,
		});
		if (!result.canceled) setImage(result.assets[0].uri);

	};


	const uploadImageToFirebase = async (
		uri: string,
		uid: string
	): Promise<string | null> => {
		try {
			const response = await fetch(uri);
			const blob = await response.blob();

			const filename = `images/${uid}/${Date.now()}-${Math.random()
				.toString(36)
				.substring(7)}.jpg`;
			
	// 		ImageResizer.createResizedImage(
	// 			uri,
	// 			newWidth,
	// 			newHeight,
	// 			'JPEG',
	// 			50,
	// 			0,
	// 			filename
	// 		)
	// 			.then((response) => {
	// 				// response.uri is the URI of the new image that can now be displayed, uploaded...
	// 				// response.path is the path of the new image
	// 				// response.name is the name of the new image with the extension
	// 				// response.size is the size of the new image
	// 			})
	// 			.catch((err) => {
	// 				// Oops, something went wrong. Check that the filename is correct and
	// 				// inspect err to get more details.
	// 			});
			
			const storageRef = ref(storage, filename);
			console.log(filename);
			const uploadTask = uploadBytesResumable(storageRef, blob);

			return new Promise((resolve, reject) => {
				uploadTask.on(
					"state_changed",
					(snapshot) => {
						// Track upload progress
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log(`Upload is ${progress}% done`);
					},
					(error) => {
						// Handle unsuccessful uploads and show error alert
						console.error("Upload error:", error);
						setIsLoading(false);
						Alert.alert(
							"Upload Error",
							"Failed to upload image. Please try again."
						);
						reject(error);
					},
					async () => {
						// Handle successful uploads and get the download URL
						const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
						console.log("Download URL:", downloadURL);
						resolve(downloadURL);
					}
				);
			});
		} catch (error) {
			console.error("Detailed upload error:", error);
			setIsLoading(false);
			Alert.alert(
				"Upload Error",
				"An unknown error occurred while uploading the image."
			);
			return null;
		}
	};




	// storing additional information
	const [additionalInfo, setAdditionalInfo] = useState<string>("");


	// submit form -> send data to backend/database
	const handleSubmit = async () => {
		if (
			!selectedFlyIdentify ||
			!selectedDate ||
			!selectedLocationType ||
			!location ||
			!selectedFlower ||
			!isChecked.some((checked) => checked)
		) {
			alert(t("fieldsRequired"));
			return;
		}
		if (Date.now() - startTime < 15000) { // if user completed form in less than 15s
			alert(t("slowDown"));
			return;
		}
		setIsLoading(true);
		try {
			const user = auth.currentUser;
			const userID = user ? user.uid : "Guest";
			const userDoc = await getDoc(doc(db, "Users", userID));
			
			// Attempt to upload image if selected
			let imageUrl: string | null = null;
			if (image) {
				try {
					imageUrl = await uploadImageToFirebase(image, userID);
				} catch (uploadError) {
					console.error("Image upload failed:", uploadError);
					setIsLoading(false);
					Alert.alert(
						"Image Upload Failed",
						"Failed to upload image, but we can still submit the form without it. Would you like to continue?",
						[
							{ text: "Cancel", style: "cancel" },
							{
								text: "Continue",
								onPress: () => submitData(userID, userDoc, null),
							},
						]
					);
					return;
				}
			}

			await submitData(userID, userDoc, imageUrl);
		} catch (error) {
			console.error("Submission error:", error);
			setIsLoading(false);
			Alert.alert(
				"Submission Failed",
				"Failed to submit form. Please try again."
			);
		}
	};

	const submitData = async (
		userID: string,
		userDoc: any,
		imageUrl: string | null
	) => {
		if (userDoc.exists()) {
			const newSubmissionCount = 1 + userDoc.data().submissionCount;
			const submissionId = `${newSubmissionCount}`;

			await setDoc(doc(db, "Users", userID, "Submissions", submissionId), {
				locationType: selectedLocationType,
				date: selectedDate,
				address: address,
				coordinates: location,
				flowerType: selectedFlower,
				times: timeData.filter((e) => isChecked[e.id]).map((e) => e.time),
				image: imageUrl,
				additionalInfo: additionalInfo,
				submittedAt: new Date(),
			});

			await updateDoc(doc(db, "Users", userID), {
				submissionCount: newSubmissionCount,
			});
			router.replace("/completed");
		} else {
			throw new Error("User ID not found");
		}
		setIsLoading(false);
	}

	return (
		<SafeAreaView style={styles.container}>
			{isLoading && <Loading/>}
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					marginHorizontal: 25,
					paddingVertical: 5,
				}}
			>
				<TouchableOpacity onPress={() => router.replace("/home")}>
					<FontAwesome
						name='arrow-left'
						style={stylesDefault.navigationIcon}
						onPress={() => router.replace("/home")}
					/>
				</TouchableOpacity>
				<LanguageToggleButton />
			</View>
			<ScrollView style={styles.scrollView}>
				<View style={{ marginTop: 40 }}></View>
				<View style={styles.questionCard}>
					<Text style={stylesDefault.text}>
						{t("q1")}
						<Text style={{ color: "red", fontSize: 17 }}> *</Text>
					</Text>
					<Image
						source={require("../assets/images/d-elegans.png")}
						style={{ width: "100%", height: 250 }}
					/>
					<Text style={stylesDefault.subText}>{t("q1Description")}</Text>
					<View style={{ width: "100%", alignItems: "center" }}>
						<RadioGroup
							containerStyle={{
								flexDirection: "row",
								justifyContent: "center",
							}}
							radioButtons={flyIdentify}
							onPress={setSelectedFlyIdentify}
							selectedId={selectedFlyIdentify}
						></RadioGroup>
					</View>
				</View>
				<View style={styles.questionCard}>
					<Text style={stylesDefault.text}>
						{t("q2")}
						<Text style={{ color: "red", fontSize: 17 }}> *</Text>
					</Text>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
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
								style={[
									styles.inputContainer,
									{ width: "60%", justifyContent: "center" },
								]}
								onPress={() => setShowDatePicker(!showDatePicker)}
							>
								<FontAwesome5 name='calendar-day' style={styles.inputIcon} />
								<Text style={[stylesDefault.text, { width: "auto" }]}>
									{selectedDate.toLocaleDateString()}
								</Text>
							</TouchableOpacity>
						)}
					</View>
				</View>
				<View style={styles.questionCard}>
					<Text style={stylesDefault.text}>
						{t("q3")}
						<Text style={{ color: "red", fontSize: 17 }}> *</Text>
					</Text>
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
						<TextInput
							style={styles.nameAddressInput}
							placeholder={t("q4Box")}
							value={address}
							onChangeText={setAddress}
						/>
					</View>
				</View>
				<View style={[styles.questionCard]}>
					<Text style={stylesDefault.text}>
						{t("q5")}
						<Text style={{ color: "red", fontSize: 17 }}> *</Text>
					</Text>
					<Text style={stylesDefault.subText}>{t("q5Description")}</Text>
					<View
						style={{
							flexDirection: "column",
							alignItems: "center",
							gap: 10,
							width: "100%",
						}}
					>
						<MapView
							provider={PROVIDER_GOOGLE}
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
						</MapView>
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
							<View style={styles.inputContainer}>
								<FontAwesome name='location-arrow' style={styles.inputIcon} />
								<TextInput
									placeholder={t("q5Coordinates")}
									value={coordsText}
									editable={true}
								/>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.questionCard}>
					<Text style={stylesDefault.text}>
						{t("q6")}
						<Text style={{ color: "red", fontSize: 17 }}> *</Text>
					</Text>
					<FlatList
						data={flowerData}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						horizontal={false}
						numColumns={2}
						scrollEnabled={false}
						columnWrapperStyle={{ justifyContent: "space-between" }}
						contentContainerStyle={{ paddingBottom: 40, gap: 10 }}
					/>
				</View>
				<View style={styles.questionCard}>
					<Text style={stylesDefault.text}>
						{t("q7")}
						<Text style={{ color: "red", fontSize: 17 }}> *</Text>
					</Text>
					{timeData.map((timeItem) => (
						<TouchableOpacity
							onPress={() => toCheck(timeItem)}
							key={timeItem.id}
							style={styles.checkItem}
						>
							<Checkbox
								onValueChange={() => toCheck(timeItem)}
								value={isChecked.at(timeItem.id)}
								color={isChecked ? "#508991" : "black"}
							/>

							<Text
								style={[stylesDefault.text, { marginLeft: 10, width: "auto" }]}
							>
								{timeItem.time}
							</Text>
						</TouchableOpacity>
					))}
				</View>
				{!isGuest && <View style={styles.questionCard}>
					<Text style={stylesDefault.text}>{t("q8")}</Text>
					{image && <Image source={{ uri: image }} style={styles.imageArea} />}
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
				</View>}
				{isGuest && <View style={styles.questionCard}>
					<Text style={stylesDefault.textBold}>{t("noGuestPicture")}</Text>
				</View>}
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
		marginTop: StatusBar.currentHeight,
		backgroundColor: "#F5F5F5",
	},
	scrollView: {
		paddingHorizontal: 20,
	},
	questionCard: {
		flex: 1,
		gap: 10,
		backgroundColor: "#FEFEFE",
		borderRadius: 20,
		paddingHorizontal: "10%",
		paddingVertical: 25,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
		// Shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 1,
		// Shadow for Android
		elevation: 2,
	},
	radioButtons: {
		width: "100%",
		alignItems: "flex-start",
		flexDirection: "column",
	},
	locationTypeInput: {
		borderWidth: 0,
		borderBottomWidth: 1,
		borderColor: "#ccc",
		paddingVertical: 2,
		paddingHorizontal: 10,
		borderRadius: 5,
		width: 200,
		height: 25,
		color: "black",
	},
	nameAddressInput: {
		borderWidth: 1,
		borderColor: "#ccc",
		paddingVertical: 2,
		paddingHorizontal: 10,
		borderRadius: 5,
		width: "100%",
		color: "black",
	},
	map: {
		width: 275,
		height: 190,
	},
	flowerCard: {
		width: "49%",
		gap: 5,
		margin: 0,
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 10,
		borderRadius: 5,
		justifyContent: "space-between",
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
		width: "100%",
		height: 100,
		color: "black",
		fontSize: 18,
	},
	checkItem: {
		flexDirection: "row",
		width: "100%",
	},
	checkBox: {
		borderColor: "black",
	},
	inputIcon: {
		color: "#1E314F",
		fontSize: 17,
	},
	inputContainer: {
		borderWidth: 1,
		borderColor: "#ccc",
		paddingVertical: 2,
		paddingHorizontal: 10,
		borderRadius: 5,
		width: "100%",
		color: "black",

		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	imageArea: {
		width: '100%',
		height: 200,
		borderRadius: 10,
		borderWidth: 1, 
	}
});