import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { AiOutlineUser, AiTwotonePhone } from "react-icons/ai";
import { BsFillCalendar2CheckFill, BsThreeDots } from "react-icons/bs";
import { SigninSignupComponent } from "../features/shared/presentation/components/signin-signup.component";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useInterceptorAxios } from "../lib/interceptor-axios";
import { MdDashboard } from "react-icons/md";

const Footer: React.FC = (): JSX.Element => {
  const { isAuthenticated } = useInterceptorAxios();
  const [openLoginChooserModal, setOpenLoginChooserModal] =
    useState<boolean>(false);
  const [openFormFor, setOpenFormFor] = useState<string>("");
  const [openMoreButton, setOpenMoreButton] = useState<boolean>(false);

  const { pathname } = useLocation();

  return (
    <footer className="px-4 bg-zinc-800 font-light font-['Bebas_Neue'] tracking-[4px]  text-sm w-full border py-2 md:hidden bg-secondary fixed bottom-0 left-0 right-0">
      <nav className="mx-auto ">
        <ul className="flex  h-full text-white items-center ">
          <li className="flex-1  ">
            <Link
              to={"/"}
              className="flex flex-col items-center justify-center h-full cursor-pointer"
            >
              <MdOutlineFeaturedPlayList
                className={` ${
                  pathname === "/"
                    ? " text-blue-500 border-blue-500"
                    : " text-white"
                } sm:text-[2em]  text-[1.4rem] rounded-md  border p-1`}
              />
              <span
                className={`${
                  pathname === "/" && "text-blue-500"
                } sm:text=[11px] text-[10.2px]`}
              >
                features
              </span>
            </Link>
          </li>
          <li className="flex-1 ">
            <Link
              to={isAuthenticated() ? "/dashboard" : "/reservation"}
              className="flex flex-col items-center justify-center h-full cursor-pointer "
            >
              {isAuthenticated() ? (
                <MdDashboard
                  className={`${
                    pathname === "/reservation"
                      ? " text-blue-500 border-blue-500"
                      : " text-white"
                  } sm:text-[2em]  text-[1.4rem] rounded-md  border-text-white border p-1 text-white`}
                />
              ) : (
                <BsFillCalendar2CheckFill
                  className={`${
                    pathname === "/reservation"
                      ? " text-blue-500 border-blue-500"
                      : " text-white"
                  } sm:text-[2em]  text-[1.4rem] rounded-md  border-text-white border p-1 text-white`}
                />
              )}
              <span
                className={`${
                  pathname === "/reservation" && "text-blue-500"
                } sm:text=[11px] text-[10.2px]`}
              >
                {isAuthenticated() ? "dashboard" : "reservation"}
              </span>
            </Link>
          </li>
          <li className="flex-1 ">
            <Link
              to={"/contact"}
              className="flex flex-col items-center justify-center h-full cursor-pointer"
            >
              <AiTwotonePhone
                className={`${
                  pathname === "/contact"
                    ? " text-blue-500 border-blue-500"
                    : " text-white"
                } sm:text-[2em]  text-[1.4rem] rounded-md border text-white border p-1 text-white`}
              />
              <span
                className={`${
                  pathname === "/contact" && "text-blue-500"
                }sm:text=[11px] text-[10.2px]`}
              >
                contact
              </span>
            </Link>
          </li>
          {!isAuthenticated() && (
            <li className="flex-1  flex flex-col items-center justify-center relative">
              <button
                onClick={() => {
                  setOpenMoreButton((show: boolean) => !show);
                }}
                className=" p-2 cursor-pointer"
              >
                <BsThreeDots className="sm:text-[2em]  text-[1.4rem]" />
              </button>
              <div
                className={`${
                  openMoreButton ? "flex" : "hidden"
                } flex-col absolute border bg-black w-auto  gap-2 h-auto -top-[155px]`}
              >
                <button
                  onClick={() => {
                    setOpenLoginChooserModal(true);
                    setOpenFormFor("signin");
                  }}
                  className="cursor-pointer p-3 flex  flex-col items-center justify-center space-y-1 text-white font-['Bebas_Neue']"
                >
                  <AiOutlineUser className="sm:text-2xl text-lg text-white" />
                  <span className="tracking-[2px] sm:text-xs text-[11px] text-white font-normal">
                    Sign In
                  </span>
                </button>

                <button
                  onClick={() => {
                    setOpenLoginChooserModal(true);
                    setOpenFormFor("signup");
                  }}
                  className="cursor-pointer py-3 flex  flex-col items-center justify-center space-y-1 text-white  font-['Bebas_Neue']"
                >
                  <AiOutlineUserAdd className="sm:text-2xl text-lg text-white" />
                  <span className="tracking-[2px] sm:text-xs text-[11px] text-white font-normal">
                    Sign up
                  </span>
                </button>
              </div>
            </li>
          )}
        </ul>
      </nav>
      {!isAuthenticated() && (
        <SigninSignupComponent
          open={openLoginChooserModal}
          whatForm={openFormFor}
          onClose={() => {
            setOpenLoginChooserModal(false);
            setOpenFormFor("");
          }}
        />
      )}
    </footer>
  );
};

export default Footer;
