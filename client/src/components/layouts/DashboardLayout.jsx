import React, { useContext } from "react";
import { UserContext } from "../../context/userContext.jsx";
import Navbar from "./Navbar.jsx";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Navbar />

      {user && <div>{children}</div>}
    </div>
  );
};

export default DashboardLayout;
