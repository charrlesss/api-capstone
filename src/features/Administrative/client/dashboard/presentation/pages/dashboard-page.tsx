import React from "react";
import { AdministrativeClientCircleGraphComponent } from "../component/administrative-client-circle-graph.component";
import { AdministrativeClientboxGraphComponent } from "../component/administrative-client-box-graph.component";
import { AdministrativeClientShcedulesComponent } from "../component/administrative-client-shcedules.component";
import { AdministrativeClientWrapper } from "../../../../../../layouts/features/Admintrative/client/administrative-client-wrapper-with-sidebar-content";
export const ClientDashboardPage: React.FC = (): JSX.Element => {
  return (
    <AdministrativeClientWrapper>
      <main className="w-full min-h-[100vh] max-h-auto relative mb-24 ">
        <div className="max-h-auto w-full grid xl:grid-cols-2  grid-cols-1 items-center  gap-10 ">
          <AdministrativeClientShcedulesComponent />
          <div className="w-full  h-full border rounded-xl p-3 shadow shadow-lg bg-blue-900 shadow-lg shadow-blue-900">
            <AdministrativeClientboxGraphComponent />
            <h1 className="sm:text-[25px]  text-[13px] sm:my-10 my-5 text-white">
              Monitoring
            </h1>
            <p className="text-white sm:text-sm  text-[11px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit cum
              itaque nesciunt commodi voluptatum. Suscipit facilis deserunt sunt
              ad ex, nobis recusandae alias ea perspiciatis eum facere dicta
              beatae cumque.
            </p>
          </div>
        </div>

        <div className="mt-24 max-h-auto w-full grid xl:grid-cols-2  grid-cols-1 items-center  gap-5 ">
          <div className=" shadow-lg shadow-blue-600 relative w-full flex sm:space-x-10 sm:flex-row flex-col justify-center items-center bg-blue-900 p-10 rounded-lg shadow shadow-lg">
            <div className="  relative w-auto ">
              <AdministrativeClientCircleGraphComponent />
            </div>
            <div className="  relative w-auto">
              <AdministrativeClientCircleGraphComponent />
            </div>
          </div>
          <div className="w-full  h-full"></div>
        </div>
      </main>
    </AdministrativeClientWrapper>
  );
};
