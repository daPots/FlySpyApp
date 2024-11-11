import React, { useRef, useState, useEffect } from "react";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTranslation } from 'react-i18next';
import LanguageToggleButton from './langToggle';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';  
import { db, auth } from '../firebaseConfig'; 
import stylesDefault from "./styles";

export default function Home() {
	const { t, i18n } = useTranslation();
	const [expand, setExpand] = React.useState(false); 
	const scrollRef = useRef<ScrollView | null>(null);

	const [name, setName] = useState("Guest");
	const [submissions, setSubmissions] = useState(0);

	// Toggle expand for mission statement
	function expandFunc() {
		setExpand(!expand);
		scrollRef.current?.scrollTo({ y: 100, animated: true });
	}

	// Fetch user data
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const userID = user.uid;
				const userDoc = await getDoc(doc(db, "Users", userID));
				if (userDoc.exists()) {
					const newName = userDoc.data().name;
					const newSubmissionCount = userDoc.data().submissionCount;
					setName(newName || name);
					setSubmissions(newSubmissionCount || submissions);
				}
			}
		});
		return () => unsubscribe();
	}, []);

	// Logout function
	const handleLogout = async () => {
		try {
			await signOut(auth);
			router.replace("/login");
		} catch (error) {
			Alert.alert("Logout Failed", "Please try again.");
		}
	};

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
			<SafeAreaView style={{ paddingHorizontal: 25 }}>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<TouchableOpacity onPress={handleLogout}>
						<FontAwesome5 name="sign-out-alt" size={24} color="#1E314F" />
					</TouchableOpacity>
					<LanguageToggleButton />
				</View>
				<View style={styles.widgetContainer}>
					<Text style={stylesDefault.largeText}>{t("welcomeUser") + name}!</Text>
					<View style={styles.smallWidgetContainer}>
						<View style={styles.smallWidget}>
							<Text style={[stylesDefault.largeText, { color: "#508991" }]}>{submissions}</Text>
							<Text style={stylesDefault.title3}>{t("submissions")}</Text>
						</View>
						<View style={[styles.smallWidget, { backgroundColor: "#1E314F" }]}>
							<TouchableOpacity
								style={styles.newFormButton}
								onPress={() => router.replace("/form")}>
								<Text style={[stylesDefault.largeText, { color: "#1E314F" }]}>+</Text>
							</TouchableOpacity>
							<Text style={[stylesDefault.title3, { color: "#FEFEFE" }]}>{t("newForm")}</Text>
						</View>
					</View>
					<View style={styles.videosWidget}>
						<Text style={stylesDefault.title}>{t("videoGallery")}</Text>
						<ScrollView style={styles.vidContainer} horizontal>
							<Video
								style={[styles.video, { marginRight: 10 }]}
								source={require("../assets/videos/fly.mp4")}
								useNativeControls
								isLooping
								resizeMode={ResizeMode.COVER}
							/>
							<Video
								style={styles.video}
								source={require("../assets/videos/fly.mp4")}
								useNativeControls
								isLooping
								resizeMode={ResizeMode.COVER}
							/>
						</ScrollView>
					</View>
					<View style={styles.missionWidget}>
						<TouchableOpacity
							style={styles.preview}
							onPress={expandFunc}>
							<Text style={stylesDefault.title}>{t("ourMission")}</Text>
							<FontAwesome5 name={expand ? "caret-up" : "caret-down"} style={stylesDefault.title} />
						</TouchableOpacity>
						{expand && <Text style={stylesDefault.text}>{t("missionStatement")}</Text>}
					</View>
				</View>
			</SafeAreaView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ECECEC",
	},
	widgetContainer: {
		justifyContent: "flex-end",
		rowGap: 20,
		width: "100%",
	},
	smallWidgetContainer: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		justifyContent: "space-between",
		height: 150,
	},
	smallWidget: {
		backgroundColor: "#FEFEFE",
		justifyContent: "space-around",
		alignItems: "flex-end",
		width: "48%",
		height: "100%",
		padding: 20,
		borderRadius: 30,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 8,
	},
	newFormButton: {
		backgroundColor: "#FFE7C3",
		padding: 5,
		borderRadius: 50,
		width: 60,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
	},
	missionWidget: {
		gap: 10,
		backgroundColor: "#FEFEFE",
		width: "100%",
		borderRadius: 30,
		padding: 25,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 8,
	},
	videosWidget: {
		gap: 10,
		backgroundColor: "#FEFEFE",
		width: "100%",
		height: 300,
		borderRadius: 30,
		padding: 25,
		justifyContent: "space-between",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 5,
	},
	vidContainer: {
		flexDirection: "row",
		flex: 1,
		rowGap: 20,
	},
	video: {
		width: 250,
		borderRadius: 15,
	},
	preview: {
		width: "100%",
		justifyContent: "space-between",
		flexDirection: "row",
	},
});