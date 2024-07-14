// GoalSettingScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const GoalSettingScreen = ({ navigation }) => {
    const [weightLossGoal, setWeightLossGoal] = useState('');
    const [error, setError] = useState('');

    const handleGeneratePlan = () => {
        axios.post('http://192.168.8.242:5000/GoalSetting', { goal: weightLossGoal })
            .then(response => {
                const { workoutPlan, mealPlan } = response.data;
                setError('');
                navigation.navigate('PlanScreen', { workoutPlan, mealPlan });
            })
            .catch(error => {
                setError('An error occurred. Please try again.');
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set Your Weight Loss Goal</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter weight loss goal (kg)"
                value={weightLossGoal}
                onChangeText={setWeightLossGoal}
                keyboardType="numeric"
            />
            <Button title="Generate Plan" onPress={handleGeneratePlan} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
    },
    error: {
        color: 'red',
        marginTop: 16,
    },
});

export default GoalSettingScreen;
