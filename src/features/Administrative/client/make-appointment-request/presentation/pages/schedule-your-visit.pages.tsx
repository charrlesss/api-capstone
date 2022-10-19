import React, { useEffect } from "react";
import "../../../../../../assets/font-sched.css";
import { ChooseVisitorType } from "../component/choose-visitor-type";
import { useSearchParams } from "react-router-dom";
import { MakeRequest } from "../component/make-request";
import { getVisitorTypes } from "../slices/get-visitor-types.slices";
import { useInterceptorAxios } from "../../../../../../lib/interceptor-axios";
import { AdministrativeClientWrapper } from "../../../../../../layouts/features/Admintrative/client/administrative-client-wrapper-with-sidebar-content";
import { useAppDispatch } from "../../../../../../hooks/dispatch-selector.hooks";

export const ScheduleYourVisitPages: React.FC = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const params = searchParams.getAll("id");

  const { getAccessToken, instance } = useInterceptorAxios();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getVisitorTypes({
        ACCESS_TOKEN: getAccessToken(),
        interceptor: instance,
      })
    );
  }, [dispatch, getAccessToken, instance]);

  return (
    <AdministrativeClientWrapper>
      <div className=" relative w-full">
        {params.length === 0 ? <ChooseVisitorType /> : <MakeRequest />}
      </div>
    </AdministrativeClientWrapper>
  );
};
