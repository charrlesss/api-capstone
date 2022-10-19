import React from "react";
import { useSearchParams } from "react-router-dom";
import { selectGetVisitorTypes } from "../slices/get-visitor-types.slices";
import { BackdropLoading } from "../../../../../shared/presentation/pages/loading.page";
import { useAppSelector } from "../../../../../../hooks/dispatch-selector.hooks";

export const MakeRequest = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.getAll("id");
  const visitorTypes: any = useAppSelector(selectGetVisitorTypes);

  if (visitorTypes === undefined) {
    return <BackdropLoading open={true} />;
  }

  return (
    <div className="w-full h-[500px] relative border">
      <h1 className="font-['Bebas_Neue'] text-2xl">
        {visitorTypes?.data?.data[params[0]]?.typeofVisitory}
      </h1>
    </div>
  );
};
