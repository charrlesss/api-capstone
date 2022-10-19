import React from 'react'
import { BreadCrumbComponent } from "../../../../shared/presentation/components/bread-crumb.component";
export const AdministrativeFacilitiesCreatePage = () => {
  return (
    <main className="w-full min-h-[100vh] max-h-auto relative mb-24  relative  pt-20">
      <BreadCrumbComponent
        title={"Create Facilities"}
        pageTitles={[
          { name: "Facilities", url: "/administrative/facilities" },
          { name: "Create", url: "/administrative/facilities/create" },
          { name: "Update", url: "/administrative/facilities/update" },
          { name: "Delete", url: "/administrative/facilities/delete" },
        ]}
      />
    </main>
  )
}
