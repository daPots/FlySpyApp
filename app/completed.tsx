import React from 'react';
import { router } from 'expo-router';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import LanguageToggleButton from './langToggle';

export default function Completed() {
    const { t, i18n } = useTranslation();
    return (
        <View style={styles.container}>
            <View style={{marginTop: 75}}><LanguageToggleButton /></View>
            <View style={styles.titleContainer}>
                <Image source={require('../assets/images/logo.png')} style={styles.logo}/>
                <Text style={styles.title}>FlySpy</Text>
            </View>
            <View style={styles.confirmationContainer}>
                <Text style={styles.confirmationText}>{t("formSubmitted")}</Text>
                <Text style={styles.confirmationSubText}>{t("thankYou")}</Text>
                <Text style={styles.subscriptionText}>{t("updates?")}</Text>
                <View style={styles.confirmationButtonContainer}>
                    <TouchableOpacity style={styles.yesConfirmationButton}>
                        <Text style={styles.yesConfirmationButtonText}>{t("Yes")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.noConfirmationButton}>
                        <Text style={styles.noConfirmationButtonText}>{t("No")}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.beginButton} onPress={() => router.push('/home')}>
                    <Text style={styles.beginButtonText}>{t("returnHome")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B2CEBD',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 20,
        alignContent: 'center',
        marginBottom: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#1E314F',
        fontFamily: 'NunitoSansExtraBold',
        lineHeight: 65,
    },
    logo: {
        width: 120,
        height: 126,
    },
    confirmationContainer: {
		flex: 1,
		backgroundColor: "#F5F5F5",
        width: 350,
        height: 200,
		borderRadius: 20,
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 30,
		// Shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 1,
		// Shadow for Android
		elevation: 2,
	},
    confirmationText: {
        fontSize: 30,
        color: '#508991',
        fontFamily: 'NunitoSansExtraBold',
        marginTop: 30,
        marginBottom: 50,
    },
    confirmationSubText: {
        fontSize: 20,
        color: '#1E314F',
        fontFamily: 'NunitoSansBold',
        textAlign: 'center',
        width: 275,
        marginBottom: 50,
    },
    subscriptionText: {
        fontSize: 18,
        color: '#1E314F',
        fontFamily: 'NunitoSansRegular',
        textAlign: 'center',
    },
    confirmationButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 50,
        width: '100%',
        marginTop: 20,
        marginBottom: 30,
    },
	yesConfirmationButton: {
		backgroundColor: '#508991',
		width: 100,
        padding: 10,
		borderRadius: 30,
		marginBottom: 10,
		// Shadow for iOS
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		// Shadow for Android
		elevation: 8,
	},
    noConfirmationButton: {
		backgroundColor: '#F3F5F4',
		width: 100,
        padding: 10,
		borderRadius: 30,
		marginBottom: 10,
		// Shadow for iOS
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		// Shadow for Android
		elevation: 8,
	},
	yesConfirmationButtonText: {
		color: '#FEFEFE',
		textAlign: 'center',
		fontFamily: 'NunitoSansBold',
		fontSize: 18,
	},
    noConfirmationButtonText: {
		color: '#508991',
		textAlign: 'center',
		fontFamily: 'NunitoSansBold',
		fontSize: 18,
	},
    beginButton: {
        backgroundColor: '#FFE7C3',
        padding: 15,
        width: '90%',
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