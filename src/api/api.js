// src/api/api.js
import axios from 'axios';

// URL base de la API
const API_URL = 'https://dummyapi.io/data/v1/';

const API_HEADERS = {
  'app-id': '63473330c1927d386ca6a3a5',
};

// Función para obtener todos los usuarios (paginar si es necesario)
export const getUsers = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}user?page=${page}&limit=${limit}`, { headers: API_HEADERS });
    return response;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Error al obtener usuarios');
  }
};

// Función para obtener un solo usuario
export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}user/${userId}`, { headers: API_HEADERS });
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Error al obtener el usuario');
  }
};

// Función para crear un usuario
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}user/create`, userData, { headers: API_HEADERS });
    return response;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Error al crear el usuario');
  }
};

// Función para editar un usuario
export const editUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}user/${userId}`, userData, { headers: API_HEADERS });
    return response;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Error al editar el usuario');
  }
};

// Función para eliminar un usuario
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}user/${userId}`, { headers: API_HEADERS });
    return response;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Error al eliminar el usuario');
  }
};
