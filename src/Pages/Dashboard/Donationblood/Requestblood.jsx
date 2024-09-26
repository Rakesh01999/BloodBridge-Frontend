import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
const Requestblood = () => {
  const axiosSecure = useAxiosPublic();
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
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Submission box</h3>
                          <p className="py-4">
                            Press ESC key or click the button below to close
                          </p>
                          <form>
                            <h1>status</h1>

                            <label htmlFor="">
                              <span className="text-xl">pdf link: </span>
                              <input className="ml-2 mt-3" type="text" />
                            </label>
                            <br />
                            <label htmlFor="">
                              <span className="text-xl">
                                <span className="mr-2">notes:</span>
                                <span className="font-extralight">box</span>
                              </span>
                            </label>
                            <br />
                            <input
                              type="text"
                              placeholder="mark input field"
                              className="input input-bordered w-full max-w-xs mt-5"
                              name="obtainmark"
                              required
                            />
                            <br />
                            <textarea
                              placeholder="feedback field"
                              className="textarea textarea-bordered textarea-sm w-full max-w-xs mt-5"
                              name="feedback"
                              required
                            ></textarea>
                            <input type="text" name="id" className="hidden" />
                            <input
                              type="submit"
                              className="lg:mt-4 md:mt-4 mt-2 btn btn-primary w-3/4 lg:ml-16"
                              value="Submit"
                            />
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
