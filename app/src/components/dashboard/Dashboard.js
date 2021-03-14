import React from 'react';
import { useLocation, useHistory, Redirect } from 'react-router-dom';

const Dashboard = () => {
    const history = useHistory();
    const location = useLocation();

    if (!location.state) {
        return (
            <div>
                <Redirect to="/" />
            </div>
        );
    } else {
        const username = location.state.username;
        return <div>Test Dashboard. Welcome {username}!</div>;
    }
};

export default Dashboard;
