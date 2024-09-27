import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';

const Donationhistory = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const { data: donations = [], isLoading, refetch } = useQuery({
        queryKey: ['donations', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`information/${user.email}`);
            // Filter for blood donations (those with quantity, not Acc_quantity)
            return res.data.filter(item => item.quantity && !item.Acc_quantity);
        }
    });

    // const handleDelete = async (id) => {
    //     try {
    //         const result = await Swal.fire({
    //             title: 'Are you sure?',
    //             text: "You won't be able to revert this!",
    //             icon: 'warning',
    //             showCancelButton: true,
    //             confirmButtonColor: '#3085d6',
    //             cancelButtonColor: '#d33',
    //             confirmButtonText: 'Yes, delete it!'
    //         });

    //         if (result.isConfirmed) {
    //             await axiosPublic.delete(`/information/${id}`);
    //             refetch();
    //             Swal.fire(
    //                 'Deleted!',
    //                 'Your donation record has been deleted.',
    //                 'success'
    //             );
    //         }
    //     } catch (error) {
    //         console.error("Error deleting record:", error);
    //         Swal.fire(
    //             'Error!',
    //             'There was a problem deleting the record.',
    //             'error'
    //         );
    //     }
    // };

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Loading.....</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <Helmet>
                <title>BloodBridge | Donation History</title>
            </Helmet>
            <h2 className="text-3xl font-bold text-center my-6 text-red-600">Your Donation History</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full border border-gray-300 rounded-lg shadow-lg">
                    <thead className="bg-red-500 text-white">
                        <tr>
                            <th className="p-4">Date</th>
                            <th className="p-4">Blood Group</th>
                            <th className="p-4">Donated Quantity</th>
                            <th className="p-4">Disease</th>
                            <th className="p-4">Status</th>
                            {/* <th className="p-4">Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {donations.length > 0 ? (
                            donations.map((donation) => (
                                <tr key={donation._id} className="hover:bg-gray-100">
                                    <td className="p-4">{donation.date}</td>
                                    <td className="p-4">{donation.bloodgroup}</td>
                                    <td className="p-4">{donation.quantity}</td>
                                    <td className="p-4">{donation.Disease || 'N/A'}</td>
                                    <td className="p-4">
                                        <span className={`badge ${donation.status === 'approved' ? 'badge-success' : donation.status === 'pending' ? 'badge-warning' : 'badge-error'}`}>
                                            {donation.status}
                                        </span>
                                    </td>
                                    {/* Uncomment this if you want to add delete functionality */}
                                    {/* <td className="p-4">
                                        <button 
                                            onClick={() => handleDelete(donation._id)} 
                                            className="btn btn-error btn-sm"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </td> */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center p-4">No donation history found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Donationhistory;
