import React, { useEffect, useState } from "react";
import { fetchRoles, fetchUsers, fetchPermissions } from "../services/api";
import { CheckIcon, XIcon } from 'lucide-react';

export default function PermissionMatrix() {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    fetchRoles().then((res) => setRoles(res.data));
    fetchUsers().then((res) => setUsers(res.data));
    fetchPermissions().then((res) => setPermissions(res.data)); // Fetch permissions
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Permission Matrix</h1>

        {/* User-Role Matrix */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">User-Role Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">User</th>
                  {roles.map((role) => (
                    <th key={role.id} className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                      {role.name}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10">
                      {user.name}
                    </td>
                    {roles.map((role) => (
                      <td key={role.id} className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {user.role === role.name ? (
                          <CheckIcon className="w-5 h-5 text-green-500 mx-auto" aria-label="Has permission" />
                        ) : (
                          <XIcon className="w-5 h-5 text-red-500 mx-auto" aria-label="No permission" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Role-Permission Matrix */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Role-Permission Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">Role</th>
                  {permissions.map((permission) => (
                    <th key={permission.id} className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                      {permission.name}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {roles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10">
                      {role.name}
                    </td>
                    {permissions.map((permission) => (
                      <td key={permission.id} className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {role.permissions?.includes(permission.name) ? (
                          <CheckIcon className="w-5 h-5 text-green-500 mx-auto" aria-label="Has permission" />
                        ) : (
                          <XIcon className="w-5 h-5 text-red-500 mx-auto" aria-label="No permission" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Legend</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-sm text-gray-700">Has Permission</span>
            </div>
            <div className="flex items-center">
              <XIcon className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-sm text-gray-700">No Permission</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
