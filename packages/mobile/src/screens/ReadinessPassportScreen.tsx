import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { get } from '../api';
import { getCurrentUserId } from '../utils';

interface Eligibility {
    country: string;
    score: number;
}

interface ReadinessPassport {
    readiness_score: number;
    eligibility: Eligibility[];
    suggested_actions: string[];
}

const ReadinessPassportScreen = () => {
    const [passport, setPassport] = useState<ReadinessPassport | null>(null);
    const userId = getCurrentUserId();

    useEffect(() => {
        if (userId) {
            get(`/readiness-passport/${userId}`)
                .then(response => response.json())
                .then(data => setPassport(data))
                .catch(error => console.error(error));
        }
    }, [userId]);

    if (!passport) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Readiness Passport</Text>
            <Text style={styles.score}>Readiness Score: {passport.readiness_score}</Text>
            <Text style={styles.sectionTitle}>Eligibility</Text>
            {passport.eligibility.map((item, index) => (
                <Text key={index}>{item.country}: {item.score}</Text>
            ))}
            <Text style={styles.sectionTitle}>Suggested Actions</Text>
            {passport.suggested_actions.map((action, index) => (
                <Text key={index}>{action}</Text>
            ))}
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
    score: {
        fontSize: 18,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
});

export default ReadinessPassportScreen;
