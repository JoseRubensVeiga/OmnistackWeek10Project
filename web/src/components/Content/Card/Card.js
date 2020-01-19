import React, { useState } from 'react';

import api from '../../../services/api';

import './Card.css';

function Card(props) {

  const { techs, name, github_username, bio, avatar_url } = props.dev;

  const { handleRemoveDev } = props;

  const [showContainer, setShowContainer] = useState(false);

  const removeDev = async function () {
    handleOptions();

    if(window.confirm(`Você tem certeza que quer remover o desenvolvedor: ${github_username}?`)) {
      await api.delete(`/devs/${github_username}`);

      handleRemoveDev(github_username);
    }
  }

  const editDev = async function () {
    handleOptions();
    console.log('editar o usuario');
  }

  const handleOptions = function() {
   setShowContainer(!showContainer);
  }    
  
  return (
    <div className="main-card mb-4">
      <div className="header">
        <img src={avatar_url}  className="img-user"/>
        <div className="info-user">
          <p className="user-name">{name}</p>
          <p className="user-techs">{techs.join(", ")}.</p>
        </div>
        <div className="opt-container" onClick={handleOptions}>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <div hidden={!showContainer}>
          <div className="popup-container" >
            <div className="close-icon" onClick={handleOptions}>&times;</div>
            <ul className="list-group">
              <li className="list-item" onClick={editDev}>Editar</li>
              <li className="list-item" onClick={removeDev}>Excluir</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="user-details-container">
        <p className="bio">{bio}</p>
      </div>
      <div className="user-details-container">
        <a
          href={`https://github.com/` + github_username}
          className="github-url"
          target="_blank">
          Acessar o perfil no Github
        </a>
      </div>
    </div>
  )
}

export default Card;