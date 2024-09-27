import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaCheck, FaTimes } from 'react-icons/fa';

const DonationAppeal = () => {
    const axiosPublic = useAxiosPublic();

    // Fetching donation requests (users with pending status)
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['donationRequests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/information');
            // return res.data;
            // Filter only requests with status 'pending'
            return res.data.filter(user => user.status === 'pending');

        }
    });

    // Handle approving donation request
    const handleApprove = user => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to approve the donation request for ${user.name}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/information/${user._id}`, { status: "approved" })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Approved!",
                                text: "The donation request has been approved.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };

    // Handle rejecting donation request
    const handleReject = user => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to reject the donation request for ${user.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, reject it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/informationRej/${user._id}`, { status: "rejected" })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Rejected!",
                                text: "The donation request has been rejected.",
                                icon: "error"
                            });
                        }
                    })
            }
        });
    };

    return (
        <div>
            <h3 className='text-center font-bold text-3xl mt-24'>Manage Donation Appeals</h3>

            <div className="overflow-x-auto my-8">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Disease</th>
                            <th>Blood Group</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.Phone_number}</td>
                                    <td>{user.Disease}</td>
                                    <td>{user.bloodgroup}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        {user.status === 'pending' ? (
                                            <div className="flex space-x-2">
                                                <button onClick={() => handleApprove(user)} className="btn btn-success btn-sm">
                                                    <FaCheck /> Approve
                                                </button>
                                                <button onClick={() => handleReject(user)} className="btn btn-danger btn-sm">
                                                    <FaTimes /> Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span className={`badge ${user.status === 'approved' ? 'badge-success' : 'badge-danger'}`}>
                                                {user.status}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">
                                    No pending requests found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DonationAppeal;
