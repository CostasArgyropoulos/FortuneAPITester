import React from 'react';
import MainLayout from './main-layout/MainLayout';
import { ApiProvider } from './context/ApiContext';
import './App.css'

const App = () => {
    return (
        <ApiProvider>
            <div className="App">
                <h1>Fortune API Tester</h1>
                <MainLayout />
            </div>
        </ApiProvider>
    );
};

export default App;