import React from "react";
import { Helmet } from "react-helmet";
import { Outlet, useOutlet } from "react-router-dom";
import { useSideBarShowHideHooks } from "../../../../hooks/side-bar-show-hide.hooks";
import { AdministrativeAdminHeader } from "./administrative-admin-header";
import { AdministrativeAdminSidebar } from "./administrative-admin-sidebar";
import { ContextComponent } from "../../../../features/shared/presentation/components/context.component";
export const AdministrativeAdminWrapper: React.FC<{
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
        <AdministrativeAdminSidebar callback={callback} isOpen={isShow} />
        <section className=" flex-1 transition-all duration-600   relative transition-all border">
          <AdministrativeAdminHeader callback={callback} open={isShow} />
          <div className="md:px-10  px-4 h-[calc(100vh-theme(space.24))] overflow-y-scroll pt-10">
           <ContextComponent value={isShow}>
            {outlet ? <Outlet /> : children}
           </ContextComponent>
          </div>
        </section>
      </section>
    </main>
  );
};
