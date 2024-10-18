import React from 'react';
import { router } from 'expo-router';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import LanguageToggleButton from './langToggle';
import stylesDefault from './styles';

export default function Completed() {
    const { t, i18n } = useTranslation();
    return (
			<View style={styles.container}>
				<View style={{ marginTop: 75 }}>
					<LanguageToggleButton />
				</View>
				<View style={stylesDefault.logoContainer}>
					<Image
						source={require("../assets/images/flyspylogo.png")}
						style={stylesDefault.logo}
					/>
					<Text style={stylesDefault.largestText}>FlySpy</Text>
				</View>
				<View style={styles.confirmationContainer}>
                <Text style={[stylesDefault.title, {fontSize: 30}]}>{t("formSubmitted")}</Text>
					<Text
						style={[
							stylesDefault.text,
							{ textAlign: "center", fontFamily: "NunitoSansBold" },
						]}
					>
						{t("thankYou")}
					</Text>
					<Text style={[stylesDefault.text, { textAlign: "center" }]}>
						{t("updates?")}
					</Text>
					<View style={styles.confirmationButtonContainer}>
						<TouchableOpacity
							style={[
								stylesDefault.button,
								{ backgroundColor: "#FEFEFE", width: "40%" },
							]}
						>
							<Text
								style={[
									stylesDefault.buttonText,
									{ color: "#508991", fontSize: 17 },
								]}
							>
								{t("Yes")}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								stylesDefault.button,
								{ backgroundColor: "#FEFEFE", width: "40%" },
							]}
						>
							<Text
								style={[
									stylesDefault.buttonText,
									{ color: "#508991", fontSize: 17 },
								]}
							>
								{t("No")}
							</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={[stylesDefault.button, { height: 50, width: "90%" }]}
						onPress={() => router.replace("/home")}
					>
						<Text
							style={
								(stylesDefault.buttonText,
								{
									color: "#1E314F",
									fontSize: 20,
									fontFamily: "NunitoSansBold",
								})
							}
						>
							{t("returnHome")}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#C2DCCC",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	confirmationContainer: {
		flex: 1,
		backgroundColor: "#FEFEFE",
		width: "90%",
		gap: 20,
		borderRadius: 20,
		paddingHorizontal: "10%",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: "10%",
		// Shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 1,
		// Shadow for Android
		elevation: 2,
	},
	confirmationButtonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "90%",
		marginBottom: 20,
	},
});