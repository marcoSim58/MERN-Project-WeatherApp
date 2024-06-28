import { useEffect, useState } from "react";
import Login from "./Login";
import Splash from "./Splash1";
import { motion } from "framer-motion";

const Loader = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true); // Set loading state to false after 2 seconds
    }, 2000);
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
