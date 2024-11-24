import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import LanguageToggleButton from './langToggle';
import stylesDefault from './styles';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export default function Completed() {
    const { t, i18n } = useTranslation();
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Fetch subscription status when component mounts
    useEffect(() => {
        const fetchSubscriptionStatus = async () => {
            const user = auth.currentUser;
            if (user) {
                const userRef = doc(db, "Users", user.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    setIsSubscribed(userDoc.data().subscriptionStatus || false);
                }
            }
        };
        fetchSubscriptionStatus();
    }, []);

    // Toggle subscription status
    const toggleSubscription = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const userRef = doc(db, "Users", user.uid);
                await updateDoc(userRef, { subscriptionStatus: !isSubscribed });
                setIsSubscribed(!isSubscribed);
                Alert.alert(
                    isSubscribed ? "Unsubscribed" : "Subscribed",
                    isSubscribed
                        ? "You have successfully unsubscribed."
                        : "You have successfully subscribed!"
                );
            } else {
                Alert.alert("Error", "No user is currently signed in.");
            }
        } catch (error) {
            console.error("Error updating subscription status:", error);
            Alert.alert("Error", "Failed to update subscription status. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 75 }}>
                <LanguageToggleButton />
            </View>
            <View style={stylesDefault.logoContainer}>
                <Image
                    source={require("../assets/images/flyspylogo.png")}
                    style={stylesDefault.logo}
                />
                <Text style={stylesDefault.largestText}>FlySpy</Text>
            </View>
            <View style={styles.confirmationContainer}>
                <Text style={[stylesDefault.title, { fontSize: 30 }]}>{t("formSubmitted")}</Text>
                <Text
                    style={[
                        stylesDefault.text,
                        { textAlign: "center", fontFamily: "NunitoSansBold" },
                    ]}
                >
                    {t("thankYou")}
                </Text>
                <Text style={[stylesDefault.text, { textAlign: "center" }]}>
                    {isSubscribed ? t("unsubscribedMessage") : t("updates?")}
                </Text>
                <View style={styles.confirmationButtonContainer}>
                    <TouchableOpacity
                        style={[
                            stylesDefault.button,
                            { backgroundColor: "#508991" },
                        ]}
                        onPress={toggleSubscription}
                    >
                        <Text
                            style={[
                                stylesDefault.buttonText,
                                { color: "#FEFEFE", fontSize: 17 },
                            ]}
                        >
                            {isSubscribed ? t("unsubscribe") : t("subscribe")}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[stylesDefault.button, { height: 50, width: "90%" }]}
                    onPress={() => router.replace("/home")}
                >
                    <Text
                        style={
                            (stylesDefault.buttonText,
                            {
                                color: "#1E314F",
                                fontSize: 20,
                                fontFamily: "NunitoSansBold",
                            })
                        }
                    >
                        {t("returnHome")}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#cbe2db",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	confirmationContainer: {
		flex: 1,
		backgroundColor: "#FEFEFE",
		width: "90%",
		gap: 20,
		borderRadius: 20,
		paddingHorizontal: "10%",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: "10%",
		// Shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 1,
		// Shadow for Android
		elevation: 2,
	},
	confirmationButtonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		width: "90%",
		marginBottom: 20,
	},
});