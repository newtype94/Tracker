import React from "react";
import { RenderAfterNavermapsLoaded, NaverMap } from "react-naver-maps";

const Maps = () => {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={"i3enee60g7"}
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMap
        mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
        style={{
          width: "100%",
          height: "700px"
        }}
        defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
        defaultZoom={10}
      />
    </RenderAfterNavermapsLoaded>
  );
};

export default Maps;
