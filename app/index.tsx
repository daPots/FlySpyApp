import React from "react";
import { router } from "expo-router";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from 'react-i18next';
import stylesDefault  from './styles';

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
				<View style={stylesDefault.logoContainer}>
					<Image
						source={require("../assets/images/flyspylogo.png")}
						style={stylesDefault.logo}
					/>
					<Text style={stylesDefault.largestText}>FlySpy</Text>
				</View>
				<Text
					style={[
						stylesDefault.text,
						{ textAlign: "center", fontFamily: "NunitoSansBold" },
					]}
				>
					{t("description")}
				</Text>
			</View>
			<View style={styles.indexContainer}>
				<View style={styles.languageContainer}>
					<TouchableOpacity
						style={[
							stylesDefault.button,
							{ backgroundColor: "#FEFEFE", width: "45%" },
						]}
						onPress={() => changeLanguage("en")}
					>
						<Text style={[stylesDefault.buttonText, { color: "#508991" }]}>
							English
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							stylesDefault.button,
							{ backgroundColor: "#FEFEFE", width: "45%" },
						]}
						onPress={() => changeLanguage("zh")}
					>
						<Text style={[stylesDefault.buttonText, { color: "#508991" }]}>
							中文
						</Text>
					</TouchableOpacity>
				</View>
				<View style={{ gap: 15, width: "100%" }}>
					<TouchableOpacity
						style={[stylesDefault.button, { height: 50 }]}
						onPress={() => router.push("/login")}
					>
						<Text
							style={[
								stylesDefault.buttonText,
								{ color: "#1E314F", fontSize: 20 },
							]}
						>
							{t("loginRegister")}
						</Text>
					</TouchableOpacity>
					<View style={styles.textRow}>
						<Text style={stylesDefault.subText}>{t("guestPrompt")}</Text>
						<TouchableOpacity onPress={() => router.replace("/home")}>
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
	languageContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 20,
	},
	textRow: {
		justifyContent: "center",
		flexWrap: "wrap",
		alignItems: "center",
		flexDirection: "row",
		width: "100%",
	},

	indexContainer: {
		width: "80%",
	},
});
