
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useContext, useState } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Donar = () => {

     const {user} = useContext(AuthContext)
     const [startDate, setStartDate] = useState(new Date());
     const axiosSecure = useAxiosPublic()

     const submitform = e =>{       
         e.preventDefault();
         const form = e.target
         let email = form.email.value
         let name = form.name.value 
         let Phone_number = form.phone_number.value
         let Disease = form.disease.value 
         let date = form.date.value 
         let bloodgroup = form.blood.value
         let status = "pending"
         let number_of_donation = 1
         
         const Information = {
            email,name,Phone_number,Disease,date,bloodgroup,status,number_of_donation
         }

         axiosSecure.post('/information',Information)
         .then(res=>{
          Swal.fire({
            title: "Accepted!",
            text: "Your file has been Accepted.",
            icon: "success"
          });

         })
         .catch(error=>{
            console.log(error.message);
            
         });
        form.reset()
     }
    return (
        <div className="hero min-h-screen bg-base-200  bg-[url('https://i.postimg.cc/dQhJF34k/web-development1.png')]">
       
        <form onSubmit={submitform} className="card-body">
          {/* 1st input */}
          <h2 className="text-2xl text-white text-center">Donar information</h2>
          <div className="lg:flex md:flex lg:gap-4 gap-2 md:gap-4 justify-center flex">
            <div className="">
              <label className="label">
                <span className="label-text text-black font-bold">Name</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                className="input lg:input-lg input-bordered lg:w-[500px] md:w-[250px] w-[150px]"
                defaultValue={user?.displayName}
                name="name"
                required
              />
            </div>
            <div className="">
              <label className="label">
                <span className="label-text text-black font-bold">Email</span>
              </label>
              <input
                type="email"
                placeholder="nafis@gmail.com"
                className="input lg:input-lg input-bordered lg:w-[500px] md:w-[250px] w-[150px]"
                defaultValue={user?.email}
                name="email"
                required
              />
            </div>
          </div>
          {/* 2nd input */}
          <div className="lg:flex md:flex lg:gap-4 gap-2 md:gap-4 justify-center flex">
            <div className="">
              <label className="label">
                <span className="label-text text-black font-bold">Phone number</span>
              </label>
              <input
                type="number"
                placeholder="Phone_number"
                className="input lg:input-lg input-bordered lg:w-[500px] md:w-[250px] w-[150px]"
                name="phone_number"
                // defaultValue={marks}
                required
              />
            </div>
            <div className="">
              <label className="label">
                <span className="label-text text-black font-bold">Disease</span>
              </label>
              <input
                type="text"
                placeholder="Disease"
                className="input lg:input-lg input-bordered lg:w-[500px] md:w-[250px] w-[150px]"
                name="disease"
                required
              />
            </div>
          </div>
          {/* 3rd input */}
          <div className="lg:flex md:flex lg:gap-4 gap-2 md:gap-4 justify-center flex">
            <div className="">
              <label className="label">
                <span className="label-text text-black font-bold">Select blood</span>
              </label>
              <select className="input lg:input-lg input-bordered lg:w-[500px] md:w-[250px] w-[150px]"  name="blood" required>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div className="">
              <label className="label">
                <span className="label-text text-black font-bold">Date</span>
              </label>
              <DatePicker name="date" className="input lg:input-lg input-bordered lg:w-[500px] md:w-[250px] w-[150px]" selected={startDate} onChange={(date) => setStartDate(date)} />
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
      </div>
    );
};

export default Donar;