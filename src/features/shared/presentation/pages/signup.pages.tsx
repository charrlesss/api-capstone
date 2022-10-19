import React from "react";
import { InitialBackroundComponent } from "../components/initial-backround-component";
import { SigninSignupComponent } from "../components/signin-signup.component";

export const SignupPages = () => {
  return (
    <div>
      <InitialBackroundComponent />
      <SigninSignupComponent
        onClose={() => {
          window.location.href = "/";
        }}
        open={true}
        whatForm={"signup"}
      />
    </div>
  );
};
