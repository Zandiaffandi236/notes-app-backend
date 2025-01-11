# Notes App API

A simple API to manage notes, developed after completing the "Beginner Back-End with JavaScript" course from Dicoding Indonesia. This application aims to build an API that can be consumed by a frontend and provides basic CRUD operations for note management.

## Features

- **Create**: Add new notes.
- **Read**: Retrieve existing notes.
- **Update**: Modify existing notes.
- **Delete**: Remove notes.
- **Error Handling**: Handles errors and invalid requests gracefully.

## File Structure

The project structure is organized as follows:

```
Notes App API/
├── package.json               # Project dependencies
├── package-lock.json          # Dependency lock file
├── eslint.config.mjs          # ESLint configuration for code style enforcement
└── src/
    ├── server.js              # Initializes and configures the Hapi server
    ├── routes.js              # Declares available routes
    ├── handler.js             # Defines route handlers
    └── notes.js               # Stores notes data in an array
```

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Zandiaffandi236/notes-app-backend.git
   ```
2. Go to working directory:
   ```bash
   cd notes-app-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:

   ```bash
   npm run start:dev
   ```

   If you wish to modify the `npm run start:dev` command, you can do so by editing the script array in the `package.json` file.

## Usage

- You can use **Postman** to interact with this API, integrate it with your frontend application, or deploy it on a cloud server.

## Technologies Used

- JavaScript
- Node.js
- Hapi
- ESLint

## Contact

- Email: [marzandi.leta@gmail.com](mailto:marzandi.leta@gmail.com)
- LinkedIn: [Marzandi Zahran Affandi Leta](https://linkedin.com/in/marzandi-zahran-affandi-leta-5b69a9175/)
