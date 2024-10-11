# Fortune API Tester

The aim of this project is to set up an API communication environment with our application and avoid resetting it every time. We do not have to recreate JSON files while testing the endpoint or worry about them being in the correct format. This version works for our Procureship Integration for RFQ confirmations, but it can be expanded for every web service we have, or we could even make it more generic and set our tests by providing only the schema.

### Available Scripts

- From the default working directory, copy `.env.sample` and paste it in the same path as `.env`.
- Modify the properties to target your Business Central instance.
- **Note:** You do not need to provide `REACT_APP_DEFAULT_WEBSERVICE` and `REACT_APP_DEFAULT_FUNCTION`, but doing so could save you some time if you want to avoid re-adding them in the text inputs on every browser refresh.
- Open a second terminal in your VS Code and change the directory to the server folder (`cd ./server`).
- Copy `.env.sample` and paste it in the same path as `.env`.
- Modify the properties to provide the Azure Portal credentials (and the sandbox tenant ID).

From the terminal in the default project folder, run: `npm start` (run `npm install` if you have not downloaded packages yet).  
From the terminal in the server directory, run `node server.js`.