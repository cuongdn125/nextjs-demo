import React from "react";

import Sidebar from "../Sidebar";

type Props = {};

const MainLayout = ({ children }) => {
  return (
    <>
      <Sidebar children={children} />
    </>
  );
};

export default MainLayout;
