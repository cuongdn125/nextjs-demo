import React from "react";

import Sidebar from "../Sidebar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Sidebar children={children} />
    </>
  );
};

export default MainLayout;
