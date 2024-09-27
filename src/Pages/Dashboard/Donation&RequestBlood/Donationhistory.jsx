import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Donationhistory = () => {

    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [filteredDonations, setFilteredDonations] = useState([]);
    

    const { data: donations = [], refetch } = useQuery({
        queryKey: ['donations', user?.email],
        queryFn: async () => {
            // const res = await axiosSecure.get(`information/${user.email}`)
            const res = await axiosPublic.get(`information/${user.email}`)
            return res.data;
        }
    })

    useEffect(() => {
        if (donations.length > 0 && user) {
            // console.log("Filtering payments for user:", user.email);
            const foundDonation = donations.filter(info => info.email === user.email);
            // const foundBiodata = biodatas.find(bio => bio.ContactEmail === user.email);
            setFilteredDonations(foundDonation);
            // console.log("Filtered biodata:", foundPayment);
            // console.log("Filtered Payment:", filteredPayment);
        }
    }, [donations, user]);

    console.log(donations);

    return (
        <div>
            <Helmet>
                <title>BloodBridge | Donation History</title>
            </Helmet>
            <h2 className="text-xl md:text-3xl text-center text-red-600 font-bold mt-14">Donation History</h2>
            <div className='max-w-[370px] md:max-w-[540px] lg:max-w-[1540px] mx-auto px-4 md:px-8 py-8 md:py-12  rounded-3xl flex flex-col md:flex-row items-center mb-10'>
                <div className="mx-auto grid grid-cols-1 gap-4">
                    <div className="overflow-x-auto">
                        <table className="table bg-red-300">
                            {/* head */}
                            <thead>
                                <tr className="font-bold md:text-xl bg-red-500 text-white">
                                    <th>User Name</th>
                                    <th>User Name</th>
                                    <th>Disease</th>
                                    <th>Donation Date</th>
                                    <th>Donation Quantity</th>
                                    <th>Blood Group</th>
                                    <th><div>Action</div></th>
                                </tr>
                            </thead>
                            <tbody className="md:text-xl">
                                {/* row 1 */}

                                {donations.map((donor) => (
                                    <tr className='hover'
                                        key={donor._id}
                                        donor={donor}
                                    >
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={donor.photo} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <div className="font-semibold">{donor.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td>
                                            <span className="">{donor.disease}</span>
                                        </td>
                                        <td>{donor.date}</td>
                                        <td>{donor.quantity}</td>
                                        <td>{donor.bloodgroup}</td>
                                        <td>

                                            <button onClick={() => handleIncrement(donor.bookId, donor._id)} className="btn btn-sm md:h-12 btn-success text-white">Return</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Donationhistory;