import React, { useMemo, useState } from 'react';
import {SafeAreaView,View,ScrollView,Text,StyleSheet,StatusBar,Image,TextInput} from 'react-native';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
// documentation for radio buttons: https://www.npmjs.com/package/react-native-radio-buttons-group
import DateTimePicker from '@react-native-community/datetimepicker';
// documentation for date picker: https://github.com/react-native-datetimepicker/datetimepicker?tab=readme-ov-file

export default function Form() {
  const flyIdentify: RadioButtonProps[] = useMemo(() => ([
    {id: 'yes', label: 'Yes', value: 'Yes'},
    {id: 'no', label: 'No', value: 'No'}
  ]), []);
  const locationType: RadioButtonProps[] = useMemo(() => ([
    {id: 'park', label: 'Park', value: 'Park'},
    {id: 'bgarden', label: 'Botanical Garden', value: 'Botanical Garden'},
    {id: 'rgarden', label: 'Residence [Garden]', value: 'Residence [Garden]'},
    {id: 'farm', label: 'Farm', value: 'Farm'},  
    {id: 'campus', label: 'School Campus', value: 'School Campus'},  
    {id: 'other', value: 'Other',
      label:
        <TextInput
          style={styles.locationTypeInput}
          placeholder="Other"/>
    },   
  ]), []);

  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [textInputValue, setTextInputValue] = useState('');

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
      <View style={{marginTop:40}}></View>
      <View style={styles.questionCard}>
        <Text style={styles.text}>Have you seen flies on flowers as pictured below?</Text>
        <Image source={require('../assets/images/d-elegans.png')} style={{width: 250, height: 190, marginBottom:10}}/>
        <Text style={styles.subtext}>The males of this species have black spots on their wings. The females do not. 
          The flies are about 2 mm long.</Text>
        <View style={{paddingLeft: 30, alignSelf:'flex-start'}}>
          <RadioGroup containerStyle={{alignItems: 'flex-start', flexDirection: 'row'}}
          radioButtons={flyIdentify} onPress={setSelectedId} selectedId={selectedId}/>
        </View>
      </View>
      <View style={styles.questionCard}>
        <Text style={styles.text}>Please enter the date on which you saw the flies.</Text>
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <Text style={{fontSize:30}}>📅</Text> 
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            is24Hour={true}/>
        </View>
      </View>
      <View style={styles.questionCard}>
        <Text style={styles.text}>In what type of place did you see the flies?</Text>
        <RadioGroup containerStyle={styles.radioButtons}
          radioButtons={locationType} onPress={setSelectedId} selectedId={selectedId}/>
      </View>
      <View style={styles.questionCard}>
        <Text style={styles.text}>Please enter the name of the place [e.g. name of the park] or the address where you saw the flies.</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput style={{fontSize:20}}>🏡</TextInput> 
        <TextInput style={styles.nameAddressInput} placeholder="Name / Address"/>
        </View>
      </View>
      <View style={styles.questionCard}>
        <Text style={styles.text}>Please select the geographical coordinates of the location where you saw the flies.</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput style={{fontSize:20}}>📍</TextInput> 
        <TextInput style={styles.nameAddressInput} placeholder="Name / Address"/>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  questionCard: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    // Shadow for Android
    elevation: 2,
  },
  text: {
    width: 270, 
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'NunitoSansMedium',
  },
  subtext: {
    width: 250, 
    fontSize: 13,
    fontFamily: 'NunitoSansRegular',
    marginBottom: 10,
  },
  radioButtons: {
    marginLeft: 30,
    alignSelf: 'flex-start', 
    alignItems: 'flex-start', 
    flexDirection: 'column',
  },
  locationTypeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginLeft: 10,
    borderRadius: 5,
    width: 150,
    color: 'black',
  },
  nameAddressInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginLeft: 10,
    borderRadius: 5,
    width: 250,
    color: 'black',
  },
});
