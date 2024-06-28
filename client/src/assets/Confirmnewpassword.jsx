const Confirmnewpassword = () => {
  return (
    <div
      className="bg-cover w-[100vw] h-[100vh] flex items-center justify-center"
      style={{
        backgroundImage:
          "url('../../images/forgotpage/ConfirmNewPassword.png')",
      }}>
      <div className="max-w-[70%] flex flex-col justify-center items-center">
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

        <p className="text-white mb-11 text-base tracking-wide font-medium ">
          Remember This One!
        </p>

        <div className="flex flex-col w-full">
          <form>
            <div className="mb-4">
              <label htmlFor="password">
                <p className="font-medium mb-1 text-sm text-white">Password</p>
              </label>
              <input
                className="w-full shadow-md rounded-lg h-[43px] px-5 text-lg font-medium"
                type="password"
                autoComplete="off"
                name="password"
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password">
                <p className="font-medium mb-1 text-sm text-white">
                  Confirm Password
                </p>
              </label>
              <input
                className="w-full shadow-md rounded-lg  px-5 h-[43px] text-lg font-medium"
                type="password"
                autoComplete="off"
                name="confirm-password"
                required
              />
            </div>
          </form>
        </div>
        <button
          type="submit"
          className="bg-[#D2E0FB] rounded-lg w-full h-[43px] mt-9">
          <p className="text-lg shadow-lg font-medium text-[2F2F2F]">
            Set Password
          </p>
        </button>
      </div>
    </div>
  );
};

export default Confirmnewpassword;
