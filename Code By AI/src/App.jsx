import React, { useState } from 'react';
import Scene from './components/Scene';
import InfoPanel from './components/InfoPanel';

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Scene onSelect={setSelectedPlanet} />
      <InfoPanel planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
    </div>
  );
}

export default App;
