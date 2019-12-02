import React, { useEffect, useState } from "react";
import { NaverMap, Polyline } from "react-naver-maps";

const NaverMaps = ({
  datas = [],
  center = { lat: 37.586159, lng: 127.028882 }
}) => {
  const naver = window.naver;
  // [ [A's naverSites], [B's naverSites], [C's naverSites] ]
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    let a = [];
    datas.forEach(data => {
      a.push(
        data.locations.reduce((acc, current) => {
          acc.push(new naver.maps.LatLng(current.y, current.x));
          return acc;
        }, [])
      );
    });
    setPaths(a);
    console.log(a);
  }, [datas]);

  return (
    <div>
      <NaverMap
        mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
        style={{
          width: "100%",
          height: "100vh"
        }}
        center={center}
        defaultZoom={11}
      >
        {paths.map(path => {
          return (
            <Polyline
              path={path}
              strokeColor={"purple"}
              strokeOpacity={0.5}
              strokeWeight={1}
            />
          );
        })}
      </NaverMap>
    </div>
  );
};

export default NaverMaps;
