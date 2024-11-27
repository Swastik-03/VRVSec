import axios from "axios";

const API_BASE1 = process.env.REACT_APP_API_BASE1 || "http://localhost:4000";
const API_BASE2 = process.env.REACT_APP_API_BASE2 || "http://localhost:4000";




export const fetchUsers = () => axios.get(`${API_BASE1}/users`);
export const fetchRoles = () => axios.get(`${API_BASE1}/roles`);
export const updateUser = (id, data) => axios.put(`${API_BASE1}/users/${id}`, data);
export const createUser = (data) => axios.post(`${API_BASE1}/users`, data);
export const deleteUser = (id) => axios.delete(`${API_BASE1}/users/${id}`);
export const createRole = (data) => axios.post(`${API_BASE1}/roles`, data);
export const updateRole = (id, data) => axios.put(`${API_BASE1}/roles/${id}`, data);
export const deleteRole = (id) => axios.delete(`${API_BASE1}/roles/${id}`);
export const fetchPermissions = () => axios.get(`${API_BASE2}/permissions`);
export const createPermission = (data) => axios.post(`${API_BASE2}/permissions`, data);
export const updatePermission = (id, data) => axios.put(`${API_BASE2}/permissions/${id}`, data);
export const deletePermission = (id) => axios.delete(`${API_BASE2}/permissions/${id}`);
