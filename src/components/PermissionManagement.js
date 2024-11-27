import React, { useEffect, useState } from "react";
import {
  fetchPermissions,
  createPermission,
  deletePermission,
  fetchRoles,
  updateRole,
} from "../services/api";
import { PlusIcon, TrashIcon, XIcon } from 'lucide-react';

export default function PermissionManagement() {
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newPermission, setNewPermission] = useState({ name: "", description: "" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    refreshPermissions();
    refreshRoles();
  }, []);

  const refreshPermissions = () => {
    fetchPermissions().then((res) => setPermissions(res.data));
  };

  const refreshRoles = () => {
    fetchRoles().then((res) => setRoles(res.data));
  };

  const handleAddPermission = () => {
    if (!newPermission.name) {
      alert("Permission name is required!");
      return;
    }

    createPermission(newPermission).then(() => {
      refreshPermissions();
      setShowAddModal(false);
      setNewPermission({ name: "", description: "" });
    });
  };

  const handleDeletePermission = (permissionName) => {
    const permission = permissions.find((perm) => perm.name === permissionName);

    if (!permission) {
      alert("Permission not found!");
      return;
    }

    const rolesUsingPermission = roles.filter((role) =>
      role.permissions.includes(permissionName)
    );

    if (rolesUsingPermission.length > 0) {
      setWarning({ permissionId: permission.id, permissionName, rolesUsingPermission });
      setShowWarningModal(true);
    } else {
      deletePermission(permission.id).then(() => refreshPermissions());
    }
  };

  const confirmDeletePermission = () => {
    const updatedRoles = roles.map((role) => ({
      ...role,
      permissions: role.permissions.filter((perm) => perm !== warning.permissionName),
    }));

    Promise.all(updatedRoles.map((role) => updateRole(role.id, role))).then(() => {
      deletePermission(warning.permissionId).then(() => {
        refreshPermissions();
        refreshRoles();
      });
    });

    setShowWarningModal(false);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Permission Management</h1>
        
        {/* Add Permission Button */}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 ease-in-out flex items-center shadow-md"
          onClick={() => setShowAddModal(true)}
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Permission
        </button>

        {/* Permission Table */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission Name</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Description</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {permissions.map((perm) => (
                  <tr key={perm.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{perm.name}</div>
                      <div className="text-sm text-gray-500 sm:hidden">{perm.description}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                      <div className="text-sm text-gray-500">{perm.description}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeletePermission(perm.name)}
                      >
                        <TrashIcon className="w-5 h-5" aria-label="Delete permission" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Permission Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-xl w-full relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <XIcon className="w-6 h-6" aria-label="Close modal" />
            </button>
            <h3 className="text-xl sm:text-2xl font-bold mb-6">Add Permission</h3>

            {/* Permission Name Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="permissionName">
                Permission Name
              </label>
              <input
                id="permissionName"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newPermission.name}
                onChange={(e) =>
                  setNewPermission({ ...newPermission, name: e.target.value })
                }
              />
            </div>

            {/* Permission Description */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="permissionDescription">
                Description
              </label>
              <textarea
                id="permissionDescription"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={3}
                value={newPermission.description}
                onChange={(e) =>
                  setNewPermission({ ...newPermission, description: e.target.value })
                }
              />
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out w-full sm:w-auto"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out w-full sm:w-auto"
                onClick={handleAddPermission}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Warning Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-xl w-full relative">
            <button
              onClick={() => setShowWarningModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <XIcon className="w-6 h-6" aria-label="Close modal" />
            </button>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-red-600">
              Warning: Permission In Use
            </h3>
            <p className="mb-4">
              The permission "{warning?.permissionName}" is used by the following roles:
            </p>
            <ul className="list-disc list-inside mb-6 bg-gray-100 p-4 rounded-md">
              {warning?.rolesUsingPermission.map((role) => (
                <li key={role.id} className="text-sm text-gray-700">{role.name}</li>
              ))}
            </ul>
            <p className="mb-6 font-semibold">Are you sure you want to delete this permission?</p>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out w-full sm:w-auto"
                onClick={() => setShowWarningModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out w-full sm:w-auto"
                onClick={confirmDeletePermission}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

