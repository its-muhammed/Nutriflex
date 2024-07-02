import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const GoalSettingScreen = ({ navigation }) => {
  const [goal, setGoal] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Weight Loss Goal</Text>
      
      <Text style={styles.label}>How many kilos do you aim to lose in a month?</Text>
      <Picker
        selectedValue={goal}
        style={styles.picker}
        onValueChange={(itemValue) => setGoal(itemValue)}
      >
        <Picker.Item label="Select Goal" value="" />
        {[...Array(31).keys()].map(i => (
          <Picker.Item key={i} label={`${i + 1} kg`} value={`${i + 1}`} />
        ))}
      </Picker>
      
      <Button title="Next" onPress={() => navigation.navigate('Dashboard')} />
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

export default GoalSettingScreen;
