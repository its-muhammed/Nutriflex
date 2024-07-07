// src/components/GenderScreen.js
import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';

const GenderScreen = ({ navigation }) => {
  const [gender, setGender] = useState('');

  const handleNext = () => {
    if (!gender) {
      Alert.alert('Please select your gender');
      return;
    }s
    navigation.navigate('PersonalInfo')
  };

  return (
    <View>
      <Button title="Male" onPress={() => setGender('Male')} />
      <Button title="Female" onPress={() => setGender('Female')} />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

export default GenderScreen;
