import React from 'react';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            hello
            <Outlet></Outlet>
        </div>
    );
};

export default Main;