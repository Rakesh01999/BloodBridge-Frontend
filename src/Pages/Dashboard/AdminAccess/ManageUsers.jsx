import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';

const ManageUsers = () => {
    const axiosPublic = useAxiosPublic();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    })
    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                // axiosSecure.delete(`/users/${user._id}`)
                axiosPublic.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleMakeAdmin = user => {
        // axiosSecure.patch(`/users/admin/${user._id}`)
        axiosPublic.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now !`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    console.log(users);
    return (
        <div>
            <h3 className='text-center font-bold text-3xl mt-24'>Users can be managed here</h3>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl ">All Users</h2>
                <h2 className="text-3xl ">Total Users: {users.length}</h2>
            </div>

            {/* table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(
                                (user, index) =>
                                    <tr className="hover" key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="btn bg-yellow-500 btn-lg ">
                                                <FaUsers className="text-white text-2xl " />
                                            </button>}
                                        </td>
                                        <td>
                                            <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-lg ">
                                                <FaTrashAlt className="text-red-500" />
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;