# Car Rental Reservation System

## Project Overview

The **Car Rental Reservation System** is a backend application that manages car rental services. The system allows users to register, log in, and book cars for specified durations. Admins have additional functionalities such as managing car details, overseeing bookings, and calculating ride costs. The application ensures data consistency using MongoDB transactions and supports various CRUD operations with soft deletion features.

## Live URL

- The live application can be accessed at: **[Upcoming]**

## Features

### Admin Features:

- **Car Management (CRUD Operations)**: Admins can create, update, delete (soft delete), and view cars.
- **Booking Oversight**: View and manage all car bookings.
- **Cost Calculation**: Calculate ride cost based on start time, end time, and car's price per hour.

### User Features:

- **User Registration & Authentication**: Sign up and log in securely.
- **Car Booking**: Browse available cars and book them for desired times.
- **Booking History**: View booking history with details.
- **Car Return**: Return a booked car and automatically calculate the total cost.

### General Features:

- **Soft Delete Functionality**: Car records can be soft-deleted and restored.
- **Error Handling**: Implements comprehensive error handling throughout the app.
- **Transaction & Rollback Support**: MongoDB transaction handling ensures data integrity during the booking process.

## Technology Stack

- **Backend**:
  - [Node.js](https://nodejs.org)
  - [Express.js](https://expressjs.com/)
- **Database**:
  - [MongoDB](https://www.mongodb.com/)
  - [Mongoose](https://mongoosejs.com/)
- **Languages**:
  - TypeScript
- **Authentication**:
  - [JWT (JSON Web Token)](https://jwt.io/)
- **Error Handling**:
  - Custom middleware and utility functions for standardized error responses.

## Installation and Setup

Follow these steps to set up the project locally:

### 1. Clone the repository:

```bash
git clone https://github.com/ShahinAlomShuvo/Car-Rental-Reservation-System-Backend.git
cd Car-Rental-Reservation-System-Backend
npm install
```
