
# RBAC (Role-Based Access Control) System

This project implements a simple Role-Based Access Control (RBAC) system with a **User Management**, **Role Management**, **Permission Management**, and a **Permission Matrix**. The backend is mocked using `json-server`, and the frontend is built with React. It allows users to manage roles, permissions, and the assignment of roles to users.

## Features
- **User Management**: Add, edit, delete users, and assign roles.
- **Role Management**: Manage roles such as Admin, User, Editor.
- **Permission Management**: Manage permissions such as Create, Read, Update, Delete.
- **Permission Matrix**: Visualize roles and permissions assigned to users.
- **Mock Backend**: Using `json-server` to mock the backend for users, roles, and permissions.

## Prerequisites
To run this project, you need to have the following installed on your machine:
- **Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed (version 14.x or later).
- **npm**: Comes with Node.js, so you should have it as well.

## Setup Instructions

### 1. **Clone the Repository**
Clone this repository to your local machine:
```bash
git clone https://github.com/your-username/rbac-system.git
cd rbac-system
```

### 2. **Install Dependencies**
Run the following command to install the dependencies for the frontend:
```bash
npm install
```

### 3. **Run Mock Backend with json-server**

Before running the frontend, you need to start the **mock backend** using `json-server`. This mock backend will simulate an API to handle users, roles, and permissions.

In the project directory, run:
```bash
npx json-server --watch src/mock-server.json --port 3000
```
This will start the mock backend at `http://localhost:3000`, which will provide the data for **users**, **roles**, and **permissions**.

- `mock-server.json` contains mock data for users, roles, and permissions.

### 4. **Run Frontend**

Now that the mock backend is running, you can start the frontend. In a new terminal window or tab, run:
```bash
npm start
```
This will start the frontend at `http://localhost:3001` (or another port if `3001` is already in use). The frontend will fetch data from the backend (running at `http://localhost:3000`).

### 5. **Visit the Application**

- Open a web browser and go to `http://localhost:3001` to see the RBAC system in action.
- The page will display a **User Management** section, **Role Management**, **Permission Matrix**, and a **Legend** for understanding the matrix icons.

## Data Structure for Mock Backend

### `src/mock-server.json`
This file contains mock data for users, roles, and permissions. Here is the structure of the mock data:

```json
{
  "users": [
    { "id": 1, "name": "Alice", "email": "alice@example.com", "role": "Admin", "status": "Active" },
    { "id": 2, "name": "Bob", "email": "bob@example.com", "role": "User", "status": "Inactive" }
  ],
  "roles": [
    { "id": 1, "name": "Admin" },
    { "id": 2, "name": "User" },
    { "id": 3, "name": "Editor" }
  ],
  "permissions": [
    { "id": 1, "name": "Create" },
    { "id": 2, "name": "Read" },
    { "id": 3, "name": "Update" },
    { "id": 4, "name": "Delete" }
  ]
}
```

- **Users**: List of users with `id`, `name`, `email`, `role`, and `status`.
- **Roles**: List of roles like `Admin`, `User`, `Editor`.
- **Permissions**: List of permissions like `Create`, `Read`, `Update`, `Delete`.

## Key Features and Components

### 1. **User Management**:
   - Users can be created, updated, or deleted.
   - Each user is assigned a role (e.g., Admin, User).
   - The user's role and status are displayed in the User Management section.

### 2. **Role Management**:
   - Roles are predefined (Admin, User, Editor).
   - Roles are assigned to users when creating or editing them.

### 3. **Permission Management**:
   - Permissions are defined for each role (e.g., Create, Read, Update, Delete).
   - Permissions are displayed in the **Permission Matrix**.

### 4. **Permission Matrix**:
   - The **Permission Matrix** visualizes which users have which roles and permissions.
   - The matrix displays a `Check` mark if the user has the role or permission and an `X` mark if they don't.

### 5. **Mock Backend**:
   - The backend is mocked using `json-server`, which handles the CRUD operations for users, roles, and permissions.
   - The data is stored in `src/mock-server.json`, and the backend is accessible via `http://localhost:3000`.

## Example Screenshots

- **User-Role Matrix**: A table showing which users are assigned which roles.
- **Role-Permission Matrix**: A table showing which roles have which permissions.
- **Permission Matrix Legend**: A section explaining the meaning of the icons used in the matrices.

## Extending the System

This system can be extended by adding the following features:
- **Dynamic Permission Assignment**: Allow roles to have dynamically assignable permissions.
- **Role Editing**: Allow roles to be added, edited, or deleted.
- **Logging and Audit**: Keep track of user actions and role changes.

## Contributing

If you would like to contribute to this project, please fork the repository, make your changes, and submit a pull request. Feel free to open issues for bug reports or feature requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Enjoy managing your users, roles, and permissions with ease!
