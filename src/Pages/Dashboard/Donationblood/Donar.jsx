
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";

import Swal from "sweetalert2";

const Donar = () => {

    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className="hero min-h-screen bg-base-200  bg-[url('https://i.postimg.cc/dQhJF34k/web-development1.png')]">
       
        <form  className="card-body">
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
                defaultValue={"name"}
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
                defaultValue={"email"}
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
              value="Update"
            />
          </div>
        </form>
      </div>
    );
};

export default Donar;