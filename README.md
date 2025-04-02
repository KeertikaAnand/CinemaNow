# CinemaNow

Movie ticket booking web application built with the MERN stack (MongoDB, Express, React, NodeJS) and Tailwind CSS.

## Features

-   Browse and view movie showtimes.
-   Book seats for available showtimes.
-   View purchased tickets.
-   Admin panel for managing cinemas, theaters, movies, showtimes, and users.
-   Responsive design.

## Technologies

-   **Frontend:** React v18.2.0, React Router Dom v6.14.2, React Hook Form v7.45.4, Tailwind CSS v3.3.3, Vite v4.4.8
-   **Backend:** NodeJS, Express v4.18.2, Mongoose v7.4.2, MongoDB.

## How to Run

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    ```

2.  **Backend Setup:**
    -   Navigate to the `server` directory: `cd server`
    -   Create a `.env` file with the following variables:
        ```
        PORT=8080
        DATABASE=<your MongoDB connection string URI>
        JWT_SECRET=<any random JWT secret>
        JWT_EXPIRE=30d
        JWT_COOKIE_EXPIRE=30
        ```
    -   Install dependencies: `npm install`
    -   Start the server: `npm start`

3.  **Frontend Setup:**
    -   Navigate to the `client` directory: `cd client`
    -   Install dependencies: `npm install`
    -   Start the development server: `npm run dev`

## Usage

-   **View Showtimes:** Browse movies and cinemas to find available showtimes.
-   **Book Tickets:** Select seats and purchase tickets for a showtime (requires login).
-   **Admin Panel:** Manage various aspects of the application (admin access required).

## Project Purpose

This project was created to enhance full-stack web development skills using the MERN stack and Tailwind CSS.
