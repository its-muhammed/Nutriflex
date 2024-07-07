
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const PersonalInfoScreen = ({ navigation }) => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
  });

  const handleNext = () => {
    if (Object.values(personalInfo).some(field => !field)) {
      Alert.alert('Please fill in all fields');
      return;
    }
    navigation.navigate('GoalSetting', { personalInfo });
  };

  return (
    <View>
      <TextInput placeholder="Name" value={personalInfo.name} onChangeText={name => setPersonalInfo({ ...personalInfo, name })} />
      <TextInput placeholder="Age" value={personalInfo.age} onChangeText={age => setPersonalInfo({ ...personalInfo, age })} keyboardType="numeric" />
      <TextInput placeholder="Height" value={personalInfo.height} onChangeText={height => setPersonalInfo({ ...personalInfo, height })} keyboardType="numeric" />
      <TextInput placeholder="Weight" value={personalInfo.weight} onChangeText={weight => setPersonalInfo({ ...personalInfo, weight })} keyboardType="numeric" />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

export default PersonalInfoScreen;
