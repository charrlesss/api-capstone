import React from "react";
import { FcAbout } from "react-icons/fc";
import { AiTwotonePhone } from "react-icons/ai";
import {BsFillCalendar2CheckFill} from 'react-icons/bs'
export interface ServiceDataType {
  icon: React.ReactElement;
  heading: string;
  url: string;
}

export const serviceData: Array<ServiceDataType> = [
  {
    icon: <FcAbout className="text-[1.5rem]" />,
    heading: "features",
    url: "/",
  },
  {
    icon: <BsFillCalendar2CheckFill className="text-[1.5rem] text-blue-500" />,
    heading: "Reserve facilities & schedule your visit",
    url: "/reservation",
  },
  {
    icon: <AiTwotonePhone className="text-[1.5rem] text-blue-500"  />,
    heading: "contact",
    url: "/contact",
  },

];
