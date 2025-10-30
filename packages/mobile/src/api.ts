import CookieManager from '@react-native-cookies/cookies';
import { API_URL } from './config';

export const post = async (endpoint: string, data: any) => {
    const cookies = await CookieManager.get(API_URL);
    const sessionCookie = cookies.session;

    return fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': sessionCookie ? `session=${sessionCookie.value}` : '',
        },
        body: JSON.stringify(data),
    });
};

export const get = async (endpoint: string) => {
    const cookies = await CookieManager.get(API_URL);
    const sessionCookie = cookies.session;

    return fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': sessionCookie ? `session=${sessionCookie.value}` : '',
        },
    });
};
