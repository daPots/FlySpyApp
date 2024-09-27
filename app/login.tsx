import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { firebaseAuth } from '@/firebaseConfig';
import { FirebaseError } from '@firebase/util';
import{ signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { router } from 'expo-router';
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";




function authCodeToMessage(errorCode:String) {
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

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [isLogin, setLogin] = useState(true);

  const [loading, setLoading] = useState(false);
  const auth = firebaseAuth;

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
	  }finally {
        setLoading(false);
      }  
  }


  return (
		<View style={styles.container}>
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
						secureTextEntry={true}
						value={password}
						style={styles.input}
						placeholder='Password'
						autoCapitalize='none'
						onChangeText={setPassword}
					></TextInput>
				</View>

				<TouchableOpacity style={styles.button} onPress={signIn}>
					<Text style={styles.text}>{isLogin ? "Log In" : "Sign Up"}</Text>
				</TouchableOpacity>
				<Text style={styles.smallText}>
					Don't have an account?
					<TouchableOpacity
						style={styles.textLink}
						onPress={() => setLogin(!isLogin)}
					>
						<Text style={[styles.smallText, { color: "#508991" }]}>
							{isLogin ? "Sign Up" : "Log In"}
						</Text>
					</TouchableOpacity>
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#B2CEBD",
		justifyContent: "flex-end",
	},
	formContainer: {
		height: "70%",
		width: "100%",
		paddingHorizontal: "10%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FEFEFE",
		borderRadius: 30,
		gap: 30,
	},
	input: {
		width: "80%",
		fontSize: 18,
	},
	button: {
		backgroundColor: "#FFE7C3",
		height: 50,
		width: "100%",
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	textLink: {
		alignContent: "flex-end",
	},
	text: {
		color: "#1E314F",
		fontFamily: "NunitoSansBold",
		fontSize: 20,
	},
	title: {
		width: "100%",
		textAlign: "left",
		fontSize: 50,
		color: "#508991",
		fontWeight: "800",
	},
	smallText: {
		color: "#1E314F",
		fontFamily: "NunitoSansNormal",
		fontSize: 12,
		justifyContent: "center",
	},
	inputIcon: {
		color: "#1E314F",
		fontSize: 18,
	},
	inputContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
		borderRadius: 30,
		backgroundColor: "#F3F5F4",
		height: 50,
		paddingHorizontal: 5,
	},
});