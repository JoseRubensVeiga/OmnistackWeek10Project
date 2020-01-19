import React, { useState } from 'react';

import Form from './components/Form/Form';
import Content from './components/Content/Content';

import './App.css';
import './styles.css';

function App() {

  const [devs, setDevs] = useState([]);

  const handleRemoveDev = function() {
    console.log('remover dev');
  }

  return (
    <div id="app">
      <aside>
        <Form devs={devs} setDevs={setDevs}/>
      </aside>

      <main>
        <Content devs={devs} setDevs={setDevs} handleRemoveDev={handleRemoveDev}/>
      </main>
    </div>
  );
}

export default App;
