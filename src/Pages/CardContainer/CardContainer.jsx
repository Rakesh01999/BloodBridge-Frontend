import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const CardContainer = () => {
    const axiosPublic = useAxiosPublic();

    const { data: bloodGroups = [], isLoading } = useQuery({
        queryKey: ['bloodGroups'],
        queryFn: async () => {
            const res = await axiosPublic.get('/bloodGroups');
            return res.data;
        }
    });
    // console.log(bloodGroups);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    const getColorClass = (bloodGroup) => {
        const colors = {
            'A+': 'bg-red-500',
            'A-': 'bg-red-400',
            'B+': 'bg-blue-500',
            'B-': 'bg-blue-400',
            'AB+': 'bg-purple-500',
            'AB-': 'bg-purple-400',
            'O+': 'bg-green-500',
            'O-': 'bg-green-400'
        };
        return colors[bloodGroup] || 'bg-gray-500';
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-red-500 mb-8">Available Blood Groups</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {bloodGroups.map((group) => (
                    <div key={group._id} className="card shadow-xl">
                        <div className={`card-body ${getColorClass(group.bloodGroup)} text-white`}>
                            <h2 className="card-title text-4xl justify-center">{group.bloodGroup}</h2>
                            <p className="text-center text-2xl mt-4">
                                Available: <span className="font-bold">{group.bloodQuantity}</span> units
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardContainer;