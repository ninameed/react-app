import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/users';


// REST client code, get all users REST-API call
export const listUsers = () => {
    return axios.get(REST_API_BASE_URL);
}

// REST client code, create new user REST-API call
export const createUser = (user) => {
    return axios.post(REST_API_BASE_URL, user);
}

// REST client code, get user by id REST-API call
export const getUser = (id) => {
    return axios.get(REST_API_BASE_URL + '/' + id);
}

// REST client code, update existing user by id REST-API call
export const updateUser = (id, user) => {
    return axios.put(REST_API_BASE_URL + '/' + id, user);
}

// REST client code, delete user by id REST-API call
export const deleteUser = (id) => {
    return axios.delete(REST_API_BASE_URL + '/' + id);
}

