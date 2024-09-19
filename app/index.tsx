import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from "expo-font";


export default function Index() {
  const [fontsLoaded] = useFonts({
    "NunitoSans": require("../assets/fonts/NunitoSans.ttf"),
    "NunitoSansBold": require("../assets/fonts/NunitoSansBold.ttf"),
    "NunitoSansSemiBold": require("../assets/fonts/NunitoSansSemiBold.ttf"),
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
      <TouchableOpacity style={styles.beginButton}>
        <Text style={styles.beginButtonText}>Login</Text>
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
    fontSize: 50,
    fontWeight: 'bold',
    color: '#000000',
  },
  logo: {
    width: 300,
    height: 300,
  },
  description: {
    fontSize: 25,
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
    marginBottom: 40,
  },
  langButton: {
    backgroundColor: '#FEFEFE',
    padding: 10,
    width: '45%',
    alignItems: 'center',
    borderRadius: 15,
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
    width: '50%',
    alignItems: 'center',
    borderRadius: 40,
    position: 'absolute',
    bottom: 60,
  },
  beginButtonText: {
    color: '#1E314F',
    fontSize: 30,
    fontWeight: 'bold',
  },
});