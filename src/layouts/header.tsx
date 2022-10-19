import React, { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { SigninSignupComponent } from "../features/shared/presentation/components/signin-signup.component";
import { useInterceptorAxios } from "../lib/interceptor-axios";

const Header: React.FC = (): JSX.Element => {
  const [openLoginChooserModal, setOpenLoginChooserModal] =
    useState<boolean>(false);
  const [openFormFor, setOpenFormFor] = useState<string>("");
  const { isAuthenticated } = useInterceptorAxios();
  const [TABS, setTABS] = useState<Array<{ name: string; url: string }>>([]);
  const location = useLocation();

  const TABSAUTH = [
    {
      name: "features",
      url: "/",
    },
    {
      name: "dashboard",
      url: "/dashboard",
    },
    {
      name: "contact",
      url: "/contact",
    },
  ];

  const TABSNOTAUTH = [
    {
      name: "features",
      url: "/",
    },
    {
      name: "contact",
      url: "/contact",
    },
  ];

  useEffect(() => {
    if (isAuthenticated()) {
      setTABS(TABSAUTH);
      return;
    }
    setTABS(TABSNOTAUTH);
  }, [isAuthenticated]);

  return (
    <header className={"sticky w-full top-0 z-20 hidden md:block bg-white"}>
      <div className={` w-full bg-white shadow-2xl`}>
        <nav
          className={` text-lg font-light flex justify-between items-center container mx-auto py-2`}
        >
          <h1 className="px-4 font-['Bebas_Neue'] tracking-[4px]">
            FRAI <span className="text-red-400">GHT</span>
          </h1>
          <div className="flex items-center justify-center space-x-4">
            <ul className="text-white font-semibold items-stretch h-[40px] justify-center hidden md:flex">
              {TABS?.map((tab: any, i) => {
                return (
                  <li
                    key={i}
                    className={`font-['Bebas_Neue'] tracking-[4px] px-4 pb-1 flex justify-center items-center text-lg font-light  
                   ${
                     tab.url === location.pathname
                       ? "text-[#0099FF]"
                       : "text-black"
                   }`}
                  >
                    <Link to={tab.url}>{tab.name}</Link>
                  </li>
                );
              })}
              {!isAuthenticated() && (
                <>
                  <button
                    onClick={() => {
                      setOpenLoginChooserModal(true);
                      setOpenFormFor("signin");
                    }}
                    className=" px-4 font-['Bebas_Neue'] flex flex-col items-center justify-center mt-1 space-y-1 text-white rounded-xl font-['Bebas_Neue']"
                  >
                    <AiOutlineUser className="text-2xl  text-black" />
                    <span className="tracking-[2px] text-xs text-black font-normal">
                      Sign In
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setOpenLoginChooserModal(true);
                      setOpenFormFor("signup");
                    }}
                    className=" px-4 font-['Bebas_Neue'] flex flex-col items-center justify-center mt-1 space-y-1 text-white rounded-xl font-['Bebas_Neue']"
                  >
                    <AiOutlineUser className="text-2xl  text-black" />
                    <span className="tracking-[2px] text-xs text-black font-normal">
                      sign up
                    </span>
                  </button>
                </>
              )}
            </ul>
            <div className="flex items-center justify-center space-x-3 lg:space-x-6"></div>
          </div>
        </nav>
      </div>

      <SigninSignupComponent
        whatForm={openFormFor}
        open={openLoginChooserModal}
        onClose={() => {
          setOpenLoginChooserModal(false);
        }}
      />
    </header>
  );
};

export default Header;
