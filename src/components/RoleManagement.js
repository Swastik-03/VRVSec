import React, { useEffect, useState } from "react";
import { fetchRoles, createRole, updateRole, deleteRole, fetchPermissions, fetchUsers } from "../services/api";
import { PlusIcon, PencilIcon, TrashIcon, XIcon } from 'lucide-react';

export default function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [allPermissions, setAllPermissions] = useState([]);
  const [deleteWarning, setDeleteWarning] = useState(null);

  useEffect(() => {
    fetchRoles().then((res) => setRoles(res.data));
    fetchUsers().then((res) => setUsers(res.data));
    fetchPermissions().then((res) => setAllPermissions(res.data));
  }, []);

  const handleSave = () => {
    if (editingRole.id) {
      updateRole(editingRole.id, editingRole).then(() => refreshRoles());
    } else {
      createRole(editingRole).then(() => refreshRoles());
    }
    setOpen(false);
  };

  const refreshRoles = () => {
    fetchRoles().then((res) => setRoles(res.data));
  };

  const togglePermission = (permission) => {
    const updatedPermissions = editingRole.permissions.includes(permission)
      ? editingRole.permissions.filter((perm) => perm !== permission)
      : [...editingRole.permissions, permission];
    setEditingRole({ ...editingRole, permissions: updatedPermissions });
  };

  const isRoleAssignedToUser = (rolename) => {
    return users.some(user => user.role === rolename);
  };

  const handleDeleteRole = (role) => {
    if (isRoleAssignedToUser(role.name)) {
      setDeleteWarning("This role is assigned to one or more users. Please reassign the role before deleting.");
    } else {
      deleteRole(role.id).then(() => refreshRoles());
      setDeleteWarning(null);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Role Management</h1>
        
        {/* Add Role Button */}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out flex items-center shadow-md"
          onClick={() => {
            setEditingRole({ name: "", permissions: [] });
            setOpen(true);
          }}
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Role
        </button>

        {/* Delete Warning Message */}
        {deleteWarning && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4 rounded-md">
            <p className="font-bold">Warning</p>
            <p>{deleteWarning}</p>
          </div>
        )}

        {/* Table / Card View */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role Name</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Permissions</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {roles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{role.name}</div>
                      <div className="text-sm text-gray-500 sm:hidden">{role.permissions.join(", ")}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                      <div className="text-sm text-gray-500">{role.permissions.join(", ")}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        onClick={() => {
                          setEditingRole(role);
                          setOpen(true);
                        }}
                      >
                        <PencilIcon className="w-5 h-5" aria-label="Edit role" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteRole(role)}
                      >
                        <TrashIcon className="w-5 h-5" aria-label="Delete role" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Editing or Creating Role */}
      {open && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-xl w-full relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <XIcon className="w-6 h-6" aria-label="Close modal" />
            </button>
            <h3 className="text-xl sm:text-2xl font-bold mb-6">{editingRole?.id ? 'Edit Role' : 'Add Role'}</h3>

            {/* Role Name Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roleName">Role Name</label>
              <input
                id="roleName"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={editingRole?.name || ""}
                onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
              />
            </div>

            {/* Permissions */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Permissions</label>
              <div className="max-h-60 overflow-y-auto border rounded-md p-2">
                {allPermissions.map((perm) => (
                  <div key={perm.id} className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id={`perm-${perm.id}`}
                      className="mr-2"
                      checked={editingRole?.permissions.includes(perm.name)}
                      onChange={() => togglePermission(perm.name)}
                    />
                    <label htmlFor={`perm-${perm.id}`} className="text-sm text-gray-700">{perm.name}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out w-full sm:w-auto"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out w-full sm:w-auto"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

