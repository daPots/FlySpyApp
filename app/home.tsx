import React, { useRef } from "react";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Home() {
	const [expand, setExpand] = React.useState(false); 
	const scrollRef = useRef<ScrollView | null>(null);

	function expandFunc() {
		setExpand(!expand);

		scrollRef.current?.scrollTo({
			y: 100,
			animated: true,
		});
	}
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
		>
			<SafeAreaView>
				<View style={styles.widgetContainer}>
					<Text style={styles.largeTitle}>Welcome, GuestUser!</Text>
					<View style={styles.smallWidgetContainer}>
						<View style={styles.smallWidget}>
							<Text style={[styles.largeTitle, { color: "#508991" }]}>4</Text>
							<Text style={styles.title3}>Submissions</Text>
						</View>
						<View style={[styles.smallWidget, { backgroundColor: "#1E314F" }]}>
							<TouchableOpacity
								style={styles.newFormButton}
								onPress={() => router.push("/form")}
							>
								<Text style={[styles.largeTitle, { color: "#1E314F" }]}>+</Text>
							</TouchableOpacity>
							<Text style={[styles.title3, { color: "#FEFEFE" }]}>
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
							style={styles.preview}
							onPress={() => expandFunc()}
						>
							<Text style={styles.title}>Our Mission</Text>
							<FontAwesome5
								name={expand ? "caret-up" : "caret-down"}
								style={styles.title}
							/>
						</TouchableOpacity>
						{expand && (
							<Text style={styles.text}>
								FlySpy is a Citizen Science project jointly run as a
								collaboration among researchers at Stony Brook University (Dr.
								John True), National Taiwan University (Dr. Chau-Ti Ting),
								National Central University (Taiwan; Dr. Shu-Dan Yeh), and
								Academia Sinica (Dr. Shu Fang). The project aims to inform
								members of the public on urban ecology and involve them in data
								collecting on Drosophila elegans, a species with a unique
								flower-breeding ecology that is found in many sites throughout
								Taiwan, most of which have been subject to anthropogenic
								disturbances. Through collecting detailed spatial and temporal
								information on the flower breeding sites of this species, this
								project will allow us to develop D. elegans as a model species
								for urban ecology, which will provide insights on how insects
								respond to ecological disturbances, introduced and invasive
								plants, and climate change.
							</Text>
						)}
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
		padding: 25,
		marginVertical: 20,
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

		// Shadow for Android
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

		// Shadow for Android
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

		// Shadow for Android
		elevation: 5,
	},
	vidContainer: {
		flexDirection: "row",
		flex: 1,
		rowGap: 20,
	},
	largeTitle: {
		fontSize: 40,
		color: "#1E314F",
		fontWeight: "800",
	},
	title: {
		fontSize: 25,
		color: "#508991",
		fontWeight: "700",
	},
	title3: {
		fontSize: 20,
		color: "#1E314F",
		fontWeight: "500",
	},
	text: {
		fontSize: 17,
		color: "#1E314F",
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
