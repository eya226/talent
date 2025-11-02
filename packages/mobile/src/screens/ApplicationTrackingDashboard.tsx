import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { get } from '../api';

interface Application {
    _id: string;
    internship: {
        title: string;
        company: string;
    };
    status: string;
}

const ApplicationTrackingDashboard = () => {
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        get('/applications')
            .then(response => response.json())
            .then(data => setApplications(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Application Tracking</Text>
            <FlatList
                data={applications}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={styles.applicationContainer}>
                        <Text style={styles.internshipTitle}>{item.internship.title} at {item.internship.company}</Text>
                        <Text>Status: {item.status}</Text>
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
    applicationContainer: {
        marginBottom: 20,
    },
    internshipTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ApplicationTrackingDashboard;
