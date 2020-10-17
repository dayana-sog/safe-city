import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Map, Marker, TileLayer } from "react-leaflet";
import L from 'leaflet';
import { useParams } from 'react-router-dom';

import api from "../services/api";

import SideBar from '../components/SideBar';

import mapMarkerImg from '../images/local.svg';

import 'mailgo';

import '../styles/pages/safe-city-point.css';
import { FiClock, FiInfo } from "react-icons/fi";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

interface Point {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  phone: string;
  when_hours: string;
  reported_crime: boolean;
  images: Array<{
    id: number
    url: string;
  }>
}

interface PointParams {
  id: string;
}

export default function SafeCityPoint() {
  const params = useParams<PointParams>();
  const [cityPoint, setCityPoint] = useState<Point>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`cities/${params.id}`).then(response => {
      setCityPoint(response.data);
    })
  }, [params.id]);

  if(!cityPoint) {
    return <p>Carregando...</p>
  }

  return (
    <div id="page-point">
      <SideBar />

      <main>
        <div className="point-details">
          <img src={cityPoint.images[activeImageIndex].url} alt={cityPoint.name} />

          <div className="images">
            {cityPoint.images.map((img, index )=> (
              <button 
                className={activeImageIndex === index ? 'active' : ''} 
                type="button" 
                key={img.id}
                onClick={() => {
                  setActiveImageIndex(index);
                }}
              >
                <img src={img.url} alt={cityPoint.name} />
              </button>
            ))}
          </div>
          
          <div className="point-details-content">
            <h1>{cityPoint.name}</h1>
            <p>
              {cityPoint.about}
            </p>

            <div className="map-container">
              <Map 
                center={[cityPoint.latitude, cityPoint.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker 
                  interactive={false} 
                  icon={happyMapIcon} 
                  position={[cityPoint.latitude, cityPoint.longitude]} 
                />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`http://www.google.com/maps/dir/?api=1&destination=${cityPoint.latitude},${cityPoint.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Horário do ocorrido <br />
                {cityPoint.when_hours}
              </div>
              {cityPoint.reported_crime ? (
                <div className="reported_crime">
                  <FiInfo size={32} />
                  Sim, <br />
                  Reportado a polícia.
                </div>
              ) : (
                <div className="reported_crime dont-reported">
                  <FiInfo size={32} />
                  Não <br />
                  Reportado a polícia.
                </div>
              ) }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato

              <a href="tel:000000000000"></a>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}