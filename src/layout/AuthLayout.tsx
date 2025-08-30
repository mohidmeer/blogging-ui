import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
    return (
        <main className='flex h-screen justify-center items-center'>
            <Outlet />
        </main>
    );
};

export default AuthLayout;
