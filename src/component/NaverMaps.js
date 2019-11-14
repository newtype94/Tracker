import React, { useEffect, useState } from "react";
import { NaverMap, Polyline } from "react-naver-maps";

const NaverMaps = ({ locates = [] }) => {
  const naver = window.naver;
  const [paths, setPaths] = useState([]); // new naver.maps.LatLng(37.365620929135716, 127.1036195755005)

  useEffect(() => {
    setPaths(
      locates.reduce((acc, current) => {
        acc.push(new naver.maps.LatLng(current.lat, current.lng));
        return acc;
      }, [])
    );
    console.log(paths);
  }, [locates]);

  return (
    <NaverMap
      mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
      style={{
        width: "100%",
        height: "700px"
      }}
      defaultCenter={{ lat: 37.586159, lng: 127.028882 }}
      defaultZoom={10}
    >
      <Polyline
        path={paths}
        strokeColor={"red"}
        strokeOpacity={0.5}
        strokeWeight={5}
      />
    </NaverMap>
  );
};

export default NaverMaps;
