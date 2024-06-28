import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { notification } from "antd";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const handleSubmit = (e) => {
    console.log("clicked");
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        // console.log(response);
        if (response.status === 401) {
          api.error({ message: response.data });
        }
        if (response.status === 500) {
          api.error({ message: response.data });
        }
        if (response.status === 200 && typeof response.data === "object") {
          console.log(response.data);
          // const user = response.data;
          // localStorage.setItem("user", JSON.stringify(user));
          api.success({ message: "Login Sucessfull" });
          // setTimeout(() => {
          //   navigate("/splash2");
          // }, 2000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="bg-cover w-[100vw] h-[100vh] flex items-center justify-center"
      style={{ backgroundImage: "url('../../images/loginpage/Login.png')" }}>
      {contextHolder}
      <div className="max-w-[70%] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center mb-14">
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
                className={`w-full shadow-md rounded-lg h-[43px] outline outline-1 px-5 text-lg font-medium text-white  ${
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
            <div>
              <label htmlFor="password">
                <p className="font-medium mb-1 text-sm">Password</p>
              </label>
              <input
                className={`w-full  shadow-md rounded-lg h-[43px] outline outline-1 px-5  text-base font-medium text-white ${
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
            <button
              type="submit"
              className="bg-[#2F2F2F] text-white rounded-lg w-full h-[43px] mt-8">
              <p className="text-lg font-medium">Login</p>
            </button>
          </form>
        </div>

        <a
          className="font-medium text-sm mt-10 border-b border-solid border-[#2F2F2F] "
          onClick={() => navigate("/fpass")}>
          Forgot Password
        </a>

        <p className="mt-5 font-medium text-sm">
          New here huh?{" "}
          <a
            onClick={() => navigate("/signup")}
            className="font-bold  border-b border-solid border-[#2F2F2F]">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
