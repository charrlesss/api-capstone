import React from "react";
import "../../../../../../assets/font-sched.css";
import { MakeRequest } from "../component/make-request";
import { AdministrativeClientWrapper } from "../../../../../../layouts/features/Admintrative/client/administrative-client-wrapper-with-sidebar-content";

export const ScheduleYourVisitPages: React.FC = (): JSX.Element => {

  return (
    <AdministrativeClientWrapper>
      <div className=" relative w-full">
        <MakeRequest />
      </div>
    </AdministrativeClientWrapper>
  );
};
