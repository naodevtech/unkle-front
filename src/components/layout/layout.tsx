import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default Layout;
