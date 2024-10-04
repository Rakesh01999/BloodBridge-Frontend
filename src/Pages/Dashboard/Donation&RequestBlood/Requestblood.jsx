import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const Requestblood = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [startDate, setStartDate] = useState(new Date());
    const [id, setId] = useState(null);

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
        let age = form.age.value;
        let Disease = form.disease.value;
        document.getElementById(id).close();

        let amount = blood?.filter((item) => item.bloodGroup === bloodgroup);

        if (amount[0].bloodQuantity < Acc_quantity) {
            Swal.fire({
                title: "Opps!",
                text: `We have not ${Acc_quantity} ml blood`,
                icon: "error",
            });
            return;
        }

        const Information = {
            email, name, Phone_number, date, bloodgroup, status, Acc_quantity, age, Disease,
        };

        axiosPublic
            .post("/information", Information)
            .then((res) => {
                Swal.fire({
                    title: "Requested!",
                    text: "Your Request has been Recorded.",
                    icon: "success",
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
                <title>Blood Bridge | Request Blood</title>
            </Helmet>
            <div className="overflow-x-auto mt-20">
                <table className="table table-zebra">
                    {/* head */}
                    <thead className="bg-red-600 text-white">
                        <tr>
                            <th></th>
                            <th>Blood Group</th>
                            <th>Quantity</th>
                            <th>Request blood</th>
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
                                        <div className="">
                                            <input
                                                type="submit"
                                                className="lg:mt-4 md:mt-4 mt-2 btn btn-primary bg-red-500 hover:rounded-full text-white w-24 lg:w-[200px]"
                                                value="Request"
                                                onClick={() => {
                                                    document.getElementById(item._id).showModal();
                                                    setId(item._id);
                                                }}
                                            />
                                        </div>

                                        <section>
                                            <dialog id={item._id} className="modal modal-middle sm:modal-middle">
                                                <div className="modal-box bg-red-300">
                                                    <h3 className="font-bold text-red-600 text-xl md:text-2xl text-center">
                                                        Acceptor Information
                                                    </h3>
                                                    <form onSubmit={handleSubmit} className="card-body">
                                                        <div className="flex space-x-3 ml-[-20px]">
                                                            <div className="">
                                                                <label className="label">
                                                                    <span className="label-text text-black font-bold">Name</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Name"
                                                                    className="input input-bordered"
                                                                    defaultValue={user?.displayName}
                                                                    name="name"
                                                                    required
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="">
                                                                <label className="label">
                                                                    <span className="label-text text-black font-bold">Email</span>
                                                                </label>
                                                                <input
                                                                    type="email"
                                                                    placeholder="Email"
                                                                    className="input input-bordered"
                                                                    defaultValue={user?.email}
                                                                    name="email"
                                                                    required
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* New Age and Disease Fields */}
                                                        <div className="flex space-x-3 ml-[-20px]">
                                                            <div className="">
                                                                <label className="label">
                                                                    <span className="label-text text-black font-bold">Age ( not less than 6 )</span>
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    placeholder="Age"
                                                                    className="input input-bordered"
                                                                    name="age"
                                                                    min="6"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="">
                                                                <label className="label">
                                                                    <span className="label-text text-black font-bold">Disease</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Disease (if any)"
                                                                    className="input input-bordered"
                                                                    name="disease"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="flex space-x-3 ml-[-20px]">
                                                            <div className="">
                                                                <label className="label">
                                                                    <span className="label-text text-black font-bold">Group</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="A+"
                                                                    className="input input-bordered"
                                                                    defaultValue={item.bloodGroup}
                                                                    name="blood"
                                                                    required
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="">
                                                                <label className="label">
                                                                    <span className="label-text text-black font-bold">Quantity</span>
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    placeholder="80ml"
                                                                    className="input input-bordered"
                                                                    name="quantity"
                                                                    min="1"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="flex space-x-3 ml-[-20px]">
                                                            <div className="">
                                                                <label className="label">
                                                                    <span className="label-text text-black font-bold">Phone Number</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="+880 019xxxx"
                                                                    className="input input-bordered"
                                                                    name="phone_number"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="">
                                                                <label className="label">
                                                                    <span className="label-text text-black font-bold">Date</span>
                                                                </label>
                                                                <DatePicker
                                                                    name="date"
                                                                    className="input input-bordered"
                                                                    selected={startDate}
                                                                    onChange={(date) => setStartDate(date)}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-center">
                                                            <input
                                                                type="submit"
                                                                // className="lg:mt-4 md:mt-4 mt-2 btn btn-primary md:w-full w-24 bg-red-500 hover:rounded-full text-white lg:w-[200px]"
                                                                className="lg:mt-4 md:mt-4 mt-2 btn btn-primary md:w-[150px] w-24 bg-red-500 hover:rounded-full text-white lg:w-full"
                                                                value="Submit"
                                                            />
                                                        </div>
                                                    </form>
                                                    {/* <div className="modal-action">
                                                        <form method="dialog">
                                                            <button className="btn">Close</button>
                                                        </form>
                                                    </div> */}
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
                            </tbody>
                        );
                    })}
                </table>
            </div>
        </div >
    );
};

export default Requestblood;
