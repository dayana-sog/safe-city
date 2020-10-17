import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import L, { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import { toast } from 'react-toastify';

import mapMarkerImg from '../images/local.svg';

import SideBar from '../components/SideBar';

import '../styles/pages/create-safe-city-point.css';
import api from "../services/api";


const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [phone, setPhone] = useState('');
  const [when_hours, setWhen_hours] = useState('');
  const [reported_crime, setReportedCrime] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleMapClick = useCallback((e: LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }, []);

  const handleSubmit = useCallback(async(e: FormEvent) => {
    e.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('phone', phone);
    data.append('reported_crime', String(reported_crime));
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));

    data.append('when_hours', when_hours);

    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('cities', data);

    toast.info('Cadastro realizado com sucesso', {
      className: 'toast-ok',
    });

    history.push('/app');

  }, [
    about, 
    name, 
    phone,
    reported_crime,
    when_hours, 
    position,
    images,
    history
  ]);

  const handleSelectImages = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }, []);

  return (
    <div id="page-create-safe-city">
      <SideBar />

      <main>
        <form 
          onSubmit={handleSubmit}
          className="create-safe-city-form"
        >
          <fieldset>
            <legend>Dados do ocorrido</legend>

            <Map 
              center={[38.7074727,-9.1382657]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={e => handleMapClick(e)}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              { position.latitude !== 0 && ( 
                <Marker 
                  interactive={false} 
                  icon={happyMapIcon} 
                  position={[position.latitude, position.longitude]} 
                />) }

            </Map>

            <div className="input-block">
              <label htmlFor="name">Seu nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">O que aconteceu ?<span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300} 
                value={about} 
                onChange={e => setAbout(e.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos do local</label>

              <div className="images-container">
                {previewImages.map(imgs => {
                  return (
                    <img  key={imgs} src={imgs} alt={name}/>
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input 
                multiple 
                type="file" 
                id="image[]"
                onChange={handleSelectImages}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário do ocorrido:</label>
              <input 
                id="opening_hours" 
                value={when_hours} 
                onChange={e => setWhen_hours(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="phone">Informe seu contato:</label>
              <input 
                id="opening_hours" 
                value={phone} 
                placeholder="(351) 999-999-999" 
                className="masked" 
                pattern="/(\(?\d{3}\)?\s)?(\d{3,5}\-\d{3,5}\-\d{3,5})/g" 
                data-valid-example="(351) 999-999-999"
                onChange={e => setPhone(e.target.value)
                }/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Foi reportado a polícia:</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={reported_crime ? 'active' : ''}
                  onClick={() => setReportedCrime(true)}
                >
                  Sim
                </button>
                <button 
                  type="button"
                  className={!reported_crime ? 'active' : ''}
                  onClick={() => setReportedCrime(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar informações
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
