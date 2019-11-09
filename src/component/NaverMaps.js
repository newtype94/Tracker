import React from "react";
import { NaverMap, Polyline } from "react-naver-maps";

const NaverMaps = () => {
  const naver = window.naver;
  return (
    <NaverMap
      mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
      style={{
        width: "100%",
        height: "700px"
      }}
      defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
      defaultZoom={10}
    >
      <Polyline
        path={[
          new naver.maps.LatLng(37.365620929135716, 127.1036195755005),
          new naver.maps.LatLng(37.365620929135716, 127.11353302001953),
          new naver.maps.LatLng(37.3606921307849, 127.10452079772949),
          new naver.maps.LatLng(37.36821310838941, 127.10814714431763),
          new naver.maps.LatLng(37.360760351656545, 127.11299657821654),
          new naver.maps.LatLng(37.365620929135716, 127.1036195755005)
        ]}
        strokeColor={"red"}
        strokeOpacity={0.5}
        strokeWeight={5}
      />
    </NaverMap>
  );
};

export default NaverMaps;
