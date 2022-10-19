import React from 'react'
import { AdministrativeAdminWrapper } from "../../../../../layouts/features/Admintrative/admin/administrative-admin-wrapper-with-sidebar-content";
import { BreadCrumbComponent } from "../../../../shared/presentation/components/bread-crumb.component";
export const AdministrativeFacilitiesPage = () => {
  return (
    <AdministrativeAdminWrapper>
    <main className="w-full min-h-[100vh] max-h-auto relative mb-24  relative  pt-20">
      <BreadCrumbComponent
        title={"Facilities"}
        pageTitles={[
          { name: "Facilities", url: "/administrative/facilities" },
          { name: "Create", url: "/administrative/facilities/create" },
          { name: "Update", url: "/administrative/facilities/update" },
          { name: "Delete", url: "/administrative/facilities/delete" },
        ]}
      />
    </main>
  </AdministrativeAdminWrapper>
  )
}


