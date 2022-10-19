import { BreadCrumbComponent } from "../../../../shared/presentation/components/bread-crumb.component";

export const AdministrativeEmployeeCreatePage = () => {
  return (
      <main className="w-full min-h-[100vh] max-h-auto relative mb-24  relative  pt-20">
        <BreadCrumbComponent
          title={"Create Employee"}
          pageTitles={[
            { name: "Employees", url: "/administrative/employee" },
            { name: "Create", url: "/administrative/employee/create" },
            { name: "Update", url: "/administrative/employee/update" },
            { name: "Delete", url: "/administrative/employee/delete" },
          ]}
        />
      </main>
  );
};
