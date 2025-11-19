import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { get, post } from '../api';

const ProfileOnboardingScreen = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<{ user: string, text: string }[]>([]);

    useEffect(() => {
        get('/ai-mentor/onboarding')
            .then(response => response.json())
            .then(data => setChatHistory([{ user: 'Aria', text: data.message }]))
            .catch(error => console.error(error));
    }, []);

    const handleSendMessage = () => {
        const userMessage = { user: 'You', text: message };
        setChatHistory(prevChatHistory => [...prevChatHistory, userMessage]);
        // This is a placeholder for the profile building logic.
        post('/ai-mentor/profile', { message: { text: message } })
            .then(response => response.json())
            .then(data => {
                const ariaMessage = { user: 'Aria', text: data.text };
                setChatHistory(prevChatHistory => [...prevChatHistory, ariaMessage]);
            })
            .catch(error => console.error(error));
        setMessage('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Onboarding</Text>
            <View style={styles.chatContainer}>
                {chatHistory.map((chat, index) => (
                    <Text key={index} style={chat.user === 'Aria' ? styles.ariaMessage : styles.userMessage}>
                        {chat.user}: {chat.text}
                    </Text>
                ))}
            </View>
            <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Type your message here..."
            />
            <Button title="Send" onPress={handleSendMessage} />
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

export default ProfileOnboardingScreen;
