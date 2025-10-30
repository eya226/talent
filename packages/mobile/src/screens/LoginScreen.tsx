import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import CookieManager from '@react-native-cookies/cookies';
import { post } from '../api';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        let userUid;
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                userUid = userCredentials.user.uid;
                return userCredentials.user.getIdToken();
            })
            .then(idToken => {
                return post('/login', { idToken });
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    navigation.navigate('StudentDashboard', { userId: userUid });
                } else {
                    Alert.alert('Error', 'Login failed');
                }
            })
            .catch(error => {
                Alert.alert('Error', error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});

export default LoginScreen;
