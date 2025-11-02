import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { get, post } from '../api';
import { getCurrentUserId } from '../utils';

interface InterviewSimulation {
    _id: string;
    scenario_type: string;
    scenario_details: string;
    feedback: string;
    readiness_score: number;
}

const InterviewSimulatorScreen = () => {
    const [simulations, setSimulations] = useState<InterviewSimulation[]>([]);
    const userId = getCurrentUserId();

    useEffect(() => {
        if (userId) {
            get(`/interview-simulator/${userId}`)
                .then(response => response.json())
                .then(data => setSimulations(data))
                .catch(error => console.error(error));
        }
    }, [userId]);

    const startSimulation = (type: string) => {
        if (userId) {
            const newSimulation = {
                user: userId,
                scenario_type: type,
                scenario_details: 'Placeholder scenario details.',
            };
            post('/interview-simulator', newSimulation)
                .then(response => response.json())
                .then(data => setSimulations([...simulations, data]))
                .catch(error => console.error(error));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Interview Simulator</Text>
            <Button title="Start Live Coding" onPress={() => startSimulation('live_coding')} />
            <Button title="Start System Design" onPress={() => startSimulation('system_design')} />
            {/* Add more buttons for other simulation types */}
            {simulations.map(sim => (
                <View key={sim._id} style={styles.simulationContainer}>
                    <Text style={styles.simulationTitle}>{sim.scenario_type}</Text>
                    <Text>{sim.scenario_details}</Text>
                    <Text>Feedback: {sim.feedback}</Text>
                    <Text>Score: {sim.readiness_score}</Text>
                </View>
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
    simulationContainer: {
        marginTop: 20,
    },
    simulationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default InterviewSimulatorScreen;
