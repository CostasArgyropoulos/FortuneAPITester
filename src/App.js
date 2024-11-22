import React from "react";
import { ApiProvider } from "./context/ApiContext";
import AppRouter from "./components/AppRouter";

const App = () => {
  return (
    <ApiProvider>
      <AppRouter />
    </ApiProvider>
  );
};

export default App;
