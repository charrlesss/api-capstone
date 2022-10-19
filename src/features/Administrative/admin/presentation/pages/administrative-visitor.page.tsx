import React from "react";
import { AdministrativeAdminWrapper } from "../../../../../layouts/features/Admintrative/admin/administrative-admin-wrapper-with-sidebar-content";
import { BreadCrumbComponent } from "../../../../shared/presentation/components/bread-crumb.component";

export const AdministrativeVisitorPage = () => {
  return (
    <AdministrativeAdminWrapper>
      <main className="w-full min-h-[100vh] max-h-auto relative mb-24  relative  pt-20">
        <BreadCrumbComponent
          title={"Visitors"}
          pageTitles={[
            { name: "Visitors", url: "/administrative/visitors" },
            { name: "Create", url: "/administrative/visitors/create" },
            { name: "Update", url: "/administrative/visitors/update" },
            { name: "Delete", url: "/administrative/visitors/delete" },
          ]}
        />
      </main>
    </AdministrativeAdminWrapper>
  );
};
