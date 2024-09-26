# DevTinder Backend Documentation

## Overview

DevTinder is a backend service designed to facilitate networking among developers. It allows users to create profiles, connect with other developers, send connection requests, and manage their professional network. This document provides a comprehensive guide to setting up, configuring, and using the DevTinder backend.

## System Requirements

- Node.js (version 16.20.1 or higher)
- MongoDB (remote or local installation)
- npm (Node Package Manager)

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repository/DevTinder.git
   cd DevTinder
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and populate it with the necessary environment variables:
   ```plaintext
   DB_URI=mongodb+srv://your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   PORT=3000
   ```

## Running the Application

- **Development Mode:**
  ```bash
  npm run dev
  ```
  This uses `nodemon` to watch for changes and restart the server automatically.

- **Production Mode:**
  ```bash
  npm start
  ```
  This runs the app with `node`.

## Project Structure

- **`src/`** - Contains the source code.
  - **`app.js`** - Entry point of the application. Sets up the server and middleware.
  - **`config/`** - Configuration files, including database connections.
  - **`models/`** - Mongoose models defining schemas for your data.
  - **`routes/`** - Router definitions for endpoints.
  - **`middleware/`** - Middleware functions for authentication and other purposes.
  - **`utils/`** - Utility functions and helpers.

## API Endpoints

### Authentication

- **POST /signup** - Register a new user.
- **POST /login** - Authenticate a user and return a JWT.
- **POST /logout** - Log out a user and clear the session.

### Profile Management

- **GET /profile/view** - Retrieve the profile of the currently logged-in user.
- **PATCH /profile/edit** - Update the profile information of the current user.
- **PATCH /profile/password** - Change the password for the current user.

### Connection Requests

- **POST /request/send/:status/:userId** - Send a connection request to another user.
- **POST /request/review/:status/:requestId** - Review a connection request.

### User Connections

- **GET /user/requests/received** - Get all connection requests received by the user.
- **GET /user/connections** - Get all current connections of the user.
- **GET /user/feed** - Get profiles of other users to connect with.

## Database Schema

### User

- **firstName**: String
- **lastName**: String
- **emailID**: String, unique
- **password**: String
- **about**: String, default description
- **skills**: Array of Strings

## Security

- **Authentication**: Uses JSON Web Tokens (JWT) for secure authentication.
- **Password Hashing**: User passwords are hashed using bcrypt before storing in the database.

## Error Handling

- All API endpoints return appropriate HTTP status codes along with error messages in case of failures.

## Logging

- The application uses `morgan` or similar middleware for logging HTTP requests and responses.

## Testing

- **Unit Tests**: Written using Jest. Run them using `npm test`.
- **Integration Tests**: Ensure endpoints work as expected with the database.

## Deployment

- Suitable for deployment on platforms like Heroku, AWS, or any other cloud service that supports Node.js.

## Conclusion

This backend system for DevTinder provides robust features for developer networking and is designed for scalability and security. For contributions or issues, please refer to the repository's issues section or submit pull requests as needed.