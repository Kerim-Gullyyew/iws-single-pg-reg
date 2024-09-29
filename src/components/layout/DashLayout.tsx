import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../images/logo1923.png";
interface DashLayoutProps {}
const DashLayout: React.FC<DashLayoutProps> = ({}) => {
  return (
    <>
      <div className="bg-white">
        <div className="overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashLayout;
