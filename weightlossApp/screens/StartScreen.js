import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const StartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>NUTRIFLEX</Text>
        <Text style={styles.subtitle}>NEVER GIVE UP!</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.buttonText}>Start Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#336699', 
    padding: 20, 
  },
  content: {
    justifyContent: 'center', 
    alignItems: 'center',
    flex: 1, 
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff', 
    marginBottom: -5, 
  },
  subtitle: {
    fontSize: 18,
    fontWeight:'bold',
    color: '#000', 
    
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default StartScreen;

