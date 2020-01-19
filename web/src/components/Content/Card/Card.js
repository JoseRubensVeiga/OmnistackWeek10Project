import React from 'react';

import './Card.css';

function Card(props) {

  const { techs, name, github_username, bio, avatar_url } = props.dev;
  
  return (
    <div className="main-card mb-4">
      <div className="header">
        <img src={avatar_url}  className="img-user"/>
        <div>
          <p className="user-name">{name}</p>
          <p className="user-techs">{techs.join(", ")}.</p>
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