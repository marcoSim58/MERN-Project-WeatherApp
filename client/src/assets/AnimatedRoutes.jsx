import { Routes, Route, useLocation } from "react-router-dom";

import Forgotpassword from "./Forgotpassword";
import Splash2 from "./Splash2";

import Loader from "./Loader";

import { AnimatePresence } from "framer-motion";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import PEdit from "./PEdit";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Loader />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/fpass" element={<Forgotpassword />}></Route>

        <Route path="/authenticating" element={<Splash2 />}></Route>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/edit" element={<PEdit />}></Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
