/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import withAuth from "./auth/auth";

const Profile = (user) => {
  const navigate = useNavigate();

  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user, "iser");
  // const [userDetail, setUserDetail] = useState({
  //   name: "",
  //   location: "",
  //   email: "",
  // });

  // useEffect(() => {
  //   if (user) {
  //     setUserDetail({
  //       name: user.user.name,
  //       location: user.user.location.name,
  //       email: user.user.email,
  //     });
  //   } else {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div
      className="bg-cover w-[100vw] h-[100vh] flex  justify-center"
      style={{
        backgroundImage: "url('../../images/Profile/Dashboard.png')",
      }}>
      <div className="w-[88%] flex flex-col py-[70px] items-center mx-auto">
        <div className="grid grid-cols-3  grid-flow-col  w-full text-[20px] mb-4">
          <img
            src="../../images/Profile/back.png"
            className="w-8 shadow-lg p-1 rounded-lg"
            onClick={() => navigate("/")}
          />
          <p className="justify-self-center">Profile</p>
          <p
            className="text-[#3266C8] justify-self-end"
            onClick={() => navigate("/edit")}>
            Edit
          </p>
        </div>
        <img
          src="../../images/Profile/id-card1.jpg"
          className="rounded-full  h-[140px] w-[140px] object-cover mb-6"
        />
        <p className="text-[18px] font-light mb-1">Supp!</p>
        <p className="text-[22px] font-semibold mb-10">{user.user.name}</p>
        <div className="max-w-[70%] flex flex-col justify-center items-center">
          <div className="flex items-center w-full  mb-6">
            <CiLocationOn className="text-5xl leading-none mr-4" />
            <input
              disabled
              value={user.user.location.name}
              className={` rounded-lg w-full  h-[43px] text-[20px]  px-5 shadow-md font-medium text-white outline outline-1  bg-[#A7BADE] outline-[#7788a7]`}
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
        </div>
      </div>
    </div>
  );
};

const NamedProfile = withAuth(Profile);

export default NamedProfile;
