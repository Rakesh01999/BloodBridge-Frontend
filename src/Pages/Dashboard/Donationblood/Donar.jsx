
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
          <h2 className="text-2xl text-white text-center">Update assignment</h2>
          <div className="lg:flex md:flex lg:gap-4 gap-2 md:gap-4 justify-center flex">
            <div className="">
              <label className="label">
                <span className="label-text text-black font-bold">title</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                className="input lg:input-lg input-bordered lg:w-[500px] md:w-[250px] w-[150px]"
                // defaultValue={title}
                name="title"
                required
              />
            </div>
            <div className="">
              <label className="label">
                <span className="label-text text-black font-bold">Description</span>
              </label>
              <input
                type="text"
                placeholder="description"
                className="input lg:input-lg input-bordered lg:w-[500px] md:w-[250px] w-[150px]"
                // defaultValue={description}
                name="description"
                required
              />
            </div>
          </div>
          {/* 2nd input */}
          <div className="lg:flex md:flex lg:gap-4 gap-2 md:gap-4 justify-center flex">
            <div className="">
              <label className="label">
                <span className="label-text text-black font-bold">Marks</span>
              </label>
              <input
                type="text"
                placeholder="marks"
                className="input lg:input-lg input-bordered lg:w-[500px] md:w-[250px] w-[150px]"
                name="marks"
                // defaultValue={marks}
                required
              />
            </div>
            <div className="">
              <label className="label">
                <span className="label-text text-black font-bold">thumbnail Image URL</span>
              </label>
              <input
                type="text"
                placeholder="thumbnail Image URL"
                className="input lg:input-lg input-bordered lg:w-[500px] md:w-[250px] w-[150px]"
                name="thumbnail"
                // defaultValue={image}
                required
              />
            </div>
          </div>
          {/* 3rd input */}
          <div className="lg:flex md:flex lg:gap-4 gap-2 md:gap-4 justify-center flex">
            <div className="">
              <label className="label">
                <span className="label-text text-black font-bold">Select difficulty</span>
              </label>
              <select className="input lg:input-lg input-bordered lg:w-[500px] md:w-[250px] w-[150px]" value={"Easy"}  name="difficulty" required>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
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
              className="lg:mt-4 md:mt-4 mt-2 btn btn-primary w-3/4 lg:ml-16"
              value="Update"
            />
          </div>
        </form>
      </div>
    );
};

export default Donar;