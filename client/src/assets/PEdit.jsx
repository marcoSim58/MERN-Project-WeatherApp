import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { notification, Select } from "antd";
import withAuth from "./auth/auth";

const PEdit = (user) => {
  // eslint-disable-next-line no-undef
  const apiKey = import.meta.env.VITE_API_KEY_LOCATION_SEARCH_;
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  // const user = JSON.parse(localStorage.getItem("user"));
  const [newLocation, setNewLocation] = useState(null);

  const [options, setOptions] = useState([]);
  const [dataIsLoading, setDataLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //   console.log(user);
  const handleChange = (value) => {
    const selected = options.find((option) => option.value === value);
    // console.log(selected);

    // eslint-disable-next-line no-unused-vars
    const { local_names, ...newSelected } = selected.details;

    setNewLocation(newSelected);
  };

  const handleSearch = async (value) => {
    if (value) {
      try {
        const response = await axios.get(import.meta.env.VITE_LOCATIONS_URL, {
          params: {
            q: value,
            limit: 5,
            appid: apiKey,
          },
          withCredentials: false,
        });
        // console.log(user);
        const data = response.data;

        const newOptions = data.map((item, index) => ({
          key: index,
          value: `${item.name}, ${item.lat}`,
          label: `${item.name}, ${item.state}, ${item.country}`,
          details: item,
        }));
        setOptions(newOptions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    } else {
      setOptions([]);
    }
  };

  const onSubmit = async () => {
    setDataLoading(true);
    try {
      console.log("passed");
      if (newLocation !== null) {
        const name = user.user.name;
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/location`,
          {
            newLocation,
            name,
          }
        );
        const success = response.data.updatedUser.acknowledged;
        console.log(success);
        if (success === true) {
          api.success({ message: "Location Update Successfull" });
          // user.location = newLocation;
          // localStorage.setItem("user", JSON.stringify(user));
          setNewLocation("");
          setTimeout(() => {
            navigate("/profile");
          }, 900);
        }
      } else {
        api.error({ message: "Enter valid location!!!" });
      }
    } catch (error) {
      console.log(error);
    }
    setDataLoading(false);
  };

  return (
    <div
      className="bg-cover w-[100vw] h-auto flex  justify-center"
      style={{
        backgroundImage: "url('../../images/Profile/Dashboard.png')",
      }}>
      <div className="w-[88%] flex flex-col pb-7  pt-[30px]   items-center mx-auto">
        {contextHolder}
        <div className="grid grid-cols-3  grid-flow-col  w-full text-[20px] mb-4">
          <img
            src="../../images/Profile/back.png"
            className="w-8 shadow-lg p-1 rounded-lg"
            onClick={() => navigate("/")}
          />
          <p className="justify-self-center">Profile</p>
          <div></div>
        </div>
        <img
          src="../../images/Profile/id-card1.jpg"
          className="rounded-full shadow-lg h-[140px] w-[140px] object-cover mb-6"
        />
        <p className="text-[18px] font-light mb-1">Supp!</p>
        <p className="text-[22px] font-semibold mb-10">{user.user.name}</p>
        <div className="max-w-[70%] flex flex-col justify-center items-center">
          <div className=" w-full mb-6">
            {/* */}
            {/* <input
              value={newLocation}
              onChange={handleChange}
              placeholder="Set Location"
              className={` rounded-lg w-full placeholder-white  h-[43px] text-[20px]  px-5 shadow-md font-medium text-white outline outline-1  bg-[#A7BADE] outline-[#7788a7]`}
            /> */}

            <Select
              // suffixIcon={
              //   <CiLocationOn className="text-5xl leading-none mr-4" />
              // }
              loading={isLoading}
              showSearch
              variant="filled"
              placeholder={
                <p className="text-lg text-white font-medium">
                  Search City Name
                </p>
              }
              // style={{ height: "100%", width: "100%" }}

              onSearch={handleSearch}
              onSelect={handleChange}
              options={options}
              size="large"
              notFoundContent={
                <p className="text-white text-lg py-5 ">
                  No Matching City Names Found!
                </p>
              }
            />
          </div>
          <div className="mb-6 w-full">
            <label htmlFor="username">
              <p className="font-medium mb-1 text-sm">Username</p>
            </label>
            <input
              disabled
              value={user.user.name}
              className="rounded-lg h-[43px] w-full outline outline-1 px-5 text-lg shadow-md font-medium text-white bg-[#A7BADE] outline-[#7788a7]"></input>
          </div>
          <div className="mb-6 w-full">
            <label htmlFor="email">
              <p className="font-medium mb-1 text-sm">Email</p>
            </label>
            <input
              disabled
              value={user.user.email}
              className="rounded-lg h-[43px] w-full outline outline-1 px-5 text-lg shadow-md font-medium text-white bg-[#A7BADE] outline-[#7788a7]"></input>
          </div>
          <div className="mb-6 w-full">
            <label htmlFor="number">
              <p className="font-medium mb-1 text-sm">Number</p>
            </label>
            <div className="flex w-full justify-between">
              <input
                disabled
                value="+91"
                className="rounded-lg h-[43px] w-[50px]  outline outline-1 px-2 text-lg shadow-md font-medium text-white bg-[#A7BADE] outline-[#7788a7]  mr-3"
              />
              <input
                disabled
                value=" 5296 899 997"
                className="rounded-lg h-[43px] w-full  outline outline-1 px-5 text-lg shadow-md font-medium text-white bg-[#A7BADE] outline-[#7788a7]"></input>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#2F2F2F] text-white active:bg-blue-600 active:scale-50    transition-all duration-500 flex justify-center items-center  shadow-lg rounded-lg w-full h-[43px] mt-8">
            <span
              className={`loader  ${
                dataIsLoading ? "block" : "hidden"
              }`}></span>
            <p
              className={`text-lg font-medium  ${
                dataIsLoading ? "hidden" : "block"
              }`}
              onClick={onSubmit}>
              Submit
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

// export default PEdit;

const NamedEditPage = withAuth(PEdit);

export default NamedEditPage;
