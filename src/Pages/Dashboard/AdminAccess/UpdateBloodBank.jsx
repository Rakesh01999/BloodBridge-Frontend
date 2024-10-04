import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const UpdateBloodBank = () => {
    const axiosPublic = useAxiosPublic();
    const [id, setId] = useState(null);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
    const [quantity, setQuantity] = useState('');

    const { data: blood = [], isLoading, refetch } = useQuery({
        queryKey: ['blood'],
        queryFn: async () => {
            const res = await axiosPublic.get('/bloodGroups');
            return res.data;
        },
    });

    if (isLoading) {
        return <div>Loading.....</div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const bloodgroup = selectedBloodGroup || e.target.blood.value;
        const updatedQuantity = parseInt(quantity) || parseInt(e.target.quantity.value); // Ensure it's an integer

        // Validate that the quantity is not less than 1
        if (updatedQuantity < 1) {
            Swal.fire({
                title: 'Error!',
                text: 'Quantity cannot be less than 1.',
                icon: 'error',
            });
            return;
        }

        document.getElementById(id).close();

        const updateData = { bloodgroup, quantity: updatedQuantity }; // Updated key to match your backend

        axiosPublic
            .patch('/bloodGroups', updateData)  // Make sure this matches your backend route
            .then(() => {
                Swal.fire({
                    title: 'Updated!',
                    text: 'Blood quantity has been updated.',
                    icon: 'success',
                });
                refetch();
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <div>
            <Helmet>
                <title>Blood Bridge | Update Blood Bank</title>
            </Helmet>
            <h3 className='text-center font-bold lg:text-3xl md:text-2xl text-red-500 mt-24 mb-4'>Update Blood Bank</h3>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className='bg-red-500 text-white lg:text-lg'>
                            <tr>
                                <th></th>
                                <th>Blood Group</th>
                                <th>Quantity</th>
                                <th>Update (Action)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blood.map((item, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{item.bloodGroup}</td>
                                    <td>{item.bloodQuantity}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                document.getElementById(item._id).showModal();
                                                setId(item._id);
                                                setSelectedBloodGroup(item.bloodGroup);
                                            }}
                                        >
                                            Update
                                        </button>
                                        <section>
                                            <dialog id={item._id} className="modal modal-middle sm:modal-middle">
                                                <div className="modal-box bg-red-300">
                                                    <h3 className="font-bold text-lg text-center">Update Blood Quantity</h3>
                                                    <form onSubmit={handleSubmit} className="card-body">
                                                        <div className="flex space-x-3 ml-[-20px]">
                                                            <div>
                                                                <label className="label">
                                                                    <span className="label-text text-black">Blood Group</span>
                                                                </label>
                                                                <select
                                                                    name="blood"
                                                                    className="select select-bordered"
                                                                    value={selectedBloodGroup}
                                                                    onChange={(e) => setSelectedBloodGroup(e.target.value)}
                                                                    required
                                                                >
                                                                    <option value="">Select a Blood Group</option>
                                                                    {blood.map((group, idx) => (
                                                                        <option key={idx} value={group.bloodGroup}>
                                                                            {group.bloodGroup}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label className="label">
                                                                    <span className="label-text text-black">Quantity</span>
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    min="1" // Ensure minimum value is 1
                                                                    placeholder="Enter Quantity"
                                                                    className="input input-bordered"
                                                                    value={quantity}
                                                                    onChange={(e) => setQuantity(e.target.value)}
                                                                    name="quantity"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-center">
                                                            <input
                                                                type="submit"
                                                                className='lg:mt-4 md:mt-4 mt-2 btn btn-primary bg-red-500 hover:rounded-full text-white w-24 lg:w-[200px]'
                                                                value="Submit"
                                                            />
                                                        </div>
                                                    </form>
                                                    <div className="modal-action flex justify-center">
                                                        <form method="dialog">
                                                            <button className="btn hover:bg-red-500 hover:text-white hover:rounded-full">Close</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>
                                        </section>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UpdateBloodBank;
