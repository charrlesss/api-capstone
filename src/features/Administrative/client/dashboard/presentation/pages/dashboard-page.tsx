import React, { useEffect } from "react";
import { AdministrativeClientCircleGraphComponent } from "../component/administrative-client-circle-graph.component";
import { AdministrativeClientboxGraphComponent } from "../component/administrative-client-box-graph.component";
import { AdministrativeClientShcedulesComponent } from "../component/administrative-client-shcedules.component";
import { AdministrativeClientWrapper } from "../../../../../../layouts/features/Admintrative/client/administrative-client-wrapper-with-sidebar-content";
import { useGetClientDetails } from "../../../../../../hooks/user-details.hooks";
import { SliderImageComponent } from "../component/slider-image.component";
import { useInterceptorAxios } from "../../../../../../lib/interceptor-axios";
import {
  getFacilities,
  selectFacilitiesSlice,
} from "../../../facilities/presentation/slices/facilities.slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/dispatch-selector.hooks";
import { BackdropLoading } from "../../../../../shared/presentation/pages/loading.page";
import {
  selectGetVisitorAppointment,
  getVisitorAppointment,
} from "../../../make-appointment-request/presentation/slices/get-visitor-appoinments.slices";
export const ClientDashboardPage: React.FC = (): JSX.Element => {
  const { client } = useGetClientDetails();
  const { getAccessToken, instance } = useInterceptorAxios();
  const facilitiesSlice: any = useAppSelector(selectFacilitiesSlice);
  const getRequestVisitDetails = useAppSelector(selectGetVisitorAppointment);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getFacilities({ ACCESS_TOKEN: getAccessToken(), interceptor: instance })
    );
    dispatch(
      getVisitorAppointment({
        ACCESS_TOKEN: getAccessToken(),
        interceptor: instance,
      })
    );
  }, [dispatch, getAccessToken, instance]);

  if (facilitiesSlice === undefined ) {
    return <BackdropLoading open={true} />;
  }
  if (getRequestVisitDetails === undefined) {
    return <BackdropLoading open={true} />;
  }

  return (
    <AdministrativeClientWrapper>
      <main className="w-full min-h-[100vh] max-h-auto relative mb-24 ">
        <div className="  relative   md:container w-full h-[150px] mx-auto ">
          <div className=" bg-orange-300 rounded-2xl lg:w-[calc(100%-20%)] mx-auto  h-full flex sm:justify-start justify-center ">
            <div className="sm:w-[380px]  h-full md:px-4 py-2 px-2 flex items-center ">
              <div>
                <h1 className="text-gray-900 lg:text-3xl text-2xl leading-tight font-medium mb-2">
                  Hi {client?.name} !
                </h1>
                <p className="sm:break-all">
                  Check How is carried out in your Organization
                </p>
              </div>
            </div>
            <div className="sm:block hidden  w-[70%] relative ">
              <img
                className="sm:block hidden absolute -top-[53%]  lg:left-[25%] lg:w-[500px] lg:h-[300px] w-[300px] h-[300px] "
                src={process.env.REACT_APP_UPLOAD_URL + "greetings.png"}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="mt-3 max-h-auto w-full grid xl:grid-cols-2  grid-cols-1 items-center  gap-10  ">
          <div className="w-full h-full  rounded-xl ">
            <AdministrativeClientCircleGraphComponent />
          </div>
          <div className="w-full h-full  rounded-xl ">
            <AdministrativeClientboxGraphComponent />
          </div>
        </div>

        <div className="relative mt-10  md:container w-[calc(100vh-100px)] h-auto py-5   mx-auto">
          <h5 className="text-gray-900 text-xl font-medium mb-2 capitalize">
            Facilities
          </h5>
          <SliderImageComponent facilities={facilitiesSlice?.data} />
        </div>
        <div className="mt-10 max-h-auto w-full  ">
          <AdministrativeClientShcedulesComponent  listOfRequest={getRequestVisitDetails?.data}/>
        </div>
      </main>
    </AdministrativeClientWrapper>
  );
};
