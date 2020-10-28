import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import heart from '../images/heart.svg';

import '../styles/pages/landing.css';

function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <div className="logo">
          <img src={heart} alt="Logo Happy"/> 
          <span>Safe-City</span>
        </div>
        

        <main>
          <h1>Queremos uma cidade segura.</h1>
          <p>Informe lugares que precisam de mais segurança.</p>

          <div className="location">
            <strong>Lisboa</strong>
            <span>Portugal</span>
          </div>

          <Link to="/app" data-testid="enter-map" className="enter-app">
            <FiArrowRight size={26} color="#fff" />
          </Link>
        </main>
      </div>
    </div>
  );
}

export default Landing;