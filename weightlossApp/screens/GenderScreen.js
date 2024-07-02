import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GenderScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PersonalInfo')}>
        <Text style={styles.buttonText}>Male</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>OR</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PersonalInfo')}>
        <Text style={styles.buttonText}>Female</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#336699', // Darker background color
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 10,
  },
});

export default GenderScreen;
