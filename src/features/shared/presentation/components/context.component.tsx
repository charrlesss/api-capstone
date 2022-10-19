import { createContext } from "react";

export const ShowSidebar = createContext(false);

export const ContextComponent = ({
  value,
  children,
}: {
  value: boolean;
  children: JSX.Element;
}) => {
  return <ShowSidebar.Provider value={value}>{children}</ShowSidebar.Provider>;
};
