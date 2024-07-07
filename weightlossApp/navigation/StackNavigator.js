// src/navigation/StackNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../screens/StartScreen';
import SignUpScreen from '../screens/SignUpScreen';
import GenderScreen from '../screens/GenderScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import GoalSettingScreen from '../screens/GoalSettingScreen';


const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Gender" component={GenderScreen} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
        <Stack.Screen name="GoalSetting" component={GoalSettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
