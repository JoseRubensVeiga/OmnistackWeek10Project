import React, { useState, useEffect } from 'react';

import Card from './Card/Card';

import './Content.css';

function Content(props) {
  return(
    <div className="content">
      {props.devs.map(dev => 
        <Card key={dev.github_username} dev={dev} handleRemoveDev={props.handleRemoveDev}/>
      )}
    </div>
  );
}

export default Content;