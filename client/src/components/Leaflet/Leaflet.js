import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "./Leaflet.css";
import L from 'leaflet';

const Leaflet = (props) => {
  const position = [20.250041990505274, 85.80019968614499];

  let locationIcon = L.icon({
    iconUrl: "https://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-Free-Download-PNG.png",
    iconSize: [25, 25],
    iconAnchor: [15, 15],
    
});

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
            <>{
            props.marks.map((mark, index) => {
              console.log(typeof mark);
              return ( <Marker position={[mark[0], mark[1]]} icon={locationIcon}></Marker> );
            })}
            </>

            <Marker position={position}></Marker>
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default Leaflet;
