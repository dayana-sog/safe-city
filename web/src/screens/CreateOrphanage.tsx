import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import L, { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import mapMarkerImg from '../images/local.svg';

import SideBar from '../components/SideBar';

import '../styles/pages/create-orphanage.css';
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
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
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
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('orphanages', data);

    alert('Cadastro realizado com sucesso');

    history.push('/app');
  }, [
    about, 
    name, 
    instructions, 
    opening_hours, 
    position, 
    open_on_weekends,
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
    <div id="page-create-orphanage">
      <SideBar />

      <main>
        <form 
          onSubmit={handleSubmit}
          className="create-orphanage-form"
        >
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[38.7074727,-9.1382657]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={e => handleMapClick(e)}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              { position.latitude !== 0 && ( 
                <Marker 
                  interactive={false} 
                  icon={happyMapIcon} 
                  position={[position.latitude, position.longitude]} 
                />) }

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300} 
                value={about} 
                onChange={e => setAbout(e.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

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
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={instructions} 
                onChange={e => setInstructions(e.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento </label>
              <input 
                id="opening_hours" 
                value={opening_hours} 
                onChange={e => setOpeningHours(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button 
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
