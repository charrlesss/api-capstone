import React, { useMemo, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
const usersSignupEveryMonths = [
  {
    id: "Users Signup Every Months ",
    color: "blue",
    data: [
      {
        x: "Jan",
        y: 227,
      },
      {
        x: "Feb",
        y: 135,
      },
      {
        x: "March",
        y: 67,
      },
      {
        x: "April",
        y: 210,
      },
      {
        x: "May",
        y: 43,
      },
      {
        x: "June",
        y: 277,
      },
      {
        x: "July",
        y: 34,
      },
      {
        x: "Aug",
        y: 565,
      },
      {
        x: "Sept",
        y: 256,
      },
      {
        x: "Oct",
        y: 12,
      },
      {
        x: "Nov",
        y: 200,
      },
      {
        x: "Dec",
        y: 80,
      },
    ],
  },
 
];


const  usersMakeRequestEveryMonths  = [
  {
    id: "Users Make Request Every Months ",
    color: "orange",
    data: [
      {
        x: "Jan",
        y: 207,
      },
      {
        x: "Feb",
        y: 115,
      },
      {
        x: "March",
        y: 67,
      },
      {
        x: "April",
        y: 210,
      },
      {
        x: "May",
        y: 43,
      },
      {
        x: "June",
        y: 300,
      },
      {
        x: "July",
        y: 34,
      },
      {
        x: "Aug",
        y: 265,
      },
      {
        x: "Sept",
        y: 256,
      },
      {
        x: "Oct",
        y: 12,
      },
      {
        x: "Nov",
        y: 200,
      },
      {
        x: "Dec",
        y: 80,
      },
    ],
  },
]
// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({ data }: { data: Array<any> }) => (
  <ResponsiveLine
    data={data}
      
    margin={{ top: 50, right: 20, bottom: 50, left: 30 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    curve="cardinal"
    axisTop={null}
    axisRight={null}
    axisBottom={
      {
        orient: "bottom",
        tickSize: 10,
        tickPadding: 15,
        tickRotation: 27,
        legendOffset: 46,
        legendPosition: "middle",
      } as any
    }
    axisLeft={
      {
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
      } as any
    }
    colors={(d)=>d.color}
    enablePoints={true}
    pointSize={3}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    enableArea={true}
    areaOpacity={0.25}
    useMesh={true}
    // legends={[
    //   {
    //     anchor: "top-left",
    //     direction: "column",
    //     justify: false,
    //     translateX: 0,
    //     translateY: 0,
    //     itemWidth: 100,
    //     itemHeight: 20,
    //     itemsSpacing: 4,
    //     symbolSize: 20,
    //     symbolShape: "circle",
    //     itemDirection: "left-to-right",
    //     itemTextColor: "#777",
    //     effects: [
    //       {
    //         on: "hover",
    //         style: {
    //           itemBackground: "rgba(0, 0, 0, .03)",
    //           itemOpacity: 1,
    //         },
    //       },
    //     ],
    //   },
    // ]}
  />
);
export const AdministrativeClientboxGraphComponent: React.FC =
  (): JSX.Element => {
const [dataRender ,setDataRender] = useState<string>('0')
const data = useMemo(()=>{
  if(dataRender === '1'){
    return usersMakeRequestEveryMonths

  }
  return usersSignupEveryMonths
},[dataRender])

    return (
      <div className="w-full md:h-[500px] h-[400px]  ">
        <div className="flex flex-col  gap-y-3  text-xs lg:mt-10">
        <button 
            onClick={()=>{
              setDataRender('0')
            }}
            className={`${ dataRender === '0' ? "text-blue-300" : ""} hover:text-blue-300 text-left relative flex flex-row items-center gap-x-1 w-[220px] `}>

            <span className="w-[20px]  h-[20px] rounded-full bg-blue-600"></span>
            Users Signup Every Months{" "}
          </button>
          <button 
          onClick={()=>{
            setDataRender('1')
          }}
          className={`${ dataRender === '1' ? "text-orange-300" : ""} hover:text-orange-300 text-left relative flex flex-row items-center gap-x-1 w-[220px] `}>
            <span className="w-[20px]  h-[20px] rounded-full bg-orange-600"></span>
            Users Make Request Every Months{" "}
          </button>
        </div>
        <MyResponsiveLine data={data} />
      </div>
    );
  };
