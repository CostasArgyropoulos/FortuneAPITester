import React from 'react';
import QuoteList from '../procureship-confirmation/QuoteList';
import OrderList from '../procureship-confirmation/OrderList';
import ReceiptList from '../procureship-confirmation/ReceiptList';
import ApiDefinitions from '../api/ApiDefinitions';

import '../styles.css'

const MainLayout = () => {
    return (
        <div className="main-layout">
            <h2>Procureship Confirmation</h2>
            <ApiDefinitions />
            <div className="card-container">
                <QuoteList />
                <OrderList />
                <ReceiptList />
            </div>
        </div>
    );
};

export default MainLayout;