
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";

const Requesthistory = () => {
    const axiosSecure = useAxiosPublic();
    const [donationamount,setDonationAmount] = useState(null)
    const [count,setCount] = useState(null)
    const {user} = useContext(AuthContext)
    const {
        data: blood = [],
        isLoading,
      } = useQuery({
        queryKey: ["blood"],
        queryFn: async () => {
          const res = await axiosSecure.get(`/information1/${user?.email}`);
          return res.data;
        },
      });
      if (isLoading) {
        return <div>Loading.....</div>;
      }

    return (
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>email</th>
        <th>date</th>
        <th>blood Group</th>
        <th>Donate blood</th>
        <th>Recieve blood</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {
        blood?.map((item,index)=>{
            return(
                <tr>
                   <td>{item?.email}</td> 
                   <td>{item?.date}</td>
                   <td>{item?.bloodgroup}</td>
                   <td>{item?.quantity}</td>
                   <td>{item?.Acc_quantity}</td>
                   <td>{item.status}</td>
                </tr>
            )
        })
      }
      
    </tbody>
  </table>
</div>
    );
};

export default Requesthistory;