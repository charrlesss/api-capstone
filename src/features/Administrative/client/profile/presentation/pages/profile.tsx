import React from "react";
import "../../../../../../assets/font-sched.css";
import { ProfileDetailsComponent } from "../component/profile-details.component";
import { ChangePasswordComponent } from "../component/change-password.component";
import { AdministrativeClientWrapper } from "../../../../../../layouts/features/Admintrative/client/administrative-client-wrapper-with-sidebar-content";
import { BackdropLoading } from "../../../../../shared/presentation/pages/loading.page";
import { useGetClientDetails } from "../../../../../../hooks/user-details.hooks";

export const Profile: React.FC = (): JSX.Element => {
  const { client } = useGetClientDetails();

  if (client === undefined) {
    return <BackdropLoading open={true} />;
  }
  return (
    <AdministrativeClientWrapper>
      <div className=" relative md:h-[800px] h-auto w-full  flex items-center justify-center">
        {client.changePass ? (
          <ChangePasswordComponent />
        ) : (
          <ProfileDetailsComponent client={client} />
        )}
      </div>
    </AdministrativeClientWrapper>
  );
};
