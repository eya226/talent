import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { get } from '../api';

interface Internship {
    _id: string;
    title: string;
    company: string;
    description: string;
    visa_sponsorship: boolean;
    remote: boolean;
}

const GlobalInternshipDiscoveryScreen = () => {
    const [internships, setInternships] = useState<Internship[]>([]);
    const [filters, setFilters] = useState({
        visa_sponsorship: false,
        remote: false,
    });

    useEffect(() => {
        let queryString = '/internships?';
        if (filters.visa_sponsorship) {
            queryString += 'visa_sponsorship=true&';
        }
        if (filters.remote) {
            queryString += 'remote=true&';
        }

        get(queryString)
            .then(response => response.json())
            .then(data => setInternships(data))
            .catch(error => console.error(error));
    }, [filters]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Global Internship Discovery</Text>
            {/* Add filter controls here */}
            <FlatList
                data={internships}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={styles.internshipContainer}>
                        <Text style={styles.internshipTitle}>{item.title}</Text>
                        <Text>{item.company}</Text>
                        <Text>{item.description}</Text>
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
    internshipContainer: {
        marginBottom: 20,
    },
    internshipTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default GlobalInternshipDiscoveryScreen;
