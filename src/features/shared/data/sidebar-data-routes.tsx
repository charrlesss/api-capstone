import React from "react";
import { AiOutlineLineChart, AiOutlineUser } from "react-icons/ai";
import { AiTwotonePhone } from "react-icons/ai";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import "../../../assets/icon.css";

export interface SidebarDataRoutesTypes {
  title: React.ReactElement | string;
  itemId: string;
  elemBefore?: () => React.ReactElement;
  subNav?: Array<SidebarDataRoutesTypes>;
}


export const sidebarDataRoutesOpenForAdmin: Array<SidebarDataRoutesTypes> = [
  {
    title: <h1 className="whitespace-pre duration-300 ">Analytics</h1>,
    itemId: "/administrative",
    elemBefore: () => <AiOutlineLineChart />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">Appointments</h1>,
    itemId: "/administrative/appointments",
    elemBefore: () => <AiOutlineSchedule />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">Visitors</h1>,
    itemId: "/administrative/visitors",
    elemBefore: () => <MdOutlineFeaturedPlayList />,
  },

  {
    title: <h1 className="whitespace-pre duration-300 ">Employee</h1>,
    itemId: "/administrative/employee",
    elemBefore: () => <AiTwotonePhone />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">facilities</h1>,
    itemId: "/administrative/facilities",
    elemBefore: () => <FaRegBuilding />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">Documents</h1>,
    itemId: "/administrative/documents",
    elemBefore: () => <AiTwotonePhone />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">Legal</h1>,
    itemId: "/administrative/legal",
    elemBefore: () => <AiTwotonePhone />,
  },
];



export const sidebarDataRoutesOpenForAdminClose: Array<SidebarDataRoutesTypes> = [
  {
    title: <h1 className="whitespace-pre duration-300 ">Analytics</h1>,
    itemId: "/administrative",
    elemBefore: () => <AiOutlineLineChart />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">Profile</h1>,
    itemId: "/administrative/profile",
    elemBefore: () => <AiOutlineUser />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">Appointments</h1>,
    itemId: "/administrative/appointments",
    elemBefore: () => <AiOutlineSchedule />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">Visitors</h1>,
    itemId: "/administrative/visitors",
    elemBefore: () => <MdOutlineFeaturedPlayList />,
  },

  {
    title: <h1 className="whitespace-pre duration-300 ">Employee</h1>,
    itemId: "/administrative/employee",
    elemBefore: () => <AiTwotonePhone />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">facilities</h1>,
    itemId: "/administrative/facilities",
    elemBefore: () => <FaRegBuilding />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">Documents</h1>,
    itemId: "/administrative/documents",
    elemBefore: () => <AiTwotonePhone />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">Legal</h1>,
    itemId: "/administrative/legal",
    elemBefore: () => <AiTwotonePhone />,
  },
]

export const sidebarDataRoutesOpen: Array<SidebarDataRoutesTypes> = [
  {
    title: <h1 className="whitespace-pre duration-300 ">dashboard</h1>,
    itemId: "/dashboard",
    elemBefore: () => <AiOutlineLineChart />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">facilities</h1>,
    itemId: "/dashboard/facilities",
    elemBefore: () => <FaRegBuilding />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">Make appointment reques</h1>,
    itemId: "/dashboard/make-appointment-request",
    elemBefore: () => <AiOutlineSchedule />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">features</h1>,
    itemId: "/",
    elemBefore: () => <MdOutlineFeaturedPlayList />,
  },

  {
    title: <h1 className="whitespace-pre duration-300 ">contact</h1>,
    itemId: "/contact",
    elemBefore: () => <AiTwotonePhone />,
  },
];

export const sidebarDataRoutesClose: Array<SidebarDataRoutesTypes> = [
  {
    title: <h1 className="whitespace-pre duration-300 ">dashboard</h1>,
    itemId: "/dashboard",
    elemBefore: () => <AiOutlineLineChart />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">Profile</h1>,
    itemId: "/dashboard/profile",
    elemBefore: () => <AiOutlineUser />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">facilities</h1>,
    itemId: "/dashboard/facilities",
    elemBefore: () => <FaRegBuilding />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">Make appointment reques</h1>,
    itemId: "/dashboard/make-appointment-request",
    elemBefore: () => <AiOutlineSchedule />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">features</h1>,
    itemId: "/",
    elemBefore: () => <MdOutlineFeaturedPlayList />,
  },
  {
    title: <h1 className="whitespace-pre duration-300 ">contact</h1>,
    itemId: "/contact",
    elemBefore: () => <AiTwotonePhone />,
  },
];
