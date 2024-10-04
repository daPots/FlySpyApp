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
      <FontAwesome6 name={'language'} size={50} color="#4CAF50" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
	button: {
        marginTop: 10,
		alignSelf: 'center',
	},
});

export default LanguageToggleButton;