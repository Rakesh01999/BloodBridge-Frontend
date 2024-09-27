import React, { useContext, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';

const UpdateBloodBank = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [startDate, setStartDate] = useState(new Date());
    const [id, setId] = useState(null)
    const {
        data: blood = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["blood"],
        queryFn: async () => {
            const res = await axiosPublic.get("/bloodGroups");
            return res.data;
        },
    });
    if (isLoading) {
        return <div>Loading.....</div>;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        let email = form.email.value;
        let name = form.name.value;
        let Phone_number = form.phone_number.value;
        let date = form.date.value;
        let bloodgroup = form.blood.value;
        let status = "Acceptor_pending";
        let Acc_quantity = form.quantity.value;
        document.getElementById(id).close()

        let amount = blood?.filter((item) => item.bloodGroup === bloodgroup)


        if (amount[0].bloodQuantity < Acc_quantity) {
            Swal.fire({
                title: "Opps!",
                text: `I have not ${Acc_quantity} ml blood`,
                icon: "error",
            });
            return
        }

        const Information = {
            email, name, Phone_number, date, bloodgroup, status, Acc_quantity
        }

        axiosPublic
            .post("/information", Information)
            .then((res) => {
                // axiosSecure.patch("/bloodGroups1", Information).then(() => {
                axiosPublic.patch("/bloodGroups1", Information).then(() => {
                    Swal.fire({
                        title: "Accepted!",
                        text: "Blood Quantity has been Updated.",
                        icon: "success",
                    });
                    refetch()
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
        // form.reset();
    }

    return (
        <div>
            <h3 className='text-center font-bold text-3xl mt-24'> Update Blood Bank</h3>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Blood Group</th>
                                <th>Quantity</th>
                                <th>Update (Action)</th>
                            </tr>
                        </thead>
                        {blood?.map((item, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <th>{index + 1}</th>
                                        <td>{item.bloodGroup}</td>
                                        <td>{item.bloodQuantity}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    document.getElementById(item._id).showModal()
                                                    setId(item._id)
                                                }
                                                }
                                            >
                                                Update
                                            </button>
                                            <section>
                                                <dialog
                                                    id={item._id}
                                                    className="modal modal-middle sm:modal-middle"
                                                >
                                                    <div className="modal-box">
                                                        <h3 className="font-bold text-lg text-center">Acceptor Information</h3>
                                                        <form onSubmit={handleSubmit} className="card-body">
                                                            
                                                            <div className="flex space-x-3 ml-[-20px]">
                                                                <div className="">
                                                                    <label className="label">
                                                                        <span className="label-text text-black ">
                                                                            Group
                                                                        </span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="A+"
                                                                        className="input input-bordered"
                                                                        defaultValue={item.bloodGroup}
                                                                        name="blood"
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="">
                                                                    <label className="label">
                                                                        <span className="label-text text-black ">
                                                                            Qunatity
                                                                        </span>
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        placeholder="80ml"
                                                                        className="input input-bordered"
                                                                        name="quantity"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="flex justify-center">
                                                                <input
                                                                    type="submit"
                                                                    className="lg:mt-4 md:mt-4 mt-2 btn btn-primary w-24 lg:w-[200px] "
                                                                    value="Submit"
                                                                />
                                                            </div>
                                                        </form>
                                                        <div className="modal-action">
                                                            <form method="dialog">
                                                                {/* if there is a button in form, it will close the modal */}
                                                                <button className="btn">Close</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </dialog>
                                            </section>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UpdateBloodBank;
