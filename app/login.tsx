import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '@/firebaseConfig';
import { FirebaseError } from '@firebase/util';
import stylesDefault from './styles';
import { useTranslation } from 'react-i18next';

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

function authCodeToMessage(t: Function, errorCode: String) {
	switch (errorCode) {
		case "auth/email-already-in-use":
			return t("emailUsed");
		case "auth/invalid-email":
			return t("invalidEmail");
		case "auth/invalid-password":
			return t("invalidPassword");
		default:
			return errorCode;
	}
}

function resetPassword(t: Function,auth: Auth, email: string) {
	try {
		sendPasswordResetEmail(auth, email);
		alert(t("checkEmail"));
	}
	catch (error) {
		console.log("error");
	}
}


export default function Login() {
	const { t, i18n } = useTranslation();

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
				alert(authCodeToMessage(t, error.code));
			}
		} finally {
			setLoading(false);
		}
	}


	return (
		<KeyboardAvoidingView style={styles.container} behavior='height'>
			<SafeAreaView edges={["top"]} style={styles.container}>
				<View style={styles.navigationContainer}>
					<FontAwesome
						name='arrow-left'
						style={stylesDefault.navigationIcon}
						onPress={() => router.push("/")}
					/>
				</View>
				<View style={styles.formContainer}>
					<Text
						style={[
							stylesDefault.largeText,
							{
								width: "100%",
								textAlign: "left",
								color: "#508991",
							},
						]}
					>
						{isLogin ? t("login") : t("signup")}
					</Text>
					{isLogin ? null : (
						<View style={styles.inputContainer}>
							<FontAwesome5 name='user-alt' style={styles.inputIcon} />

							<TextInput
								value={name}
								style={styles.input}
								placeholder={t("name")}
								onChangeText={setName}
							></TextInput>
						</View>
					)}
					<View style={styles.inputContainer}>
						<FontAwesome name='envelope' style={styles.inputIcon} />
						<TextInput
							value={email}
							style={styles.input}
							placeholder={t("email")}
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
							placeholder={t("password")}
							autoCapitalize='none'
							onChangeText={setPassword}
						></TextInput>
						<TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
							<FontAwesome name='eye-slash' style={styles.inputIcon} />
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={{ width: "100%" }}
						onPress={() => resetPassword(t, auth, email)}
					>
						<Text
							style={{
								color: "#508991",
								textAlign: "right",
								fontWeight: "bold",
							}}
						>
							{" "}
							{t("forgotPassword")}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							stylesDefault.button,
							{ height: 50, width: "100%", shadowOpacity: 0 },
						]}
						onPress={signIn}
					>
						<Text
							style={[
								stylesDefault.text,
								{ color: "#1E314F", fontFamily: "NunitoSansBold" },
							]}
						>
							{isLogin ? t("login") : t("signup")}
						</Text>
					</TouchableOpacity>
					<View style={styles.textRow}>
						<Text>{t("noAccount")}</Text>
						<TouchableOpacity onPress={() => setLogin(!isLogin)}>
							<Text
								style={[
									stylesDefault.subText,
									{ color: "#508991", fontFamily: "NunitoSansExtraBold" },
								]}
							>
								{isLogin ? t("signup") : t("login")}
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
	textRow: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		height: 30,
		gap: 5,
	},
	navigationContainer: {
		width: "100%",
		paddingHorizontal: "5%",
	},
});