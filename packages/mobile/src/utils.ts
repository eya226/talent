import auth from '@react-native-firebase/auth';

export const getCurrentUserId = () => {
    return auth().currentUser?.uid;
};
