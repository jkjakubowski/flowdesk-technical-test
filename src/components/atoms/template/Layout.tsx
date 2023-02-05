import * as React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className={`flex justify-center mt-6 md:mt-10`}>{children}</div>;
};
