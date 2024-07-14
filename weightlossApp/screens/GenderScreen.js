import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

function GenderScreen(){

  const navigation = useNavigation();
  const [Gender, setGender] = useState('');

  const handleGenderSelection = (gender) =>{
    if (gender !== Gender){
      setGender(gender);
    }
  };

  const handleSubmit = async () => {
    try {
      if (Gender === "") {
        alert("Please select your gender");
      } else {
        const userData_1 = { Gender };
  
        const res = await axios.post(
          "http://192.168.8.242:5000/api/signInServer/Gender",
          userData_1,
          {
            headers: {
              "Content-type": "application/json"
            },
          }
        );
  
        navigation.navigate("PersonalInfo");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>What is your gender?</Text>
        <View style={styles.buttonGroup}>
          <Button
            title="Male"
            onPress={() => handleGenderSelection('Male')}
            color="#336699"
          />
          <Button
            title="Female"
            onPress={() => handleGenderSelection('Female')}
            color="#336699"
          />
        </View>
        <Button title="Next" onPress={handleSubmit} color="#336699" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#336699',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});

export default GenderScreen;