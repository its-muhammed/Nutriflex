import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function GoalSettingScreen() {
    const navigation = useNavigation();
    const [weightLossGoal, setWeightLossGoal] = useState('');
    const [error, setError] = useState('');
    const handleGoalSetting = async () => {
        const userData_3 = {
            weightLossGoal: weightLossGoal,
        };
        try {
            if (weightLossGoal === "") {
                setError("Please fill in the weight loss goal.");
            } else {
                const res = await axios.post(
                    "http://192.168.8.242:5000/api/signInServer/GoalSetting",
                    userData_3,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log("Response:", res); // Log the response to inspect data and status
                if (res.status === 200) {
                    navigation.navigate("Navigation");
                } else {
                    setError("Failed to set weight loss goal. Please try again.");
                }
            }
        } catch (error) {
            console.log("Error: ", error);
            setError("Failed to set weight loss goal. Please try again.");
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Weight Loss Goal</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter weight loss goal (kg)"
                value={weightLossGoal}
                onChangeText={setWeightLossGoal}
                keyboardType="numeric" // Set keyboard type to numeric for inputting numbers
            />
            <Button title="Generate Plan" onPress={handleGoalSetting} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#336699', // Background color
        justifyContent: 'center', // Center content vertically
    },
    title: {
        fontSize: 32, // Larger font size
        fontWeight: 'bold',
        marginBottom: 24, // Increased margin bottom for separation
        color: '#fff', // White text color
        textAlign: 'center', // Center align text
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12, // Increased padding
        marginBottom: 24, // Increased margin bottom
        borderRadius: 8, // Rounded corners
        backgroundColor: '#fff', // White background color
        fontSize: 18, // Increased font size
    },
    error: {
        color: 'red',
        marginTop: 16,
        textAlign: 'center', // Center align text
    },
});

export default GoalSettingScreen;
