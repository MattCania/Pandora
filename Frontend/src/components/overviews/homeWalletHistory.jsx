import React from 'react';
import WalletHistory from './homeHistory';

const HomeWalletHistory = () => {
    const user = {
        profile: {
            currency: 'USD',
        },
    };

    const transactions = [
        { date: '2024-12-01', description: 'Coffee Shop', amount: -5.5, status: 'Completed' },
        { date: '2024-11-28', description: 'Salary', amount: 1500, status: 'Completed' },
        { date: '2024-11-20', description: 'Groceries', amount: -60, status: 'Pending' },
    ];

    return <WalletHistory user={user} transactions={transactions} />;
};

export default HomeWalletHistory;
