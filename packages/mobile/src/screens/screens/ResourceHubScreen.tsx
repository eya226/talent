import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { get } from '../api';

interface Resource {
    _id: string;
    title: string;
    url: string;
    description: string;
}

const ResourceHubScreen = () => {
    const [resources, setResources] = useState<Resource[]>([]);

    useEffect(() => {
        get('/resources')
            .then(response => response.json())
            .then(data => setResources(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resource Hub</Text>
            <FlatList
                data={resources}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={styles.resourceContainer}>
                        <Text style={styles.resourceTitle}>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Text style={styles.resourceUrl}>{item.url}</Text>
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
    resourceContainer: {
        marginBottom: 20,
    },
    resourceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    resourceUrl: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default ResourceHubScreen;
