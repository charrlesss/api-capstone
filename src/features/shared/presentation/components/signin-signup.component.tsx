import { VscChromeClose } from "react-icons/vsc";
import { SigninFormComponent } from "./signin-form-component";
import { SignupFormComponent } from "./signup-form-component";

interface LoginChooserModalProps {
  open: boolean;
  onClose: () => void;
  whatForm: string;
}

const REACT_APP_API = process.env.REACT_APP_API

export const SigninSignupComponent: React.FC<LoginChooserModalProps> = (
  props
): JSX.Element => {
  return (
    <>
      <div
        style={{ display: props.open ? "flex" : "none" }}
        onClick={() => props.onClose()}
        className=" fixed inset-0 z-30 flex items-center justify-center bg-secondary bg-opacity-30 backdrop-blur-sm "
      >
        <div
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
          }}
          className=" bg-white px-4 py-8 round w-[90%] sm:w-[450px] rounded-lg relative text-white border "
        >
          <span
            className="absolute top-[10px] right-[20px] cursor-pointer  "
            onClick={(e: any) => {
              e.stopPropagation();
              props.onClose();
            }}
          >
            <VscChromeClose className="text-black" />
          </span>
          <h1 className="text-3xl font-['Bebas_Neue'] tracking-[3px] text-center text-blue-500">
            Hi! Welcome to Freight
          </h1>
          <h2 className="text-md text-center tracking-[1.5px] text-black pt-4 font-['Bebas_Neue']">
            Signin your account or Continue with us by connecting your existing
            account
          </h2>
          <section className="container mx-auto">
            <div className="w-full h-auto p-4">
              {props.whatForm === "signin" ? (
                <SigninFormComponent />
              ) : props.whatForm === "signup" ? (
                <SignupFormComponent />
              ) : null}
            </div>
            <div className="flex w-full  bg-transparent h-auto mb-4 items-center">
              <div className="bg-black h-[2px] w-full" />
              <span className="text-black tracking-[1px] px-2 text-lg">OR</span>
              <div className="bg-black h-[2px] w-full" />
            </div>
            <div className="flex sm:flex-row flex-col justify-between  mx-auto">
              <div className="flex  justify-center w-full mb-3 ">
                <div
                  className="google-btn cursor-pointer sm:w-[200px] w-[300px] text-center"
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    e.stopPropagation();
                    window.open(REACT_APP_API +"/google", "_self");
                  }}
                >
                  <div className="google-icon-wrapper ">
                    <img
                      className="google-icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      alt="goole-icon"
                    />
                  </div>
                  <p className="btn-text">
                    <b>Continue with google</b>
                  </p>
                </div>
              </div>
              <div className="flex  justify-center w-full ">
                <button
                  onClick={() => {
                    window.open(REACT_APP_API+"/facebook", "_self");
                  }}
                  className="loginBtn loginBtn--facebook sm:w-auto w-[300px]"
                >
                  Continue with Facebook
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
