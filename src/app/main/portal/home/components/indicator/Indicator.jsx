import React from "react";
import WeatherWidget from "./WeatherWidget";
import MiniCard from "./MiniCard";
import Note from "./Note";
import HorizantalCard from "./HorizantalCard";
import { FuseUtils } from "@fuse";

function Indicator() {
  const GraAccess = FuseUtils.hasPermission({
    slug: "dashboard_gra",
    permission: "can_view",
  });
  const maintainAccess = FuseUtils.hasPermission({
    slug: "dashboard_maintenance",
    permission: "can_view",
  });
  return (
    <div className="w-2/5 grid grid-cols-1 gap-8 md:gap-12">
      <div className="grid grid-cols-3 md:gap-12 gap-4 justify-center">
        {GraAccess ? (
          <>
            <MiniCard color="#3B82F6" title="Arrival" number="16" />
            <MiniCard color="#F59E0B" title="Departue" number="4" />
            <MiniCard color="#D1D5DB" title="Stayovers" number="54" />
          </>
        ) : (
          maintainAccess && (
            <>
              <MiniCard color="#3B82F6" title="occupancy" number="68%" />
              <MiniCard color=" #ef4444" title="Open tickets" number="4" />
              <MiniCard color="#D1D5DB" title="Stayovers" number="54" />
            </>
          )
        )}
        {/* <MiniCard color="#3B82F6" title="Arrival" number="16" />
        <MiniCard color="#F59E0B" title="Departue" number="4" />
        <MiniCard color="#D1D5DB" title="Stayovers" number="54" /> */}
      </div>
      <HorizantalCard />
      <WeatherWidget />

      <Note />
    </div>
  );
}

export default Indicator;
