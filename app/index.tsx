import React from 'react';
import { router } from 'expo-router';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from "expo-font";


export default function Index() {
  const [fontsLoaded] = useFonts({
    "NunitoSansRegular": require("../assets/fonts/NunitoSansRegular.ttf"),
    "NunitoSansMedium": require("../assets/fonts/NunitoSansMedium.ttf"),  
    "NunitoSansBold": require("../assets/fonts/NunitoSansBold.ttf"),
    "NunitoSansExtraBold": require("../assets/fonts/NunitoSansExtraBold.ttf"),  
  });
  if(!fontsLoaded) return <Text>Loading...</Text>; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FlySpy</Text>
      <Image source={require('../assets/images/logo.png')} style={styles.logo}/> 
      <Text style={styles.description}>Contribute to the Taiwan Wing-Spot Fly Project!</Text>
      <View style={styles.languageContainer}>
        <TouchableOpacity style={styles.langButton}>
          <Text style={styles.langButtonText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.langButton}>
          <Text style={styles.langButtonText}>中文</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.beginButton} onPress={() => router.push('/home')}>
        <Text style={styles.beginButtonText}>Continue as Guest</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.beginButton} onPress={() => router.push('/login')}>
        <Text style={styles.beginButtonText}>Login / Signup</Text> 
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B2CEBD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#1E314F',
    fontFamily: 'NunitoSansExtraBold',
    marginTop: 50,
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 208,
    marginBottom: 30,
  },
  description: {
    fontSize: 22,
    color: '#000000',
    textAlign: 'center',
    width: '45%',
    marginBottom: 30,
    fontWeight: 'bold',
    fontFamily: 'NunitoSansBold',
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 30,
  },
  langButton: {
    backgroundColor: '#FEFEFE',
    padding: 10,
    width: '45%',
    alignItems: 'center',
    borderRadius: 15,

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 8,
  },
  langButtonText: {
    color: '#508991',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'NunitoSansBold',
  },
  beginButton: {
    backgroundColor: '#FFE7C3',
    padding: 15,
    width: '75%',
    alignItems: 'center',
    borderRadius: 40,
    marginBottom: 10,

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 8,
  },
  beginButtonText: {
    color: '#1E314F',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'NunitoSansExtraBold',
  },
});