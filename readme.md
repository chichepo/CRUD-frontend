
# Frontend React App for CRUD Operations

## Project Description

This is a frontend React application designed to perform CRUD (Create, Read, Update, Delete) operations. It interacts with a backend API to manage "External Parameters." The application provides a user interface for adding, editing, viewing, and deleting these parameters.

## Features

- List all external parameters
- Add a new external parameter
- Edit an existing external parameter
- Delete an external parameter

## How to Set Up

### Prerequisites

- Node.js
- npm or yarn

### Installation Steps

1. Clone the repository to your local machine.
2. Navigate to the project directory in the terminal.
3. Run `npm install` to install all the project dependencies.
4. Run `npm start` to start the development server. The application should open in your default web browser.

## Folder Structure

- `src/`: Contains the main application code
  - `App.js`: Main application component
  - `index.js`: Entry point for the React application
- `package.json`: Defines project dependencies and scripts


React Frontend for CRUD Operations
This project serves as the frontend for managing External Parameters. It is built using React and communicates with a backend service to perform CRUD operations.

Table of Contents
Setting Up the Project
Usage
Setting Up the Project
Clone the Repository

bash
Copy code
git clone https://github.com/your-username/your-frontend-repository.git
cd your-frontend-repository
Install Dependencies

Run the following command to install the required packages:

bash
Copy code
npm install
Environment Variables

Create a .env file at the root of your project and add the following:

env
Copy code
REACT_APP_BACKEND_URL=http://localhost:3001
This will set up the base URL for your backend service. Replace http://localhost:3001 with the URL where your backend is running, if different.

Run the Project

bash
Copy code
npm start
This will start the development server at http://localhost:3000.

Usage
Home Page

When you open the application, you will see a table displaying the existing External Parameters. You can perform the following actions:

Create a new parameter
Edit an existing parameter
Delete a parameter
Forms

Use the forms below the table to add or edit parameters.