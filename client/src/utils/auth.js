import cookies from 'js-cookie';

const tokenKey = 'Admin-Token';

export function setToken(token) {
    console.log('set', token);
    cookies.set(tokenKey, token);
};
export function getToken() {
    return cookies.get(tokenKey);
};
export function removeToken() {
    cookies.remove(tokenKey);
};
