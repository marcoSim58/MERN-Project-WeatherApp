import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Forgotpassword = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
      className="bg-cover w-[100vw] h-[100vh] flex justify-center"
      style={{
        backgroundImage: "url('../../images/forgotpage/ForgorPassword.png')",
      }}>
      <div className="max-w-[70%] flex flex-col mt-20 items-center">
        <img
          src="../../images/Profile/back.png"
          className="w-8 shadow-white-lg p-1 mr-auto mb-20 bg-white  rounded-lg"
          onClick={() => navigate("/login")}
        />
        <div className="flex flex-col items-center mb-14">
          <img
            className="w-20 pb-3"
            src="../../images/forgotpage/WuShang.png"
            alt="img1"></img>
          <img src="../../images/forgotpage/Tenkeyohō.png" alt="img2"></img>
          <img
            className="ml-auto w-20"
            src="../../images/forgotpage/मौसम.png"
            alt="img3"></img>
        </div>

        <p className="text-white  mb-14 text-base tracking-wide">
          It happens to best of us
        </p>

        <div className="flex flex-col w-full">
          <form>
            <div className="">
              <label htmlFor="username">
                <p className="font-medium  mb-1 text-sm text-white">Username</p>
              </label>
              <input
                className="w-full shadow-white-md	 rounded-lg h-[43px] px-5  text-lg font-medium"
                type="text"
                autoComplete="off"
                required
                name="username"
              />
            </div>
          </form>
        </div>
        <button
          type="submit"
          className="bg-[#D2E0FB] rounded-lg w-full h-[43px] mt-9">
          <p className="text-lg font-medium text-[2F2F2F]">Next</p>
        </button>
      </div>
    </motion.div>
  );
};

export default Forgotpassword;
