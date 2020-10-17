import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import api from '../services/api';

import 'leaflet/dist/leaflet.css';

import heart from '../images/heart.svg';
import mapMarketImg from '../images/local.svg';

import '../styles/pages/safe-city-map.css';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarketImg,
  iconAnchor: [29, 68],
  iconSize: [58, 68],

  popupAnchor: [170, 2]
});

interface SafeCity {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function SafeCityMap() {
  const [pointsCity, setPointsCity] = useState<SafeCity[]>([]);

  useEffect(() => {
    api.get('cities').then(response => {
      setPointsCity(response.data);
    })
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <div className="logo">
            <img src={heart} alt="Happy"/>
            <span>Safe-City</span>
          </div>

          <h2>Marque no mapa o local do ocorrido</h2>
          <p>Dessa forma podemos evitar que aconteça com outras pessoas </p>
        </header>

        <footer>
          <strong>Lisboa</strong>
          <span>Portugal</span>
        </footer>
      </aside>

      <Map
        center={[ 38.7074727,-9.1382657 ]}
        zoom={15}
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        {/* <TileLayer url="http://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        
        {pointsCity.map(pointCity => (
          <Marker 
          key={pointCity.id}
          icon={mapIcon}
          position={[ pointCity.latitude, pointCity.longitude]}
        >
          <Popup
            closeButton={false}
            minWidth={240}
            maxWidth={240}
            className="map-popup"
          >
            {pointCity.name}
            <Link to={`/cities/${pointCity.id}`}>
              <FiArrowRight size={20} color="#fff" />
            </Link>
          </Popup>
        </Marker>
        ))}
      </Map>

      <Link to="/cities/create" className="create-safe-city-point">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  )
}

export default SafeCityMap;