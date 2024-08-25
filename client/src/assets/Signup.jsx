import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { notification, Select } from "antd";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const apiKey = import.meta.env.VITE_API_KEY_LOCATION_SEARCH_;
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmpassword) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_BASE_URL}/register`, {
          username,
          password,
          email,
          location,
        })
        .then((result) => {
          console.log(result);
          if (result.data === "badusername") {
            api.error({ message: "Username is already taken." });
          } else if (result.data === "badmail") {
            api.error({ message: "Email is already in use." });
          } else if (result.status === 200) {
            api.success({ message: "Signup successful Please Login." });

            setTimeout(() => {
              navigate("/");
            }, 1500);
          }
        })
        .catch((err) => console.log(err));
    } else {
      api.error({
        message: "Passwords do not match",
      });
    }
  };

  const handleSearch = async (value) => {
    // setSearchTerm(value);
    if (value) {
      setIsLoading(true);
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

  const handleChange = (value) => {
    const selected = options.find((option) => option.value === value);

    // eslint-disable-next-line no-unused-vars
    const { local_names, ...newSelected } = selected.details;
    setLocation(newSelected);
    // console.log(newSelected);

    // setCookieData(newCookieData);
  };
  // console.log(location);
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
      className="bg-cover w-[100vw] h-[100vh] flex  justify-center"
      style={{ backgroundImage: "url('../../images/loginpage/Login.png')" }}>
      {contextHolder}
      <div className="max-w-[70%] flex flex-col mt-20 ">
        <img
          src="../../images/Profile/back.png"
          className="w-8 shadow-lg p-1 mr-auto mb-12 bg-white  rounded-lg"
          onClick={() => navigate(-1)}
        />
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
            <div className="mb-4 ">
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
            <div className="mb-4">
              <label htmlFor="username">
                <p className="font-medium mb-1 text-sm">Username</p>
              </label>
              <input
                className={`w-full rounded-lg h-[43px] transition ease-in-out  focus:scale-110 outline outline-1 px-5  text-lg shadow-md font-medium text-white  ${
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
                className={`w-full rounded-lg h-[43px] transition ease-in-out  focus:scale-110 outline outline-1 px-5  text-lg shadow-md font-medium text-white  ${
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
                className={`w-full rounded-lg h-[43px] outline outline-1 px-5 transition ease-in-out  focus:scale-110  text-lg shadow-md font-medium text-white ${
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
                className={`w-full rounded-lg h-[43px] outline outline-1 px-5  transition ease-in-out  focus:scale-110 text-lg shadow-md font-medium text-white ${
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
            {/* <div className="mb-4">
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
            </div> */}
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
