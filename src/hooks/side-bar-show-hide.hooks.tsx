import { useState, useCallback, useContext } from "react";
import Cookie from "js-cookie";
import {ShowSidebar} from '../features/shared/presentation/components/context.component'
interface useSideBarShowHideHooksTypes {
  isShow: boolean;
  callback: () => void;
  globalSidebarIsShow:boolean
}


export const useSideBarShowHideHooks = (): useSideBarShowHideHooksTypes => {
  const [isShow, setIsShow] = useState(Cookie.get("sidebar") ? true : false);
  const globalSidebarIsShow = useContext(ShowSidebar)
  const callback = useCallback(() => {
    setIsShow((isSHowSideBar): boolean => {
      if (isSHowSideBar) {
        Cookie.set("sidebar", "");
        return !isSHowSideBar;
      }
      Cookie.set("sidebar", "open");
      return !isSHowSideBar;
    });
  }, []);

  

  return {
    callback,
    isShow,
    globalSidebarIsShow
  };
};
