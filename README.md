# Fortune API Tester

This project provides a dynamic environment to test APIs and Business Central web services. All settings (environment, Business Central connection, and server OAuth credentials) are stored **in local storage at runtime** and can be updated via the UI. The application automatically builds API URLs, stringifies POST data, and applies parameters as needed. This version supports Procureship Integration for RFQ confirmations but is fully expandable for any other web service or API endpoint.

## Features

- Configure **Environment Settings**, **Business Central API Connection**, and **Server OAuth Settings** directly from the browser.
- Local storage persists your settings between sessions.
- Dynamically builds API URLs based on the current settings.
- Automatically applies parameters and stringifies POST data before sending.
- Supports **GET** and **POST** requests with optional filters and sample data generation.
- Response messages and errors are displayed in the UI.
- Works for generic Business Central endpoints, OData web services, and codeunit functions.

## Developer Notes

- Clone the project from GitHub
- From the default project folder, run: `npm run build` (run `npm install` if you have not downloaded packages yet).
- From the terminal in the server directory, run `node server.js`.

**➡️ Once the server is running, open your browser and go to: `http://localhost:5000`**

> 💡 _To make the application publicly accessible (e.g., for testing or demos), you can use [Ngrok](https://ngrok.com/) by running `ngrok http 5000` in a separate terminal._
