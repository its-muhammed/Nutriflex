// src/components/GoalSettingScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { handleGoalSetting } from '../services/firebaseService';

const GoalSettingScreen = ({ navigation }) => {
  const [goal, setGoal] = useState('');

  const handleSetGoal = () => {
    if (!goal) {
      Alert.alert('Please enter a goal');
      return;
    }
    handleGoalSetting(goal)
      .then(() => navigation.navigate('Dashboard'))
      .catch(error => Alert.alert('Error setting goal', error.message));
  };

  return (
    <View>
      <TextInput placeholder="Enter your goal" value={goal} onChangeText={setGoal} />
      <Button title="Set Goal" onPress={handleSetGoal} />
    </View>
  );
};

export default GoalSettingScreen;
