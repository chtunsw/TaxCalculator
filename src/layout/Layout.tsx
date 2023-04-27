import React, { PropsWithChildren } from "react";
import "./Layout.css";

const Layout = (props: PropsWithChildren) => {
  return <div className="layout">{props.children}</div>;
};

export default Layout;
