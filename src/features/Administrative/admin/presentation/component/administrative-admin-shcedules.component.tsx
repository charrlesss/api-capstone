import React, { useState, useEffect } from "react";
import { AdministrativeAdminSearchComponent } from "./administrative-admin-search.component";
import { MdOutlineDelete } from "react-icons/md";
import { Button } from "@mui/material";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";


export const AdministrativeAdminShcedulesComponent: React.FC =
  (): JSX.Element => {
    const [showMore, setShowMore] = useState<boolean>(false);
    const [arrayData, setArrayData] = useState<Array<number>>([
      1, 2, 3, 2, 4, 4, 521, 2,
    ]);
    const [subCon, setSubCon] = useState<Array<number> | undefined>(undefined);

    useEffect(() => {
      setSubCon(arrayData);
      setSubCon((data) => {
        if (data === undefined) return;

        if (!showMore && data.length >= 2) {
          const [one, two, three] = data;
          return [one, two, three];
        }
        return data;
      });
    }, [showMore, arrayData]);

    return (
      <div className="relative h-full w-full">
        <div className="block w-full h-auto font font-['Bebas_Neue']">
          <h1 className="text-[22px] text-blue-500 mb-10">
            See Your visit schedule
          </h1>
        </div>
        <div className="relative w-full h-auto mb-5 flex justify-between items-center sm:gap-x-0 gap-x-2">
          <AdministrativeAdminSearchComponent />
          <div>
            <button className=" py-3 px-5 rounded-lg bg-green-500 text-white">
              New
            </button>
          </div>
        </div>
        <div
          className={`${
            showMore
              ? "overflow-y-scroll border h-[400px]"
              : "overflow-y-none h-auto"
          }   w-full  relative p-5  `}
        >
          <div className="w-full h-auto flex flex-col gap-y-3 relative">
            {subCon?.map((data: number, idx: number): JSX.Element => {
              return (
                <div
                  key={idx}
                  className="relative p-6 w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className=" absolute top-[10px] right-[10px] cursor-pointer">
                    <MdOutlineDelete className="text-[20px] text-red-500" />
                  </div>
                  <div>
                    <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                      Noteworthy technology acquisitions 2021
                    </h5>
                  </div>
                  <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of
                    2021 so far, in reverse chronological order.
                  </p>
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
