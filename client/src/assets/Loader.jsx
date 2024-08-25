import { useEffect, useState } from "react";
import Login from "./Login";
import Splash from "./Splash1";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Loader = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      axios.defaults.withCredentials = true;
      axios
        .post(`${import.meta.env.VITE_BACKEND_BASE_URL}/authCheck`)
        .then((res) => {
          if (res.status === 200) {
            navigate("/");
          } else {
            setLoading(true);
          }
        })

        .catch((err) => {
          setLoading(true);
          console.log(err);
        });
    }, 800);
    return () => {
      clearTimeout(timeoutId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}>
      {loading ? <Login /> : <Splash />}
    </motion.div>
  );
};

export default Loader;
