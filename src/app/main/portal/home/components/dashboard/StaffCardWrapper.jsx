import React from "react";
import StaffCard from "./StaffCard";

function StaffCardWrapper({ data }) {
  return (
    <div className=" flex items-stretch  h-full  grid sm:grid-cols-2   md:grid-cols-2 lg:grid-cols-2  xl:grid-cols-2 2xl:grid-cols-3 gap-16 justify-center md:w-full ">
      {data?.map((e) => (
        <StaffCard data={e} />
      ))}
    </div>
  );
}

export default StaffCardWrapper;
