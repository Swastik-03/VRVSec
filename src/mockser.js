// Install json-server and run this file to simulate API: `json-server --watch mock-server.js`

module.exports = {
    users: [
      { id: 1, name: "Alice", email: "alice@example.com", role: "Admin", status: "Active" },
      { id: 2, name: "Bob", email: "bob@example.com", role: "Editor", status: "Inactive" },
    ],
    roles: [
      { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
      { id: 2, name: "Editor", permissions: ["Read", "Write"] },
      { id: 3, name: "Viewer", permissions: ["Read"] },
    ],
  };
  