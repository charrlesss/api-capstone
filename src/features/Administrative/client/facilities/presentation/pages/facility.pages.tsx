import React from "react";
import { useParams } from "react-router-dom";
import { selectFacilitiesSlice } from "../slices/facilities.slice";
import { useAppSelector } from "../../../../../../hooks/dispatch-selector.hooks";
import { Button } from "@mui/material";
import { FaDirections } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { BackdropLoading } from "../../../../../shared/presentation/pages/loading.page";

export const FacilityPages: React.FC = (): JSX.Element => {
  const params = useParams();
  const facilitiesSlice: any = useAppSelector(selectFacilitiesSlice);
  const filteredList = facilitiesSlice?.data?.filter(
    (data: any) => data._id === params.facility
  );
  if (facilitiesSlice === undefined) {
    return <BackdropLoading open={true} />;
  }
  return (
    <div className="flex justify-center w-full ">
      <div className="flex flex-col  xl:flex-row w-full rounded-lg bg-white shadow-lg ">
        <img
          className=" w-[700px] lg:h-[700px] mx-auto h-auto object-fit  rounded-t-lg md:rounded-none md:rounded-l-lg border"
          src={
            process.env.REACT_APP_UPLOAD_URL + filteredList?.[0].facilityimage
          }
          alt=""
        />
        <div className="p-6 flex flex-col justify-start w-full relative">
          <h5 className="text-gray-900 text-xl font-medium mb-2 capitalize">
            {filteredList?.[0].facilityname}
          </h5>
          <p className="text-gray-700 text-base mb-4">
            {filteredList?.[0].facilitydescription}
          </p>
          <h5 className="text-gray-900 text-lg font-medium mb-2 capitalize">
            Amenities
          </h5>
          <ul className="relative block">
            {filteredList?.[0].amenities.map((data: string, idx: number) => {
              return (
                <li key={idx} className="text-gray-600 text-xs list-disc	">
                  {data}
                </li>
              );
            })}
          </ul>
          <h5 className="text-gray-900 text-lg font-medium mb-2 capitalize mt-10">
            Services
          </h5>
          <ul className="relative block">
            {filteredList?.[0].services.map((data: string, idx: number) => {
              return (
                <li key={idx} className="text-gray-600 text-xs list-disc	">
                  {data}
                </li>
              );
            })}
          </ul>
          <h5 className="text-gray-900 text-md font-medium mb-2 capitalize mt-3">
            Facility Location
          </h5>
          <p
            onClick={() => {
              window.open(
                `https://maps.google.com/?q=${filteredList?.[0].location}`,
                "_self"
              );
            }}
            className="cursor-pointer hover:text-blue-300 text-gray-600 text-xs list-disc list-disc	"
          >
            {filteredList?.[0].location}
          </p>
          <h5 className="text-gray-900 text-md font-medium mb-2 capitalize mt-3">
            Facility Address
          </h5>
          <p className="mb-24 text-gray-600 text-xs list-disc	list-disc">
            {filteredList?.[0].address}
          </p>
          <div className="w-auto md:absolute flex md:flex-row flex-col gap-2 relative mt-10 bottom-[20px]  ">
            <Button
              variant="outlined"
              size="small"
              endIcon={<HiLocationMarker className="text-blue-500" />}
              onClick={() => {
                window.open(
                  `https://maps.google.com/?q=${filteredList?.[0].location}`,
                  "_self"
                );
              }}
            >
              Open to google map
            </Button>
            <Button
              variant="outlined"
              size="small"
              endIcon={<FaDirections />}
              onClick={() => {
                navigator.geolocation.getCurrentPosition(function (position) {
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&origin=${
                      position.coords.latitude
                    },${
                      position.coords.longitude
                    }&destination=${"Hiromitsu Quezon City"}`,
                    "_self"
                  );
                });
              }}
            >
              Open to google map with direction
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
