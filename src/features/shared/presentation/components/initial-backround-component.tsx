import React, { useEffect, useState } from "react";
import { useInterceptorAxios } from "../../../../lib/interceptor-axios";
import Header from "../../../../layouts/header";
import Footer from "../../../../layouts/footer";
import { serviceData, ServiceDataType } from "../../data/card.data";
import { SigninSignupComponent } from "./signin-signup.component";
import { MdDashboard } from "react-icons/md";
import {
  verifyUserEmail,
  selectverifyUserEmail,
} from "../slices/verify-email.slices";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/dispatch-selector.hooks";
import { ValidateEmail } from "./validate-email.component";

export const InitialBackroundComponent: React.FC = (): JSX.Element => {
  const [goToReservation, setgoToReservation] = useState<boolean>(false);
  const { isAuthenticated } = useInterceptorAxios();
  const getVerifyUserEmail: any = useAppSelector(selectverifyUserEmail);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyUserEmail());
  }, [dispatch]);

  if (getVerifyUserEmail?.data?.verifying) {
    return <ValidateEmail />;
  }

  return (
    <main
      className="w-full max:h-[100vh] h-auto   "
      onClick={() => setgoToReservation(false)}
    >
      <Header />
      <section className=" container mx-auto flex p-4 md:justify-between mt-20 relative font-['Bebas_Neue'] justify-center">
        <section className=" xs:h-[700px] xs:mb-0 h-auto mb-5 sx:px-10  relatvie flex items-center justify-center flex-col ">
          <div>
            <h1 className="text-black md:text-[3rem] text-[2rem] font-semibold  tracking-[4px]">
              Your trusted{" "}
              <span className="md:text-red-400 text-white">delivery</span>{" "}
              partner
            </h1>
            <br />
            <h2 className="text-left  tracking-[2px] md:text-black text-white md:mb-0 mb-24   opacity-80">
              Experience fastest service.
            </h2>

            <section className="mt-4 container text-center md:grid gap-4 xl:grid-cols-3 md:grid-cols-2 flex flex-col mb-12 xs:pt-0 2xs:pt-4 pt-40">
              {serviceData.map(
                (data: ServiceDataType, idx: number): JSX.Element => {
                  return idx === 1 && !isAuthenticated() ? (
                    <div
                      onClick={(e: any) => {
                        e.stopPropagation();
                        setgoToReservation(true);
                      }}
                      key={idx}
                      style={{
                        boxShadow: "0 1px 10px rgba(0, 0, 0, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.58)",
                      }}
                      className="p-4 rounded-2xl  backdrop-blur-[.7px] bg-[#ffffffcc]	 cursor-pointer"
                    >
                      <div className="w-full h-auto flex justify-center mb-2">
                        {data.icon}
                      </div>
                      <h5 className=" text-medium  text-blue-500 tracking-[2px] font-['Bebas_Neue']">
                        {data.heading}
                      </h5>
                    </div>
                  ) : idx === 1 && isAuthenticated() ? (
                    <a
                      href="/dashboard"
                      key={idx}
                      style={{
                        boxShadow: "0 1px 10px rgba(0, 0, 0, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.58)",
                      }}
                      className="p-4 rounded-2xl  backdrop-blur-[.7px] bg-[#ffffffcc]	 cursor-pointer"
                    >
                      <div className="w-full h-auto flex justify-center mb-2">
                        <MdDashboard className="text-[1.5rem] text-blue-500" />
                      </div>
                      <h5 className=" text-medium  text-blue-500 tracking-[2px] font-['Bebas_Neue']">
                        Dashboard
                      </h5>
                    </a>
                  ) : (
                    <a
                      href={data.url}
                      key={idx}
                      style={{
                        boxShadow: "0 1px 10px rgba(0, 0, 0, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.58)",
                      }}
                      className="p-4 rounded-2xl  backdrop-blur-[.7px] bg-[#ffffffcc]	 cursor-pointer"
                    >
                      <div className="w-full h-auto flex justify-center mb-2">
                        {data.icon}
                      </div>
                      <h5 className=" text-medium  text-blue-500 tracking-[2px] font-['Bebas_Neue']">
                        {data.heading}
                      </h5>
                    </a>
                  );
                }
              )}
            </section>
          </div>
        </section>

        <section className="flex items-center justify-center md:relative absolute md:z-[1] md:mt-0  mt-36 -z-[1] ">
          <img
            className="w-[600px] h-auto max-h-[600px]  "
            src={process.env.REACT_APP_UPLOAD_URL + "delivery-boy.png"}
            alt="delivery ss"
          />
          <div className="lg:w-[500px] lg:h-[500px] md:w-[300px] md:h-[300px] md:block hidden raduis-[50%] w-[320px] h-[320px] absolute rounded-full bg-blue-200 -z-20"></div>
        </section>
      </section>
      <div className="absolute w-0 md:w-full bottom-0  left-0 -z-50">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fillOpacity="1"
            d="M0,160L40,181.3C80,203,160,245,240,245.3C320,245,400,203,480,186.7C560,171,640,181,720,197.3C800,213,880,235,960,240C1040,245,1120,235,1200,197.3C1280,160,1360,96,1400,64L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div
        style={{
          clipPath: "ellipse(85% 100% at 50% 0%)",
        }}
        className="absolute w-full md:w-0 top-0  h-[300px] left-0 -z-50 block box-border bg-[#0099ff]	  "
      ></div>

      <SigninSignupComponent
        onClose={() => {
          setgoToReservation(false);
        }}
        open={goToReservation}
        whatForm={"signin"}
      />

      <Footer />
    </main>
  );
};
