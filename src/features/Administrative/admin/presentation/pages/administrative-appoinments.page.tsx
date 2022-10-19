import React from "react";
import { AdministrativeAdminWrapper } from "../../../../../layouts/features/Admintrative/admin/administrative-admin-wrapper-with-sidebar-content";
import { BreadCrumbComponent } from "../../../../shared/presentation/components/bread-crumb.component";

export const AdministrativeAppoinmentsPage = () => {
  return (
    <AdministrativeAdminWrapper>
      <main className="w-full min-h-[100vh] max-h-auto relative mb-24  relative  pt-20">
        <BreadCrumbComponent
          title={"Appointments"}
          pageTitles={[
            { name: "Appointments", url: "/administrative/appointments" },
            { name: "Pending", url: "/administrative/appointments/pending" },
            { name: "Accepted", url: "/administrative/appointments/accepted" },
            { name: "Rejected", url: "/administrative/appointments/rejected" },
          ]}
        />
      </main>
    </AdministrativeAdminWrapper>
  );
};
