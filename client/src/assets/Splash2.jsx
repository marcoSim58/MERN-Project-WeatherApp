import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Splash2 = () => {
  const navigate = useNavigate();
  // const { state } = useLocation();
  // const user = localStorage.getItem("user");

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }, []);

  return (
    <div
      className="bg-cover w-[100vw] h-[100vh] flex items-center justify-center"
      style={{ backgroundImage: "url('../../images/basepage/Splash2.png')" }}>
      <div className="flex flex-col items-center w-[70%]">
        <img
          className="w-20 pb-3"
          src="../../images/loginpage/WuShang.png"
          alt="img1"></img>
        <img src="../../images/loginpage/Tenkeyohō.png" alt="img2"></img>
        <img
          className="ml-auto w-20"
          src="../../images/loginpage/मौसम.png"
          alt="img3"></img>
        <div className="flex items-center relative top-[120px]">
          <img
            className="w-20 h-3.5 mt-3 mr-2"
            src="../../images/loginpage/LoadingYour.png"
            alt="img-load"
          />
          <img
            className="w-20 "
            src="../../images/loginpage/मौसम.png"
            alt="img-load1"
          />
        </div>
      </div>
    </div>
  );
};

export default Splash2;
