# Blog Project Backend

This project is a backend implementation for a blogging platform with support for user authentication, role-based access control, and CRUD operations for blogs. Admins and users have different permissions, ensuring a secure and well-defined system.

## Technologies
- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**

## Features

### 1. User Roles
#### Admin:
- Can delete any blog.
- Can block users (set `isBlocked` to `true`).
- Cannot update any blog.

#### User:
- Can register, log in, and manage their own blogs.
- Can create, update, and delete their own blogs.
- Cannot perform admin actions.

### 2. Authentication & Authorization
- **Authentication:** Users must log in to perform write, update, and delete operations.
- **Authorization:** Admin and user roles are secured with differentiated permissions.

### 3. Blog API
- Publicly accessible blog reading API.
- Supports search, sort, and filter functionalities.

Live link -[]