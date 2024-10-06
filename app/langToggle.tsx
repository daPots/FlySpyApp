import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useTranslation } from 'react-i18next';

const LanguageToggleButton: React.FC = () => {
  const { i18n } = useTranslation();
  const [isEnglish, setIsEnglish] = useState(i18n.language === 'en');

  const toggleLanguage = () => {
    const newLanguage = isEnglish ? 'zh' : 'en';
    i18n.changeLanguage(newLanguage);
    setIsEnglish(!isEnglish);
  };

  return (
		<TouchableOpacity style={styles.button} onPress={toggleLanguage}>
			<FontAwesome6 name={"language"} size={40} color='#508991' />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
    alignSelf: 'flex-end',
	},
});

export default LanguageToggleButton;