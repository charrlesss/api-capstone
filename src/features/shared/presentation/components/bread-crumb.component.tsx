import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSideBarShowHideHooks } from "../../../../hooks/side-bar-show-hide.hooks";
interface PageTitleAndBreadCrumbsProps {
  title: string | undefined;
  className?: string;
  pageTitles?: Array<{
    name?: string;
    url?: string;
  }>;
}

export const BreadCrumbComponent: React.FC<PageTitleAndBreadCrumbsProps> = (
  props
): JSX.Element => {
  const location = useLocation();
  const { globalSidebarIsShow } = useSideBarShowHideHooks();
  console.log(globalSidebarIsShow);
  return (
    <div className="w-full h-auto relative  ">
      <div
        className={`${
          globalSidebarIsShow ? "w-[calc(100%-25%)]" : "w-[calc(100%-9.5%)]"
        } bg-secondary text-white ${props.className}   fixed top-[50px]   `}
      >
        <div className=" container mx-auto  flex flex-col items-center justify-between py-6 space-y-4 lg:flex-row bg-secondary lg:space-y-0 ">
          <h1 className="text-black font-['Bebas_Neue'] tracking-[3px] text-2xl leading-6 text-center pt-8">
            {props.title}
          </h1>
          {props.pageTitles ? (
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="flex md:flex-nowrap flex-wrap">
                  {props.pageTitles.map((title, i) => (
                    <div className="flex items-center " key={i}>
                      {i !== 0 && (
                        <svg
                          className="w-6 h-6 text-black"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                      <Link
                        to={title.url ? title.url : ""}
                        className={`${
                          title.url === location.pathname
                            ? "text-green-400"
                            : "text-gray-400"
                        }  ml-1 text-xs lg:text-sm font-medium md:ml-2 whitespace-nowrap overflow-hidden lg:max-w-full max-w-[80px] text-ellipsis`}
                      >
                        {title.name}
                      </Link>
                    </div>
                  ))}
                </li>
              </ol>
            </nav>
          ) : null}
        </div>
      </div>
    </div>
  );
};
