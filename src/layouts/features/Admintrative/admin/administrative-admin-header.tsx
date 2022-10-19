import { Avatar } from "@mui/material";
import Icon from "awesome-react-icons";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineBell } from "react-icons/ai";
import { BackdropLoading } from "../../../../features/shared/presentation/pages/loading.page";
import { useGetAdminDetails } from "../../../../hooks/admin-datails.hooks";

export const AdministrativeAdminHeader: React.FC<{
  callback: () => void;
  open: boolean;
}> = ({ callback, open }): JSX.Element => {
  const { admin } = useGetAdminDetails();
  const location = useLocation();
  const navigate = useNavigate();
  const TABS = [
    {
      name: "administrative",
      url: "/administrative",
    },
    {
      name: "appointment",
      url: "/administrative/appointments",
    },
    {
      name: "pending",
      url: "/administrative/appointments/pending",
    },
    {
      name: "rejected",
      url: "/administrative/appointments/rejected",
    },
    {
      name: "accepted",
      url: "/administrative/appointments/accepted",
    },
    {
      name: "Profile",
      url: "/administrative/profile",
    },
    {
      name: "visitor",
      url: "/administrative/visitors",
    },
    { name: "Create", url: "/administrative/visitors/create" },
    { name: "Update", url: "/administrative/visitors/update" },
    { name: "Delete", url: "/administrative/visitors/delete" },
    {
      name: "employee",
      url: "/administrative/employee",
    },
    { name: "Create", url: "/administrative/employee/create" },
    { name: "Update", url: "/administrative/employee/update" },
    { name: "Delete", url: "/administrative/employee/delete" },
    {
      name: "facilities",
      url: "/administrative/facilities",
    },
    { name: "Create", url: "/administrative/facilities/create" },
    { name: "Update", url: "/administrative/facilities/update" },
    { name: "Delete", url: "/administrative/facilities/delete" },
    {
      name: "documents",
      url: "/administrative/documents",
    },
    {
      name: "legal",
      url: "/administrative/legal",
    },
  ];

  if (admin === undefined) {
    return <BackdropLoading open={true} />;
  }

  return (
    <header className={"sticky w-full top-0 z-20  block bg-white "}>
      <div className={` w-full bg-white `}>
        <nav
          className={` text-lg font-light flex justify-between items-center   px-4 py-2`}
        >
          <div className="flex items-center justify-center space-x-4">
            <ul className="text-white font-semibold items-stretch h-[40px] justify-center flex">
              {TABS.map((tab: any, i) => {
                return (
                  tab.url === location.pathname && (
                    <div className="flex " key={i}>
                      <button
                        onClick={(): void => {
                          callback();
                        }}
                        type="button"
                        className="z-[100] block "
                      >
                        <Icon name="burger" className="w-6 h-6 text-black" />
                      </button>
                      {!open && (
                        <span className="text-white border bg-blue-500 px-2 py-1 rounded-2xl flex-1 mx-2 sm:text-lg text-[12px]  font-normal font-['Bebas_Neue'] tracking-[2px] ">
                          FREIGHT
                        </span>
                      )}
                      <li
                        className={`${
                          open ? "hidden" : ""
                        } font-['Bebas_Neue'] tracking-[4px] px-4 pb-1 flex justify-center items-center  font-light   sm:text-lg text-[11px]
                   ${
                     tab.url === location.pathname
                       ? "text-[#0099FF]"
                       : "text-black"
                   }`}
                      >
                        <Link to={tab.url}>{tab.name}</Link>
                      </li>
                    </div>
                  )
                );
              })}
            </ul>
          </div>
          <div className="flex md:pr-28 space-x-5 ">
            <div className=" w-full flex flex-col justify-center items-center ">
              <AiOutlineBell className="text-[22px] cursor-pointer" />
            </div>
            <div
              className=" w-full flex flex-col justify-center items-center "
              onClick={() => navigate("/dashboard/profile")}
            >
              <Avatar
                alt="Remy Sharp"
                src={
                  admin?.profile?.split("https")[1]
                    ? admin?.profile
                    : process.env.REACT_APP_UPLOAD_URL + admin?.profile
                }
                sx={{ width: 30, height: 30 }}
                className="cursor-pointer"
              />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
