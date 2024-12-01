import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Image } from "react-native";
import { t } from "i18next";
import LottieView from "lottie-react-native";


export default function Loading() {
	return (
		<SafeAreaView
			style={{
				zIndex: 2,
				backgroundColor: "#FEFEFE",
				width: "100%",
				height: "100%",
				margin: 0,
				justifyContent: "center",
				alignItems: "center",
				position: "absolute",
			}}
		>
			<View style={{ position: "absolute", gap: 5 }}>
				<LottieView
					source={require("../assets/videos/loadingLogo.json")}
					style={{ width: 200, height: 200 }}
					autoPlay
					loop
					cacheComposition={true}
				/>

				<Text style={{ textAlign: "center", fontSize: 24, color: '#508991', fontWeight: 800 }}>
					{t("loading")}
				</Text>
			</View>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({});
