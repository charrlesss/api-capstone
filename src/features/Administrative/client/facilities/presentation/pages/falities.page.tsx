import React, { useEffect } from "react";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../../hooks/dispatch-selector.hooks";
import { AdministrativeClientWrapper } from "../../../../../../layouts/features/Admintrative/client/administrative-client-wrapper-with-sidebar-content";
import {
  selectFacilitiesSlice,
  getFacilities,
} from "../slices/facilities.slice";
import { FcLikePlaceholder } from "react-icons/fc";
import { useInterceptorAxios } from "../../../../../../lib/interceptor-axios";
export const FalitiesPage: React.FC = (): JSX.Element => {
  const { getAccessToken, instance } = useInterceptorAxios();
  const facilitiesSlice: any = useAppSelector(selectFacilitiesSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getFacilities({ ACCESS_TOKEN: getAccessToken(), interceptor: instance })
    );
  }, [dispatch, getAccessToken, instance]);

  console.log(facilitiesSlice.data);

  return (
    <AdministrativeClientWrapper>
      <main className="w-full min-h-auto max-h-auto relative pb-10">
        <div className=" pt-24 container mx-auto pb-5 px-4">
          <h1 className="font-['Bebas_Neue'] font-normal tracking-[2px]">
            CLick facility card to view the details.
          </h1>
        </div>
        <div className=" container mx-auto grid sm:grid-cols-2  gap-6 px-4 justify-center">
          {facilitiesSlice?.data?.map(
            (
              data: {
                _id: string;
                facilityname: string;
                facilityimage: string;
                facilitydescription: string;
              },
              index: number
            ): JSX.Element => {
              return (
                <a
                  className="relative rounded-b lg:rounded-b-none lg:rounded-r border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 max-w-sm border h-full w-full lg:max-w-full lg:flex  cursor-pointer"
                  key={index}
                  href={`/dashboard/facilities/${data._id}`}
                >
                  <div className="z-[50] text-black text-blue-700 absolute bottom-[10px] right-[10px] text-base  lg:text-[12px] md:text-[11px] sm:text-[12px] xs:text-[11px] text-[10px]">
                    Click to view
                  </div>
                  <div
                    className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                    style={{
                      backgroundImage: `url(${
                        process.env.REACT_APP_UPLOAD_URL + data.facilityimage
                      })`,
                    }}
                  ></div>
                  <div className="relative  w-full  bg-white  p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8  ">
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <FcLikePlaceholder className="text-[18px]" />
                        Facilities
                      </p>
                      <div className="text-gray-900 font-normal text-xl mb-2 capitalize font-['Bebas_Neue'] tracking-[2px]">
                        {data.facilityname}
                      </div>
                      <p className="text-gray-700 text-base lg:text-[12px] md:text-[11px] sm:text-[12px] xs:text-[11px] text-[10px]">
                        {data.facilitydescription}
                      </p>
                    </div>
                  </div>
                </a>
              );
            }
          )}
        </div>
      </main>
    </AdministrativeClientWrapper>
  );
};
