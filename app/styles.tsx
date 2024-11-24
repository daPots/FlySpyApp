import {StyleSheet} from "react-native";

const stylesDefault = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ECECEC",
	},
	largestText: {
		fontSize: 70,
		fontWeight: "bold",
		color: "#1E314F",
		fontFamily: "NunitoSansExtraBold",
	},
	largeText: {
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
	    width: '100%',
		color: "#1E314F",
		fontFamily: "NunitoSansMedium",
	},
	subText: {
		color: "#1E314F",
		fontSize: 14,
		fontFamily: "NunitoSansRegular",
	},
	button: {
		backgroundColor: "#FFE7C3",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10,

		justifyContent: "center",
		alignItems: "center",

		// Shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,

		// Shadow for Android
		elevation: 2,
	},
	buttonText: {
		color: "#FFF",
		fontSize: 16,
		textAlign: "center",

		fontFamily: "NunitoSansBold",
	},
	logo: {
		width: 70,
		height: 70,
	},
	logoContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 10,
	},
	navigationIcon: {
		color: "#1E314F",
		fontSize: 40,
	},
});

export default stylesDefault;
