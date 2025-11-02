import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ApplicationToolkitScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Application Toolkit</Text>
            <Button title="Create Resume" onPress={() => { /* Placeholder */ }} />
            <Button title="Create Cover Letter" onPress={() => { /* Placeholder */ }} />
            {/* Add application tracking functionality here */}
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
});

export default ApplicationToolkitScreen;
