import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmpassword) {
      axios
        .post("http://localhost:3001/register", {
          username,
          password,
          email,
          location,
        })
        .then((result) => {
          if (result.data === "badusername") {
            api.error({ message: "Username is already taken." });
          } else if (result.data === "badmail") {
            api.error({ message: "Email is already in use." });
          } else {
            api.success({ message: "Signup successful" });

            setTimeout(() => {
              navigate("/");
            }, 2500);
          }
        })
        .catch((err) => console.log(err));
    } else {
      api.error({
        message: "Passwords do not match",
      });
    }
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
      className="bg-cover w-[100vw] h-[100vh] flex items-center justify-center"
      style={{ backgroundImage: "url('../../images/loginpage/Login.png')" }}>
      {contextHolder}
      <div className="max-w-[70%] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center mb-10">
          <img
            className="w-20 pb-3"
            src="../../images/loginpage/WuShang.png"
            alt="img1"></img>
          <img src="../../images/loginpage/Tenkeyohō.png" alt="img2"></img>
          <img
            className="ml-auto w-20"
            src="../../images/loginpage/मौसम.png"
            alt="img3"></img>
        </div>
        <div className="flex flex-col w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username">
                <p className="font-medium mb-1 text-sm">Username</p>
              </label>
              <input
                className={`w-full rounded-lg h-[43px] outline outline-1 px-5  text-lg shadow-md font-medium text-white  ${
                  username.length > 0
                    ? "bg-[#A7BADE] outline-[#7788a7]"
                    : "bg-white outline-[#2F2F2F]"
                }`}
                type="text"
                autoComplete="off"
                name="username"
                required
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email">
                <p className="font-medium mb-1 text-sm">Email</p>
              </label>
              <input
                className={`w-full rounded-lg h-[43px] outline outline-1 px-5  text-lg shadow-md font-medium text-white  ${
                  email.length > 0
                    ? "bg-[#A7BADE] outline-[#7788a7]"
                    : "bg-white outline-[#2F2F2F]"
                }`}
                type="text"
                autoComplete="off"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password">
                <p className="font-medium mb-1 text-sm">Password</p>
              </label>
              <input
                className={`w-full rounded-lg h-[43px] outline outline-1 px-5   text-lg shadow-md font-medium text-white ${
                  password.length > 0
                    ? "bg-[#A7BADE] outline-[#7788a7]"
                    : "bg-white  outline-[#2F2F2F]"
                }`}
                type="password"
                autoComplete="off"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirm-password">
                <p className="font-medium mb-1 text-sm">Confirm Password</p>
              </label>
              <input
                className={`w-full rounded-lg h-[43px] outline outline-1 px-5   text-lg shadow-md font-medium text-white ${
                  confirmpassword.length > 0
                    ? "bg-[#A7BADE] outline-[#7788a7]"
                    : "bg-white  outline-[#2F2F2F]"
                }`}
                type="password"
                autoComplete="off"
                name="confirm-password"
                required
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="location">
                <p className="font-medium mb-1 text-sm">Location</p>
              </label>
              <input
                className={`w-full rounded-lg h-[43px] outline outline-1 px-5  text-lg shadow-md font-medium text-white  ${
                  location.length > 0
                    ? "bg-[#A7BADE] outline-[#7788a7]"
                    : "bg-white outline-[#2F2F2F]"
                }`}
                type="text"
                autoComplete="off"
                name="email"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-[#2F2F2F] text-white  shadow-lg rounded-lg w-full h-[43px] mt-8">
              <p className="text-lg font-medium">Sign Up</p>
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
