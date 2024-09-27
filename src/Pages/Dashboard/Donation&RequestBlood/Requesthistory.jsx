import { useQuery } from "@tanstack/react-query";
import React, { useContext } from 'react';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';

const Requesthistory = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const {
        data: bloodRequests = [],
        isLoading,
        refetch
    } = useQuery({
        queryKey: ["bloodRequests", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/information1/${user?.email}`);
            // Filter for blood requests (those with Acc_quantity)
            return res.data.filter(item => item.Acc_quantity);
        },
    });

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Loading.....</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Helmet>
                <title>BloodBridge | Blood Request History</title>
            </Helmet>
            <h2 className="text-3xl font-bold text-center my-6 text-red-600">Your Blood Request History</h2>
            <div className="overflow-x-auto mt-4">
                <table className="table table-zebra w-full border border-gray-300 rounded-lg shadow-lg">
                    <thead className="bg-red-600 text-white">
                        <tr>
                            <th className="p-4">Date</th>
                            <th className="p-4">Blood Group</th>
                            <th className="p-4">Requested Quantity</th>
                            <th className="p-4">Status</th>
                            {/* Uncomment this if you want to add action buttons */}
                            {/* <th className="p-4">Action</th> */}
                        </tr>
                    </thead>
                    {/* <tbody>
                        {bloodRequests.length > 0 ? (
                            bloodRequests.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-100">
                                    <td className="p-4">{item.date}</td>
                                    <td className="p-4">{item.bloodgroup}</td>
                                    <td className="p-4">{item.Acc_quantity}</td>
                                    <td className="p-4">
                                        <span className={`badge ${item.status === 'approved' ? 'badge-success' : 'badge-error'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center p-4">No blood request history found</td>
                            </tr>
                        )}
                    </tbody> */}

<tbody>
                        {bloodRequests.length > 0 ? (
                            bloodRequests.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-100">
                                    <td className="p-4">{item.date}</td>
                                    <td className="p-4">{item.bloodgroup}</td>
                                    <td className="p-4">{item.Acc_quantity}</td>
                                    <td className="p-4">
                                        {item.status === 'Acceptor_pending' ? (
                                            <span className="badge badge-warning">pending</span>
                                        ) : (
                                            <span className={`badge ${item.status === 'approved' ? 'badge-success' : 'badge-error'}`}>
                                                {item.status}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center p-4">No blood request history found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Requesthistory;
