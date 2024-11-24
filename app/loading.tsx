import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { t } from "i18next";

export default function Loading() {
	return(
        <SafeAreaView
            style={{
                zIndex: 2,
                backgroundColor: "#FEFEFE",
                width: "100%",
                height: "100%",
                margin: 0,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
            }}
        >
            <View style={{ position: "absolute", gap: 5 }}>
                <ActivityIndicator size='large' color='#508991'></ActivityIndicator>
                <Text style={{ textAlign: "center", fontSize: 18 }}>{t("loading")}</Text>
            </View>
            </SafeAreaView>
    )
}
const styles = StyleSheet.create({});
