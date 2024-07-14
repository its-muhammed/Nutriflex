// PlanScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlanScreen = ({ route }) => {
    const { workoutPlan, mealPlan } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Workout Plan</Text>
            <Text>{workoutPlan}</Text>
            <Text style={styles.title}>Meal Plan</Text>
            <Text>{mealPlan}</Text>
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
        marginBottom: 8,
    },
});

export default PlanScreen;
