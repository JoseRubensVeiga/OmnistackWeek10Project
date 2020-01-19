import React, { useState, useEffect } from 'react';
import api from "../../services/api";

import './Form.css';

function Form(props) {

  const [githubUsername, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    }, (error) => {
      console.log(error);
    }, {
      timeout: 30000
    })
  }, []);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      props.setDevs(response.data)
    }

    loadDevs();
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();

    const response = await api.post('/devs', {
      github_username: githubUsername,
      techs,
      latitude,
      longitude
    });

    setGithubUsername('');
    setTechs('');
    setLatitude('');
    setLongitude('');

    props.setDevs([...props.devs, response.data])
  }
  
  return (
    <div className="main-card">
      <h1 className="main-title text-center line-bottom">Cadastrar</h1>
      <form>
        <div className="form-group">
          <label htmlFor="github_username">User do Github</label>
          <input
            className="form-control"
            name="github_username"
            id="github_username"
            required
            value={githubUsername}
            onChange={e => setGithubUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="techs">Tecnologias</label>
          <input
            className="form-control"
            name="techs"
            id="techs"
            required
            value={techs}
            onChange={e => setTechs(e.target.value)}
          />
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor="latitude">Longitude</label>
            <input
              className="form-control"
              name="latitude"
              id="latitude"
              required
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="longitude">Latitude</label>
            <input
              className="form-control"
              name="longitude"
              id="longitude" 
              required
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn-salvar" onClick={handleAddDev}>Salvar</button>
      </form>
    </div>
  )
}

export default Form;