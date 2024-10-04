import React from "react";
import { router } from "expo-router";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from 'react-i18next';

export default function Index() {
	const { t, i18n } = useTranslation();

	const [fontsLoaded] = useFonts({
		NunitoSansRegular: require("../assets/fonts/NunitoSansRegular.ttf"),
		NunitoSansMedium: require("../assets/fonts/NunitoSansMedium.ttf"),
		NunitoSansBold: require("../assets/fonts/NunitoSansBold.ttf"),
		NunitoSansExtraBold: require("../assets/fonts/NunitoSansExtraBold.ttf"),
	});
	if (!fontsLoaded) return <Text>Loading...</Text>;

	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language);
	  };

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.indexContainer}>
				<View style={styles.logoContainer}>
					<Image
						source={require("../assets/images/flyspylogo.png")}
						style={styles.logo}/>
					<Text style={styles.title}>FlySpy</Text>
				</View>
				<Text style={styles.description}>{t("description")}</Text>
			</View>
			<View style={styles.indexContainer}>
				<View style={styles.languageContainer}>
					<TouchableOpacity style={styles.langButton} onPress={() => changeLanguage('en')}>
						<Text style={styles.langButtonText}>English</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.langButton} onPress={() => changeLanguage('zh')}>
						<Text style={styles.langButtonText}>中文</Text>
					</TouchableOpacity>
				</View>
				<View style={{ gap: 15, width: "100%" }}>
					<TouchableOpacity style={styles.beginButton} onPress={() => router.push("/login")}>
						<Text style={styles.beginButtonText}>{t("loginRegister")}</Text>
					</TouchableOpacity>
					<View style={styles.textRow}>
						<Text style={styles.text}>{t("guestPrompt")}</Text>
						<TouchableOpacity onPress={() => router.push('/home')}>
							<Text style={{ color: "#508991", fontWeight: "bold" }}>
								{t("signInAsGuest")}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#C2DCCC",
		alignItems: "center",
		justifyContent: "center",
		gap: 15,
	},
	title: {
		fontSize: 70,
		fontWeight: "bold",
		color: "#1E314F",
		fontFamily: "NunitoSansExtraBold",
	},
	logoContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	logo: {
		width: 70,
		height: 70,
	},
	description: {
		fontSize: 17,
		color: "#1E314F",
		textAlign: "center",
		width: "100%",
		fontWeight: "bold",
		fontFamily: "NunitoSansBold",
	},
	languageContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 20,
	},
	langButton: {
		backgroundColor: "#FEFEFE",
		padding: 5,
		width: "45%",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,

		// Shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,

		// Shadow for Android
		elevation: 5,
	},
	langButtonText: {
		color: "#508991",
		fontSize: 17,
		fontWeight: "bold",
		fontFamily: "NunitoSansBold",
	},
	beginButton: {
		backgroundColor: "#FFE7C3",
		height: 50,
		width: "100%",
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",

		// Shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,

		// Shadow for Android
		elevation: 5,
	},
	beginButtonText: {
		color: "#1E314F",
		fontSize: 20,
		fontFamily: "NunitoSansBold",
	},
	textRow: {
		justifyContent: "center",
		flexWrap: "wrap",
		alignItems: "center",
		flexDirection: "row",
		width: "100%",
	},
	text: {
		color: "#1E314F",
	},
	indexContainer: {
		width: "80%",
	},
});
