import React from "react";
import { Helmet } from "react-helmet";
import { Outlet, useOutlet } from "react-router-dom";
import { useSideBarShowHideHooks } from "../../../../hooks/side-bar-show-hide.hooks";
import { AdministrativeClientSidebar } from "./administrative-client-sidebar";
import { AdministrativeClientHeader } from "./administrative-client-header";

export const AdministrativeClientWrapper: React.FC<{
  children: JSX.Element;
}> = ({ children }): JSX.Element => {
  const { callback, isShow } = useSideBarShowHideHooks();
  const outlet = useOutlet();
  return (
    <main className={`min-h-screen max-hauto`}>
      <Helmet>
        <title>Admin</title>
      </Helmet>

      <section className="relative w-full relative  min-h-[100vh] max-h-auto   flex  transition-all  ">
        <AdministrativeClientSidebar callback={callback} isOpen={isShow} />
        <section className=" flex-1 transition-all duration-600   relative transition-all ">
          <AdministrativeClientHeader callback={callback} open={isShow} />
          <div className="md:px-10 sm:px-4 px-2  md:h-[calc(100vh-theme(space.24))] h-auto overflow-y-scroll pt-10">
            {outlet ? <Outlet /> : children}
          </div>
        </section>
      </section>
    </main>
  );
};
