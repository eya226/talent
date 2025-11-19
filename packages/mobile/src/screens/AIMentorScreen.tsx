import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { get } from '../api';

const AIMentorScreen = () => {
    const [recommendation, setRecommendation] = useState('');

    useEffect(() => {
        get('/ai-mentor/recommendation')
            .then(response => response.json())
            .then(data => setRecommendation(data.recommendation))
            .catch(error => console.error(error));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>AI Mentor</Text>
            <Text>Aria's Recommendation:</Text>
            <Text>{recommendation}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    chatContainer: {
        flex: 1,
        marginBottom: 20,
    },
    userMessage: {
        textAlign: 'right',
    },
    ariaMessage: {
        textAlign: 'left',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default AIMentorScreen;
