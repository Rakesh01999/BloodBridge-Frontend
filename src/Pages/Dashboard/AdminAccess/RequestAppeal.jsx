import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaCheck, FaTimes } from 'react-icons/fa';

const RequestAppeal = () => {
    const axiosPublic = useAxiosPublic();

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['donationRequests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/information');
            return res.data.filter(user => user.status === 'Acceptor_pending');
        }
    });

    const handleApprove = async (user) => {
        try {
            // First, fetch the current blood quantity for the requested blood group
            const bloodGroupsResponse = await axiosPublic.get('/bloodGroups');
            const bloodGroups = bloodGroupsResponse.data;
            const requestedBloodGroup = bloodGroups.find(group => group.bloodGroup === user.bloodgroup);

            if (!requestedBloodGroup) {
                throw new Error('Blood group not found');
            }

            // if (requestedBloodGroup.bloodQuantity < user.quantity) {
            if (requestedBloodGroup.bloodQuantity < user.Acc_quantity) {
                Swal.fire({
                    title: "Insufficient Blood Quantity",
                    text: `The requested quantity (${user.Acc_quantity}) is more than the available quantity (${requestedBloodGroup.bloodQuantity}).`,
                    icon: "error"
                });
                return;
            }

            const result = await Swal.fire({
                title: "Are you sure?",
                text: `Do you want to approve the blood request for ${user.name}?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#28a745",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, approve it!"
            });

            if (result.isConfirmed) {
                // Approve the request
                await axiosPublic.patch(`/information/${user._id}`, { status: "approved" });

                // Decrease the blood quantity
                await axiosPublic.patch('/bloodGroups1', {
                    bloodgroup: user.bloodgroup,
                    Acc_quantity: user.Acc_quantity
                });

                refetch();
                Swal.fire({
                    title: "Approved!",
                    text: "The blood request has been approved and blood quantity updated.",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error("Error in approval process:", error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while processing the request.",
                icon: "error"
            });
        }
    };

    const handleReject = user => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to reject the blood request for ${user.name}?`,
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
                                text: "The blood request has been rejected.",
                                // icon: "error"
                                icon: "alert"
                            });
                        }
                    })
            }
        });
    };

    return (
        <div>
            <h3 className='text-center font-bold text-3xl text-red-500 mt-24'>Welcome Blood Request Appeal</h3>
            <div className="overflow-x-auto my-8">
                <table className="table w-full">
                    <thead className='bg-red-500 text-white lg:text-lg'>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Disease</th>
                            <th>Blood Group</th>
                            <th>Quantity</th>
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
                                    <td>{user.Acc_quantity}</td>
                                    {/* <td>{user.status}</td> */}
                                    <td>pending</td>
                                    <td>
                                        {user.status === 'Acceptor_pending' && (
                                            <div className="flex space-x-2">
                                                <button onClick={() => handleApprove(user)} className="btn btn-success btn-sm">
                                                    <FaCheck /> Approve
                                                </button>
                                                <button onClick={() => handleReject(user)} className="btn btn-danger btn-sm">
                                                    <FaTimes /> Reject
                                                </button>
                                            </div>
                                        )}
                                        {user.status !== 'Acceptor_pending' && (
                                            <span className={`badge ${user.status === 'approved' ? 'badge-success' : 'badge-danger'}`}>
                                                {user.status}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">
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

export default RequestAppeal;