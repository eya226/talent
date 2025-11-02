import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import { get, post } from '../api';

interface Internship {
    _id: string;
    title: string;
    company: string;
    visa_sponsorship: boolean;
    remote: boolean;
}

const SwipeScreen = () => {
    const [internships, setInternships] = useState<Internship[]>([]);

    useEffect(() => {
        get('/internships')
            .then(response => response.json())
            .then(data => setInternships(data))
            .catch(error => console.error(error));
    }, []);

    const handleYup = (internship: Internship) => {
        post('/applications', { internshipId: internship._id })
            .catch(error => console.error(error));
    };

    const handleNope = (internship: Internship) => {
        console.log(`Nope for ${internship.title}`);
    };

    const Card = ({ title, company, visa_sponsorship, remote }: Internship) => (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text>{company}</Text>
            <Text>{visa_sponsorship ? 'Visa Sponsored' : 'No Visa Sponsorship'}</Text>
            <Text>{remote ? 'Remote' : 'On-site'}</Text>
        </View>
    );

    return (
        <SwipeCards
            cards={internships}
            renderCard={(cardData: Internship) => <Card {...cardData} />}
            handleYup={handleYup}
            handleNope={handleNope}
            yupText="Apply"
            nopeText="Pass"
        />
    );
};

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default SwipeScreen;
