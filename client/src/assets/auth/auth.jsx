import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const withAuth = (Component) => {
  // eslint-disable-next-line react/display-name

  // eslint-disable-next-line react/display-name
  const AuthHOC = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
      axios.defaults.withCredentials = true;
      const timeoutId = setTimeout(() => {
        axios
          .post(`${import.meta.env.VITE_BACKEND_BASE_URL}/authCheck`)
          .then((res) => {
            if (res.status === 200) {
              console.log(res.data);

              setUser(res.data.user);
            }
          })
          .catch((err) => {
            console.log(err);
            navigate("/login");
          });
      }, 700);
      return () => {
        clearTimeout(timeoutId);
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!user) {
      return (
        <div
          className="   w-[100vw] h-[100vh] flex flex-col items-center   "
          style={{
            backgroundImage:
              "url('../../../images/Dashboard/Dashboard Day.svg')",
            backgroundSize: "cover",
          }}>
          <p className="text-xl font-medium text-sky-500 mb-14 animate-pulse  mt-[270px]">
            {" "}
            Loading...
          </p>
          <div className="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      );
    }

    return <Component {...props} user={user} />;
  };
  AuthHOC.displayName = `withAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return AuthHOC;
};

export default withAuth;
