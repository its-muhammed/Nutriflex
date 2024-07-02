import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PersonalInfoScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityFrequency, setActivityFrequency] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Personal Information</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      
      <Text style={styles.label}>Age</Text>
      <Picker
        selectedValue={age}
        style={styles.picker}
        onValueChange={(itemValue) => setAge(itemValue)}
      >
        <Picker.Item label="Select Age" value="" />
        {[...Array(100).keys()].map(i => (
          <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
        ))}
      </Picker>
      
      <Text style={styles.label}>Weight (kg)</Text>
      <Picker
        selectedValue={weight}
        style={styles.picker}
        onValueChange={(itemValue) => setWeight(itemValue)}
      >
        <Picker.Item label="Select Weight" value="" />
        {[...Array(300).keys()].map(i => (
          <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
        ))}
      </Picker>
      
      <Text style={styles.label}>Height (cm)</Text>
      <Picker
        selectedValue={height}
        style={styles.picker}
        onValueChange={(itemValue) => setHeight(itemValue)}
      >
        <Picker.Item label="Select Height" value="" />
        {[...Array(250).keys()].map(i => (
          <Picker.Item key={i} label={`${i + 50}`} value={`${i + 50}`} />
        ))}
      </Picker>
      
      <TextInput
        style={styles.input}
        placeholder="Activity Frequency (times per week)"
        value={activityFrequency}
        onChangeText={setActivityFrequency}
        keyboardType="numeric"
      />
      
      <Button title="Next" onPress={() => navigation.navigate('Goal')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#336699',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff',
  },
  picker: {
    width: '80%',
    height: 40,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});

export default PersonalInfoScreen;
