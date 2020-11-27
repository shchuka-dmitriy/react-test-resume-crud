import http from '../interceptor';

export const registerRequest = (data) => http.post('registration', data);
export const loginRequest = (data) => http.post('login', data);
export const getUser = () => http.get('user');
export const getUsers = (data) => http.post('users', data);
export const getUserById = (id) => http.get(`user/${id}`);
export const updateUser = (data, id) => http.patch(`user/${id}`, data);
export const deleteUser = (id) => http.delete(`user/${id}`);
