import React, { useState, useMemo } from "react";
import { AdministrativeClientSearchComponent } from "./administrative-client-search.component";
import { MdOutlineDelete } from "react-icons/md";
import { Button } from "@mui/material";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import {MdOutlineEdit,MdOutlineAdd}from "react-icons/md";

import { useGetClientDetails } from "../../../../../../hooks/user-details.hooks";

export const AdministrativeClientShcedulesComponent: React.FC<{
  listOfRequest: any;
}> = ({ listOfRequest }): JSX.Element => {
  const { client } = useGetClientDetails();
  const [showMore, setShowMore] = useState<boolean>(false);
  const fetchRequestMake = useMemo(() => {
    return listOfRequest?.data?.filter(
      (data: any) => data.userIdRequest === client?._id
    );
  }, [listOfRequest]);
  console.log(fetchRequestMake);
  return (
    <div className="relative h-full w-full">
      <div className="block w-full h-auto font font-['Bebas_Neue']">
        <h1 className="text-[22px] text-blue-500 mb-10">
          See Your visit schedule
        </h1>
      </div>
      <div className="relative w-full h-auto mb-5 flex justify-between items-center sm:gap-x-0 gap-x-2">
        <AdministrativeClientSearchComponent />
        <div>
          <button className=" py-3 px-5 rounded-lg bg-green-500 text-white">
            New
          </button>
        </div>
      </div>
      <div
        className={`${
          showMore
            ? "overflow-y-scroll border h-[500px]"
            : "overflow-y-none h-auto"
        }   w-full  relative md:p-5  `}
      >
        <div className="w-full h-auto flex flex-col gap-y-3 relative">
          {fetchRequestMake?.map((data: any, idx: number): JSX.Element => {
            return (
              <div
                key={idx}
                className="relative p-4 w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
              >
                <div className=" absolute top-[20px] right-[100px] cursor-pointer">
                  <MdOutlineAdd className="text-[20px] text-green-500" />
                </div>
                <div className=" absolute top-[20px] right-[60px] cursor-pointer">
                  <MdOutlineEdit className="text-[20px] text-blue-500" />
                </div>
                <div className=" absolute top-[20px] right-[20px] cursor-pointer">
                  <MdOutlineDelete className="text-[20px] text-red-500" />
                </div>
                <div>
                  <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                    {data?.email}
                  </h5>
                </div>
                <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                  {data?.purpose}
                </p>
                <div className="flex space-x-4 items-end  justify-between">
                  <a
                    href="/dashboard/view?id='qweqweqw'"
                    className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    View
                    <svg
                      aria-hidden="true"
                      className="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <div className="w-auto h-auto flex space-x-3">
                    <p className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400">
                      Created At : {data?.createdAt}
                    </p>
                    <p className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400">
                      Arrival Date : {data?.arrivalDate}
                    </p>
                    <p className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400">
                      Departure Date : {data?.departureDate}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full h-auto  py-5 flex justify-center ">
        <Button
          onClick={() => {
            setShowMore((show: boolean): boolean => !show);
          }}
          variant="outlined"
          startIcon={showMore ? <BsArrowDownCircle /> : <BsArrowUpCircle />}
        >
          {showMore ? "SHOW LESS" : "SHOW MORE"}
        </Button>
      </div>
    </div>
  );
};
