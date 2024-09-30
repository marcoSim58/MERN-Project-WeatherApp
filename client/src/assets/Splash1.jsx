const Splash = () => {
  return (
    <div
      className="bg-cover w-[100vw] h-[100vh] flex justify-center"
      style={{ backgroundImage: "url('../../images/basepage/Splash.png')" }}>
      <div className="flex flex-col items-center w-[70%]">
        <img
          className="w-20 pb-3 mt-64"
          src="../../images/basepage/WuShangWhite.png"
          alt="img1"></img>
        <img src="../../images/basepage/TenkeyohōWhite.png" alt="img2"></img>
        <img
          className="ml-auto w-20"
          src="../../images/basepage/मौसमWhite.png"
          alt="img3"></img>
      </div>
    </div>
  );
};

export default Splash;
