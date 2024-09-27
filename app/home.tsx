import React from "react";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Home() {
	const [expand, setExpand] = React.useState(false); 
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.widgetContainer}>
				<Text style={styles.largestFont}>Welcome, GuestUser!</Text>
				<View style={expand?{display: "none"} : styles.smallWidgetContainer}>
					<View style={styles.smallWidget}>
						<Text style={[styles.largestFont, { color: "#508991" }]}>4</Text>
						<Text style={styles.subHeading}>Submissions</Text>
					</View>
					<View style={[styles.smallWidget, { backgroundColor: "#1E314F" }]}>
						<TouchableOpacity
							style={styles.newFormButton}
							onPress={() => router.push("/form")}
						>
							<Text style={[styles.title, { color: "#1E314F" }]}>+</Text>
						</TouchableOpacity>
						<Text style={[styles.subHeading, { color: "#FEFEFE" }]}>
							New Form
						</Text>
					</View>
				</View>
				<View style={styles.videosWidget}>
					<Text style={styles.title}>Video Gallery</Text>
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
						style={styles.header}
						onPress={() => setExpand(!expand)}
					>
						<Text style={styles.title}>Our Mission</Text>
						<FontAwesome5
							name={expand ? "caret-up" : "caret-down"}
							style={styles.title}
						/>
					</TouchableOpacity>
					{expand && (
						<Text style={styles.subHeading}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
							in reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur.
						</Text>
					)}
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
	},
	widgetContainer: {
		rowGap: 20,
		alignItems: "flex-start",
		flexWrap: "wrap",
		width: "100%",
		height: "95%",
		paddingLeft: 20,
		paddingRight: 20,
	},
	smallWidgetContainer: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		justifyContent: "space-between",
		flex: 2,
	},
	smallWidget: {
		backgroundColor: "#FEFEFE",
		justifyContent: "space-around",
		alignItems: "flex-end",
		width: "48%",
		height: "100%",
		padding: 20,
		borderRadius: 30,
	},
	newFormButton: {
		backgroundColor: "#FFE7C3",
		padding: 5,
		borderRadius: 50,
		width: 50,
		height: 50,

		justifyContent: "center",
		alignItems: "center",
	},
	missionWidget: {
		backgroundColor: "#FEFEFE",
		width: "100%",
		borderRadius: 30,
		padding: 20,
	},
	videosWidget: {
		backgroundColor: "#FEFEFE",
		width: "100%",
		flex: 3,
		borderRadius: 30,
		padding: 20,
		justifyContent: "space-between",
	},
	vidContainer: {
		flexDirection: "row",
		flex: 1,
		rowGap: 20,
	},
	largestFont: {
		fontSize: 50,
		color: "#1E314F",
		fontWeight: "800",
	},
	title: {
		fontSize: 30,
		color: "#508991",
		fontWeight: "700",
	},
	subHeading: {
		fontSize: 18,
		color: "#1E314F",
		fontFamily: "NunitoSansBold",
	},
	video: {
		width: 250,
		borderRadius: 15,
	},
	header: {
		width: "100%",
		justifyContent: "space-between",
		flexDirection: "row",
	},
});
