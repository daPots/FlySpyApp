import React from "react";
import { router } from "expo-router";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
	const [fontsLoaded] = useFonts({
		NunitoSansRegular: require("../assets/fonts/NunitoSansRegular.ttf"),
		NunitoSansMedium: require("../assets/fonts/NunitoSansMedium.ttf"),
		NunitoSansBold: require("../assets/fonts/NunitoSansBold.ttf"),
		NunitoSansExtraBold: require("../assets/fonts/NunitoSansExtraBold.ttf"),
	});
	if (!fontsLoaded) return <Text>Loading...</Text>;

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.indexContainer}>
				<View style={styles.logoContainer}>
					<Image
						source={require("../assets/images/flyspylogo.png")}
						style={styles.logo}
					/>
					<Text style={styles.title}>FlySpy</Text>
				</View>
				<Text style={styles.description}>
					Contribute to the Taiwan Wing-Spot Fly Project!
				</Text>
			</View>
			<View style={styles.indexContainer}>
				<View style={styles.languageContainer}>
					<TouchableOpacity style={styles.langButton}>
						<Text style={styles.langButtonText}>English</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.langButton}>
						<Text style={styles.langButtonText}>中文</Text>
					</TouchableOpacity>
				</View>
				<View style={{ gap: 20, width: "100%" }}>
					<TouchableOpacity
						style={styles.beginButton}
						onPress={() => router.push("/login")}
					>
						<Text style={styles.beginButtonText}>Log In / Register</Text>
					</TouchableOpacity>
					<View style={styles.textRow}>
						<Text style={styles.text}>Don't want to create an account?</Text>
						<TouchableOpacity onPress={() => "home"}>
							<Text style={{ color: "#508991", fontWeight: "bold" }}>
								{" "}
								Sign in as guest{" "}
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
		justifyContent: "space-between",
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
		width: 80,
		height: 80,
	},
	description: {
		fontSize: 20,
		color: "#000000",
		textAlign: "center",
		width: "100%",
		marginBottom: 30,
		fontWeight: "bold",
		fontFamily: "NunitoSansBold",
	},
	languageContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 30,
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
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 4,

		// Shadow for Android
		elevation: 8,
	},
	langButtonText: {
		color: "#508991",
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
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 4,

		// Shadow for Android
		elevation: 8,
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
		paddingVertical: "10%",
	},
});
