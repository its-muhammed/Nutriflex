import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../screens/StartScreen';
import GenderScreen from '../screens/GenderScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#336699', 
          },
          headerTintColor: '#000', 
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Start" component={StartScreen}
          options={{
            title: 'Start', 
          }}
        />
        <Stack.Screen name="Gender" component={GenderScreen} />
        <Stack.Screen name="Personal Information" component={PersonalInfoScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
