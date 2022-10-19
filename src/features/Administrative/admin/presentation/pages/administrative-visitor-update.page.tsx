import { BreadCrumbComponent } from "../../../../shared/presentation/components/bread-crumb.component";

export const AdministrativeVisitorUpdatePage = () => {
  return (
      <main className="w-full min-h-[100vh] max-h-auto relative mb-24  relative  pt-20">
        <BreadCrumbComponent
          title={"Update Visitors"}
          pageTitles={[
            { name: "Visitors", url: "/administrative/visitors" },
            { name: "Create", url: "/administrative/visitors/create" },
            { name: "Update", url: "/administrative/visitors/update" },
            { name: "Delete", url: "/administrative/visitors/delete" },
          ]}
        />
      </main>
  );
};
