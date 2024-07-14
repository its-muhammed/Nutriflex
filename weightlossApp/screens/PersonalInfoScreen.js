import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

function PersonalInfoScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handlePersonalInfo = async () => {
    const userdata_2 = {
      name: name,
      age: age,
      height: height,
      weight: weight,
    };

    try {
      if (name === '' || age === '' || height === '' || weight === '') {
        Alert.alert('Please fill all fields');
      } else {
        const res = await axios.post(
          'http://192.168.8.242:5000/api/signInServer/PersonalInfo',
          userdata_2,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        navigation.navigate('GoalSetting');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Personal Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#ffffff"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="#ffffff"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
        <TextInput
          style={styles.input}
          placeholder="Height"
          placeholderTextColor="#ffffff"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Weight"
          placeholderTextColor="#ffffff"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TouchableOpacity style={styles.button} onPress={handlePersonalInfo}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
  input: {
    backgroundColor: '#3b5998',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#336699',
    fontWeight: 'bold',
  },
});

export default PersonalInfoScreen;