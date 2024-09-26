import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
const Requestblood = () => {
  const axiosSecure = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const {
    data: blood = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blood"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bloodGroups");
      return res.data;
    },
  });
  if (isLoading) {
    return <div>Loading.....</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
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
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        document.getElementById(item._id).showModal()
                      }
                    >
                      Request
                    </button>
                    <section>
                      <dialog
                        id={item._id}
                        className="modal modal-middle sm:modal-middle"
                      >
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Submission box</h3>
                          <p className="py-4">
                            Press ESC key or click the button below to close
                          </p>
                          <form className="card-body">
                            <div className="flex space-x-3 ml-[-20px]">
                              <div className="">
                                <label className="label">
                                  <span className="label-text text-black ">
                                    Name
                                  </span>
                                </label>
                                <input
                                  type="email"
                                  placeholder="nafis@gmail.com"
                                  className="input input-bordered"
                                  defaultValue={user?.displayName}
                                  name="name"
                                  required
                                />
                              </div>
                              <div className="">
                                <label className="label">
                                  <span className="label-text text-black ">
                                    Email
                                  </span>
                                </label>
                                <input
                                  type="email"
                                  placeholder="nafis@gmail.com"
                                  className="input input-bordered"
                                  defaultValue={user?.email}
                                  name="email"
                                  required
                                />
                              </div>
                            </div>
                            <div className="flex space-x-3 ml-[-20px]">
                              <div className="">
                                <label className="label">
                                  <span className="label-text text-black ">
                                    Group
                                  </span>
                                </label>
                                <input
                                  type="email"
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
                            <div className="flex space-x-3 ml-[-20px]">
                              <div className="">
                                <label className="label">
                                  <span className="label-text text-black ">
                                    Phone Number
                                  </span>
                                </label>
                                <input
                                  type="number"
                                  placeholder="+880 019xxxx"
                                  className="input input-bordered"
                                  name="phone_number"
                                  required
                                />
                              </div>
                              <div className="">
                                <label className="label">
                                  <span className="label-text text-black font-bold">
                                    Date
                                  </span>
                                </label>
                                <DatePicker
                                  name="date"
                                  className="input input-bordered "
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date)}
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
  );
};

export default Requestblood;
