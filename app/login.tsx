import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '@/firebaseConfig';
import { FirebaseError } from '@firebase/util';


import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
	sendPasswordResetEmail,
	Auth,
} from "firebase/auth";

import { router } from 'expo-router';
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

function authCodeToMessage(errorCode: String) {
	switch (errorCode) {
		case "auth/email-already-in-use":
			return "Email already in use";
		case "auth/invalid-email":
			return "Invalid Email Address";
		case "auth/invalid-password":
			return "Invalid Password";
		default:
			return errorCode;
	}
}

function resetPassword(auth: Auth, email: string) {
	try {
		sendPasswordResetEmail(auth, email);
		alert("Check your email!");
	}
	catch (error) {
		console.log("error");
	}
	
}


export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [isLogin, setLogin] = useState(true);
	const [hidePassword, setHidePassword] = useState(true);
	const [loading, setLoading] = useState(false);
	
	const signIn = async () => {
		setLoading(true);
		try {
			if (isLogin) {
				await signInWithEmailAndPassword(auth, email, password);
				router.push('/home');
			}
			else {
				await createUserWithEmailAndPassword(auth, email, password);
				router.push('/home');
			}
		} catch (error: unknown) {
			if (error instanceof FirebaseError) {
				alert(authCodeToMessage(error.code));
			}
		} finally {
			setLoading(false);
		}
	}


	return (
		<KeyboardAvoidingView style={styles.container} behavior= "height">
			<SafeAreaView edges={["top"]} style={styles.container}>
				<View style={styles.navigationContainer}>
					<FontAwesome
						name='arrow-left'
						style={styles.navigationIcon}
						onPress={() => router.push("/")}
					/>
				</View>
				<View style={styles.formContainer}>
					<Text style={styles.title}>{isLogin ? "Log In" : "Sign Up"}</Text>
					{isLogin ? null : (
						<View style={styles.inputContainer}>
							<FontAwesome5 name='user-alt' style={styles.inputIcon} />

							<TextInput
								value={name}
								style={styles.input}
								placeholder='Name'
								onChangeText={setName}
							></TextInput>
						</View>
					)}
					<View style={styles.inputContainer}>
						<FontAwesome name='envelope' style={styles.inputIcon} />
						<TextInput
							value={email}
							style={styles.input}
							placeholder='Email'
							autoCapitalize='none'
							onChangeText={setEmail}
						></TextInput>
					</View>
					<View style={styles.inputContainer}>
						<FontAwesome5 name='lock' style={styles.inputIcon} />
						<TextInput
							secureTextEntry={hidePassword}
							value={password}
							style={styles.input}
							placeholder='Password'
							autoCapitalize='none'
							onChangeText={setPassword}
						></TextInput>
						<TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
							<FontAwesome name='eye-slash' style={styles.inputIcon} />
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={{ width: "100%" }}
						onPress={() => resetPassword(auth, email)}
					>
						<Text
							style={{
								color: "#508991",
								textAlign: "right",
								fontWeight: "bold",
							}}
						>
							{" "}
							Forgot your password?
						</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={signIn}>
						<Text style={styles.text}>{isLogin ? "Log In" : "Sign Up"}</Text>
					</TouchableOpacity>
					<View style={styles.textRow}>
						<Text>Don't have an account?</Text>
						<TouchableOpacity onPress={() => setLogin(!isLogin)}>
							<Text style={[styles.smallText, { color: "#508991" }]}>
								{isLogin ? "Sign Up" : "Log In"}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#C2DCCC",
		justifyContent: "space-between",
	},
	formContainer: {
		width: "100%",
		paddingHorizontal: "10%",
		paddingVertical: "15%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FEFEFE",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		gap: 30,
	},
	input: {
		flex: 1,
		fontSize: 18,
	},
	inputIcon: {
		color: "#1E314F",
		fontSize: 17,
	},
	inputContainer: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		gap: 10,
		borderRadius: 30,
		backgroundColor: "#F3F5F4",
		height: 50,
		paddingHorizontal: 20,
	},
	button: {
		backgroundColor: "#FFE7C3",
		height: 50,
		width: "100%",
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	textRow: {
		justifyContent: "center",
		flexDirection: "row",
		height: 20,
	},
	text: {
		color: "#1E314F",
		fontFamily: "NunitoSansBold",
		fontSize: 17,
	},
	title: {
		width: "100%",
		textAlign: "left",
		fontSize: 40,
		color: "#508991",
		fontWeight: "800",
	},
	smallText: {
		color: "#1E314F",
		fontWeight: "bold",
		justifyContent: "center",
		marginLeft: 10,
	},
	navigationIcon: {
		color: "#1E314F",
		fontSize: 40,
	},
	navigationContainer: {
		width: "100%",
		paddingHorizontal: "5%",
	},
});