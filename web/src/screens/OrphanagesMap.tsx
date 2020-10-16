import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import api from '../services/api';

import 'leaflet/dist/leaflet.css';

import mapMarketImg from '../images/local.svg';

import '../styles/pages/orphanages-map.css';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarketImg,
  iconAnchor: [29, 68],
  iconSize: [58, 68],

  popupAnchor: [170, 2]
});

interface Orphanages {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanages[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarketImg} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
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
        
        {orphanages.map(orphanage => (
          <Marker 
          key={orphanage.id}
          icon={mapIcon}
          position={[ orphanage.latitude, orphanage.longitude]}
        >
          <Popup
            closeButton={false}
            minWidth={240}
            maxWidth={240}
            className="map-popup"
          >
            {orphanage.name}
            <Link to={`/orphanage/${orphanage.id}`}>
              <FiArrowRight size={20} color="#fff" />
            </Link>
          </Popup>
        </Marker>
        ))}
      </Map>

      <Link to="/orphanage/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  )
}

export default OrphanagesMap;