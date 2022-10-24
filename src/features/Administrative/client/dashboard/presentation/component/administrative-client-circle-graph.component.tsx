import React, { useMemo, useState } from "react";
import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const usersSignupEveryWeek = [
  {
    id: "Mon",
    label: "Mon",
    value: 165,
    color: "hsl(166, 70%, 50%)",
  },
  {
    id: "Tues",
    label: "Tues",
    value: 347,
    color: "hsl(33, 70%, 50%)",
  },
  {
    id: "Wed",
    label: "Wed",
    value: 157,
    color: "hsl(54, 70%, 50%)",
  },
  {
    id: "Thurs",
    label: "Thurs",
    value: 333,
    color: "hsl(165, 70%, 50%)",
  },
  {
    id: "Fri",
    label: "Fri",
    value: 102,
    color: "hsl(227, 70%, 50%)",
  },
  {
    id: "Sat",
    label: "Sat",
    value: 102,
    color: "hsl(240, 60%, 42%)",
  },
  {
    id: "Sun",
    label: "Sun",
    value: 102,
    color: "hsl(234, 44%, 66%)",
  },
];

export const usersMakeRequestEveryWeek = [
  {
    id: "Mon",
    label: "Mon",
    value: 165,
    color: "hsl(166, 70%, 50%)",
  },
  {
    id: "Tues",
    label: "Tues",
    value: 300,
    color: "hsl(33, 70%, 50%)",
  },
  {
    id: "Wed",
    label: "Wed",
    value: 157,
    color: "hsl(54, 70%, 50%)",
  },
  {
    id: "Thurs",
    label: "Thurs",
    value: 233,
    color: "hsl(165, 70%, 50%)",
  },
  {
    id: "Fri",
    label: "Fri",
    value: 40,
    color: "hsl(227, 70%, 50%)",
  },
  {
    id: "Sat",
    label: "Sat",
    value: 150,
    color: "hsl(240, 60%, 42%)",
  },
  {
    id: "Sun",
    label: "Sun",
    value: 89,
    color: "hsl(234, 44%, 66%)",
  },
];

const MyResponsivePie = ({ data }: { data: Array<any> }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor="black"
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["brighter", 2]],
    }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    colors={[
      "#d48d8b",
      "#4666ff",
      "#abe591",
      "#f0d0a0",
      "#b69cd8",
      "#6a73b6",
      "#dab768",
    ]}
   
    // legends={[
    //   {
    //     anchor: "bottom-left",
    //     direction: "column",
    //     justify: false,
    //     translateX: 0,
    //     translateY:105,
    //     itemsSpacing: 0,
    //     itemWidth: 60,
    //     itemHeight: 25,
    //     itemTextColor: "#999",
    //     itemDirection: "left-to-right",
    //     itemOpacity: 1,
    //     symbolSize: 18,
    //     symbolShape: "circle",
    //     effects: [
    //       {
    //         on: "hover",
    //         style: {
    //           itemTextColor: "#000",
    //         },
    //       },
    //     ],
    //   },
    // ]}
  />
);
export const AdministrativeClientCircleGraphComponent: React.FC =
  (): JSX.Element => {
    const [dataRender, setDataRender] = useState<string>("0");
    const data = useMemo(() => {
      if (dataRender === "1") {
        return usersMakeRequestEveryWeek;
      }
      return usersSignupEveryWeek;
    }, [dataRender]);

    return (
      <div className=" w-full md:h-[500px] h-[350px] mt-10 ">
        <div className="flex flex-col  gap-y-3  text-xs ">
          <button
            onClick={() => {
              setDataRender("0");
            }}
            className={`${ dataRender === '0' ? "text-blue-300" : ""} hover:text-blue-300 text-left relative flex flex-row items-center gap-x-1 w-[220px] `}
          >
            <span className="w-[20px]  h-[20px] rounded-full bg-blue-600"></span>
            Users Signup Every Week{" "}
          </button>
          <button
            onClick={() => {
              setDataRender("1");
            }}
            className={`${ dataRender === '1' ? "text-orange-300" : ""} hover:text-orange-300 text-left relative flex flex-row items-center gap-x-1 w-[220px] `}
          >
            <span className="w-[20px]  h-[20px] rounded-full bg-orange-600"></span>
            Users Make Request Every Week{" "}
          </button>
        </div>
        <MyResponsivePie data={data} />
      </div>
    );
  };
