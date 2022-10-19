import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Navigation } from "react-minimal-side-navigation";
import "../../../../assets/sidebar.css";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { sidebarDataRoutesOpenForAdmin ,sidebarDataRoutesOpenForAdminClose } from "../../../../features/shared/data/sidebar-data-routes";
import { Avatar } from "@mui/material";
import Icon from "awesome-react-icons";
import { BiLogOutCircle } from "react-icons/bi";
import {
  getLogoutClient,
  selectClientLogout,
} from "../../../../features/shared/presentation/slices/logout.slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/dispatch-selector.hooks";
import { useInterceptorAxios } from "../../../../lib/interceptor-axios";
import { FillDetailsComponent } from "../../../../features/shared/presentation/components/fill-details-component";
import { useResize } from "../../../../hooks/resize";
import Cookie from "js-cookie";
import { BackdropLoading } from "../../../../features/shared/presentation/pages/loading.page";
import { selectGetAdminDetails } from "../../../../features/Administrative/admin/presentation/slices/get-admin-datails.slice";

export const AdministrativeAdminSidebar: React.FC<{
  isOpen: boolean;
  callback: () => void;
}> = ({ isOpen, callback }): JSX.Element => {
  const admin = useAppSelector(selectGetAdminDetails);
  const { width } = useResize();
  const [openFillDetails, setOpenFillDetails] = useState<boolean>(false);
  const { getAccessToken, instance } = useInterceptorAxios();
  const logoutClient: any = useAppSelector(selectClientLogout);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      admin?.data?.data &&
      !admin?.data?.data.birthdate &&
      !admin?.data?.data.gender &&
      !admin?.data?.data.address &&
      !admin?.data?.data.contact
    ) {
      return setOpenFillDetails(true);
    }
    return setOpenFillDetails(false);
  }, [admin]);

  // useEffect(() => {
  //   if (logoutClient?.data?.success) {
  //     navigate(logoutClient.data.redirect);
  //   }
  // }, [logoutClient, navigate]);

  if (admin === undefined) {
    return <BackdropLoading open={true} />;
  }

  return (
    <React.Fragment>
      <div
        className={`${
          openFillDetails ? "-z-1" : "z-[100]"
        } bg-primary  min-h-full max-auto md:relative fixed   left-0   transition-all duration-400 ease-out-in bg-white shadow-sm shadow-black ${
          isOpen ? "w-[300px] " : "  md:w-[80px] w-0 md:left-0 -left-full"
        }`}
      >
        <div className="flex items-center px-4  text-center py-4 z-[100] justify-between text-white">
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } w-auto h-auto p-1  items-center justify-center border rounded-2xl bg-white`}
          >
            <span className="text-black flex-1 mx-2 text-lg  font-normal font-['Bebas_Neue'] tracking-[2px] ">
              FRE<span className="text-blue-600">IGHT</span>
            </span>
          </div>
          <button
            onClick={(): void => {
              callback();
            }}
            type="button"
            className="z-[100] md:hidden block"
          >
            <Icon name="burger" className="w-6 h-6 text-white " />
          </button>
        </div>
        <div className={`${isOpen ? "relative" : "hidden"}  w-full mt-10 `}>
          <div className=" w-full flex flex-col justify-center items-center">
            <Avatar
              alt="Remy Sharp"
              src={
                admin?.data?.data?.profile?.split("https")[1]
                  ? admin?.data?.data?.profile
                  : process.env.REACT_APP_UPLOAD_URL +
                    admin?.data?.data?.profile
              }
              sx={{ width: 120, height: 120 }}
            />
          </div>
          <div className="mt-6 font-['Bebas_Neue'] tracking-[1.8px] text-white px-2 text-center">
            {admin?.data?.data?.name}
          </div>
          <div className="container mx-auto  p-2  text-center">
            <Link
              to="/administrative/profile"
              className="p-5 text-white rounded-xl bg-transparent font-['Bebas_Neue']  tracking-[3px] text-[13px]   font-normal py-1 border border-white  shadow"
            >
              Profile
            </Link>
          </div>
        </div>
        <div
          className={`${openFillDetails ? "-z-1" : "z-[90]"} ${
            isOpen ? "" : "close-text"
          } ${
            isOpen ? "mt-16" : ""
          } relative flex flex-col pb-4    font-['Bebas_Neue'] tracking-[2px] px-2 `}
        >
          <Navigation
            activeItemId={location.pathname}
            onSelect={({ itemId }) => {
              if (width <= 767) {
                Cookie.remove("sidebar");
              }
              navigate(itemId);
            }}
            items={
              isOpen
                ? (sidebarDataRoutesOpenForAdmin as any)
                : (sidebarDataRoutesOpenForAdminClose as any)
            }
          />

          <button
            className="flex gap-4  px-5 py-3 items-center rounded-xl hover:bg-[#076FAC]"
            onClick={() => {
              dispatch(
                getLogoutClient({
                  ACCESS_TOKEN: getAccessToken(),
                  interceptor: instance,
                })
              );
            }}
          >
            <BiLogOutCircle className="text-white text-[20px] " />
            <span
              className={`${
                isOpen ? "flex-1" : "hidden"
              } text-white tracking-[2px] text-left`}
            >
              Logout
            </span>
          </button>
        </div>
      </div>

      <FillDetailsComponent
        onClose={() => {
          setOpenFillDetails(false);
        }}
        open={openFillDetails}
      />
    </React.Fragment>
  );
};
