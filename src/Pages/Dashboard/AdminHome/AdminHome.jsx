import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

const AdminHome = () => {

    const {user} = useContext(AuthContext);
    return (
        <div>
            <div>
                <h3 className='text-center font-bold text-3xl text-red-500 mt-20'> Admin Dashboard</h3>
                <h3 className='text-center font-bold text-3xl'> Welcome Admin: {user?.displayName}</h3>
            </div>
        </div>
    );
};

export default AdminHome;
