import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";

export const AdministrativeAdminVisitorsComponent = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [arrayData, setArrayData] = useState<Array<number>>([
    1, 2, 3, 2, 4, 4, 521, 2, 2, 3, 4,
  ]);
  const [subCon, setSubCon] = useState<Array<number> | undefined>(undefined);

  useEffect(() => {
    setSubCon(arrayData);
    setSubCon((data) => {
      if (data === undefined) return;

      if (!showMore && data.length >= 2) {
        const [one, two, three, four, five] = data;
        return [one, two, three, four, five];
      }
      return data;
    });
  }, [showMore, arrayData]);

  return (
    <>
      <div
        className={`${
          showMore
            ? "border h-[380px] overflow-y-scroll "
            : "h-auto overflow-none "
        }  w-full relative p-5  `}
      >
        <div className="w-full h-auto flex flex-col gap-y-3 relative">
          <div>
            <table className="w-full text-md bg-white shadow-md rounded mb-4 ">
              <tbody>
                <tr className="border-b">
                <th className="text-left p-3 px-5">No.</th>
                  <th className="text-left p-3 px-5">Profile</th>
                  <th className="text-left p-3 px-5">Name</th>
                  <th className="md:block hidden text-left p-3 px-5">Email</th>
                </tr>
                {subCon?.map((data: number, idx: number): JSX.Element => {
                  return (
                    <tr className="border-b hover:bg-orange-100" key={idx}>
                      <td className="p-3 px-5">
                        {idx +1}.
                      </td>
                      <td className="p-3 px-5">
                        <Avatar
                          alt="Remy Sharp"
                          src="boy1.jpg"
                          sx={{ width: 30, height: 30 }}
                          className="cursor-pointer"
                        />
                      </td>
                      <td className="p-3 px-5">
                        <input
                          type="text"
                          value="charles palencia"
                          className="bg-transparent w-full md:text-left text-center "
                        />
                      </td>
                      <td className="p-3 px-5 md:flex gap-x-10 hidden">
                        <input
                          type="text"
                          value="charlespalencia21@gmail.com"
                          className="bg-transparent w-full border"
                        />
                        <button
                          type="button"
                          className="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          Active
                        </button>
                      </td>
                      <td className="p-3 px-5 md:hidden gap-x-10 flex">
                      <button
                          type="button"
                          className="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          Active
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
    </>
  );
};
