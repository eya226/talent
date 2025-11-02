import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { get, post } from '../api';

interface InterviewSimulation {
    _id: string;
    scenario_type: string;
    scenario_details: string;
    feedback: string;
    readiness_score: number;
}

const InterviewSimulatorScreen = () => {
    const [simulations, setSimulations] = useState<InterviewSimulation[]>([]);

    useEffect(() => {
        get('/interview-simulator')
            .then(response => response.json())
            .then(data => setSimulations(data))
            .catch(error => console.error(error));
    }, []);

    const startSimulation = (type: string) => {
        post('/interview-simulator', { scenario_type: type })
            .then(response => response.json())
            .then(data => setSimulations([...simulations, data]))
            .catch(error => console.error(error));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Interview Simulator</Text>
            <View style={styles.buttonContainer}>
                <Button title="Live Coding" onPress={() => startSimulation('live_coding')} />
                <Button title="Behavioral" onPress={() => startSimulation('hr_behavioral')} />
                {/* Add buttons for other simulation types */}
            </View>
            <FlatList
                data={simulations}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={styles.simulationContainer}>
                        <Text style={styles.simulationTitle}>{item.scenario_type}</Text>
                        <Text>Feedback: {item.feedback}</Text>
                        <Text>Score: {item.readiness_score}</Text>
                    </View>
                )}
            />
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    simulationContainer: {
        marginTop: 20,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    simulationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default InterviewSimulatorScreen;
