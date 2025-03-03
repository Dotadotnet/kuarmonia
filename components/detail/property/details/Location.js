import React from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const Location = ({ location }) => {
  const position = [location?.lat ||24.084081797317943, location?.lng||89.99015092849733]; 
  console.log(location);
  return (
    <div className="map-container" style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>اینجا موقعیت شماست.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Location;
