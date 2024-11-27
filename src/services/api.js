import axios from "axios";

const API_BASE = "http://localhost:3000"; // Mock server URL

export const fetchUsers = () => axios.get(`${API_BASE}/users`);
export const fetchRoles = () => axios.get(`${API_BASE}/roles`);
export const updateUser = (id, data) => axios.put(`${API_BASE}/users/${id}`, data);
export const createUser = (data) => axios.post(`${API_BASE}/users`, data);
export const deleteUser = (id) => axios.delete(`${API_BASE}/users/${id}`);
export const createRole = (data) => axios.post(`${API_BASE}/roles`, data);
export const updateRole = (id, data) => axios.put(`${API_BASE}/roles/${id}`, data);
export const deleteRole = (id) => axios.delete(`${API_BASE}/roles/${id}`);
export const fetchPermissions = () => axios.get(`${API_BASE}/permissions`);
export const createPermission = (data) => axios.post(`${API_BASE}/permissions`, data);
export const updatePermission = (id, data) => axios.put(`${API_BASE}/permissions/${id}`, data);
export const deletePermission = (id) => axios.delete(`${API_BASE}/permissions/${id}`);
