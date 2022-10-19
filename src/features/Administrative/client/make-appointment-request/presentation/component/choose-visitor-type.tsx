import React from "react";
import { BackdropLoading } from "../../../../../shared/presentation/pages/loading.page";
import { useAppSelector } from "../../../../../../hooks/dispatch-selector.hooks";
import { selectGetVisitorTypes } from "../slices/get-visitor-types.slices";

export const ChooseVisitorType = () => {
  const visitorTypes: any = useAppSelector(selectGetVisitorTypes);

  if (visitorTypes === undefined) {
    return <BackdropLoading open={true} />;
  }
  return (
    <div className=" relative max-h-auto min-h-[500px]  flex items-center flex-col">
      <div className="sm:container sm:mx-auto w-full ">
        <h1 className="sm:text-[2.5em] text-[2rem] text-center">
          What guest are you ?
        </h1>
        <br />
        <br />
        <div className="rounded  bg-white grid md:grid-cols-2 gap-4">
          {visitorTypes?.data?.data.map(
            (
              { _id, typeofVisitory }: { _id: any; typeofVisitory: string },
              index: number
            ): JSX.Element => {
              const randomColor: Array<string> = [
                "bg-red-500",
                "bg-orange-500",
                "bg-amber-500",
                "bg-yellow-500",
                "bg-green-500",
                "bg-teal-500",
                "bg-sky-500",
                "bg-blue-500",
                "bg-indigo-500",
                "bg-violet-500",
                "bg-fuchsia-500",
                "bg-rose-500",
              ];

              const randomColorGenerator = () => {
                const con: Array<string> = [];
                let rand = randomColor[Math.floor(Math.random() * 11)];
                let result = "";
                if (con.length !== 0 && con.includes(rand)) {
                  rand = randomColor[Math.floor(Math.random() * 11)];
                  con.push(rand);
                  result = rand;
                  return result;
                }
                result = rand;
                con.push(rand);
                return result;
              };
              return (
                <a
                  key={index}
                  className={`${randomColorGenerator()} cursor-pointer lg:w-[calc(100%-60px)] w-full mx-auto text-center sm:p-10 sm:p-10 p-7   rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 `}
                  href={"/dashboard/make-appointment-request?id=" + index}
                >
                  <span
                    className="sm:text-2xl text-md tracking-[2px] font-bold text-white "
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {typeofVisitory}
                  </span>
                </a>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};
