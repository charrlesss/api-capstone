import { BreadCrumbComponent } from "../../../../shared/presentation/components/bread-crumb.component";

export const AdministrativeAppoinmentsPendingPage = () => {
  return (
      <main className="w-full min-h-[100vh] max-h-auto relative mb-24  relative  pt-20">
        <BreadCrumbComponent
          title={"Pending Appointments"}
          pageTitles={[
            { name: "Appointments", url: "/administrative/appointments" },
            { name: "Pending", url: "/administrative/appointments/pending" },
            { name: "Accepted", url: "/administrative/appointments/accepted" },
            { name: "Rejected", url: "/administrative/appointments/rejected" },
          ]}
        />
      </main>
  );
};
