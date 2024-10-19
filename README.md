# Travel App

Welcome to the **Travel App**! This project is a web application designed for travel enthusiasts, enabling users to discover and book travel experiences. The application is built using a microservices architecture for the backend and React for the frontend.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Management**: Users can register, log in, and manage their profiles.
- **Travel Blog**: A section for users to read and share travel stories and tips.
- **Hotel Booking**: Users can search for hotels, view details, and make reservations.
- **Comments & Ratings**: Users can leave comments and rate hotels.
- **Admin Panel**: Admins can manage users, blogs, and hotel data.

## Technologies Used

- **Frontend**: 
  - React
  - Redux (for state management)
  - Axios (for API calls)

- **Backend**:
  - Node.js
  - Express
  - MongoDB (for NoSQL data storage)
  - MySQL (for relational data storage)
  - Mongoose (for MongoDB object modeling)
  - JWT (for authentication)

## Architecture

The application is structured using a microservices architecture. Each service is responsible for a specific functionality, allowing for better scalability and maintainability. The key services include:

- **User Management Service**: Handles user registration, authentication, and profile management.
- **Blog Service**: Manages blog posts, comments, and user interactions.
- **Booking Service**: Handles hotel listings, reservations, and user ratings.


## Getting Started

### Prerequisites

- Node.js (version 14.17.0 or higher)
- MongoDB
- MySQL
- npm (Node package manager)

### Installation

1. **Clone the repository**:
   ```bash
   [git clone https://github.com/yourusername/travel-app.git](https://github.com/HoangDuonng/Travel_Project.git)
2. **Install dependencies for the backend**:
   ```bash
   cd Back_End_Microservices
   npm install
3. **Install dependencies for the frontend**:
   ```bash
   cd ../Front_End_React
   npm install
4. **Setup the environment variables**: Create a .env file in the backend directory and add your database connection strings and other necessary variables.
   
5. **Start the backend server**: *This is an example of running a single backend service (User Management Service) as the API Gateway has not been set up yet*.
   ```bash
   cd ../Back_End_Microservices/services/user_management
   npm start
   
6. **Start the frontend application**: 
   ```bash
   cd ../Back_End_Microservices/services/user_management
   npm start


API Documentation
This project includes RESTful APIs for educational purposes.

## Note

This project is for educational purposes only and is not intended for commercial use.



