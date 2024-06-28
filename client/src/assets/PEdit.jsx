import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";
import { notification } from "antd";

const PEdit = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const user = JSON.parse(localStorage.getItem("user"));
  const [newLocation, setNewLocation] = useState("");

  const [userDetail, setUserDetail] = useState({
    name: "",
    location: "",
    email: "",
  });

  //   console.log(user);
  const handleChange = (e) => {
    setNewLocation(e.target.value);
  };

  const onSubmit = async () => {
    try {
      if (newLocation !== "") {
        const name = userDetail.name;
        const response = await axios.post("http://localhost:3001/location", {
          newLocation,
          name,
        });

        const success = response.data.updatedUser.acknowledged;

        // console.log(success);

        if (success === true) {
          api.success({ message: "Location Update Successfull" });
          user.location = newLocation;
          localStorage.setItem("user", JSON.stringify(user));
          setNewLocation("");
          setTimeout(() => {
            navigate("/profile");
          }, 1000);
        }
      } else {
        api.error({ message: "Enter valid location!!!" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      setUserDetail({
        name: user.name,
        location: user.location,
        email: user.email,
      });
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div
      className="bg-cover w-[100vw] h-[100vh] flex  justify-center"
      style={{
        backgroundImage: "url('../../images/Profile/Dashboard.png')",
      }}>
      <div className="w-[88%] flex flex-col py-[70px] items-center mx-auto">
        {contextHolder}
        <div className="grid grid-cols-3  grid-flow-col  w-full text-[20px] mb-4">
          <img
            src="../../images/Profile/back.png"
            className="w-8 shadow-lg p-1 rounded-lg"
            onClick={() => navigate("/profile")}
          />
          <p className="justify-self-center">Profile</p>
          <div></div>
        </div>
        <img
          src="../../images/Profile/id-card1.jpg"
          className="rounded-full shadow-lg h-[140px] w-[140px] object-cover mb-6"
        />
        <p className="text-[18px] font-light mb-1">Supp!</p>
        <p className="text-[22px] font-semibold mb-10">{userDetail.name}</p>
        <div className="max-w-[70%] flex flex-col justify-center items-center">
          <div className="flex items-center w-full  mb-6">
            <CiLocationOn className="text-5xl leading-none mr-4" />
            <input
              value={newLocation}
              onChange={handleChange}
              placeholder="Set Location"
              className={` rounded-lg w-full placeholder-white  h-[43px] text-[20px]  px-5 shadow-md font-medium text-white outline outline-1  bg-[#A7BADE] outline-[#7788a7]`}
            />
          </div>
          <div className="mb-6 w-full">
            <label htmlFor="username">
              <p className="font-medium mb-1 text-sm">Username</p>
            </label>
            <input
              disabled
              value={userDetail.name}
              className="rounded-lg h-[43px] w-full outline outline-1 px-5 text-lg shadow-md font-medium text-white bg-[#A7BADE] outline-[#7788a7]"></input>
          </div>
          <div className="mb-6 w-full">
            <label htmlFor="email">
              <p className="font-medium mb-1 text-sm">Email</p>
            </label>
            <input
              disabled
              value={userDetail.email}
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
            className="bg-[#2F2F2F] text-white  shadow-lg rounded-lg w-full h-[43px] mt-8">
            <p className="text-lg font-medium" onClick={onSubmit}>
              Submit
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PEdit;
