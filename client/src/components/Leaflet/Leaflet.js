import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "./Leaflet.css";

const Leaflet = () => {
  const position = [20.250041990505274, 85.80019968614499];

  return (
    <>
      <div className="map-c">
        <div className="map d-flex">
          <MapContainer
            style={{
              width: "60rem",
              height: "30rem",
              display: "inline-block",
              margin: "auto",
              borderRadius: "10px",
            }}
            center={position}
            zoom={13}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
            <Marker position={position}></Marker>
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default Leaflet;
