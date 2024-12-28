import { useState } from "react";

import Player from "./Player";

import AudioAnalyzer from "./AudioAnalyzer";

const path = "/example.mp3";

function App() {
  const [player, setPlayer] = useState(null);

  const handleSetPlayer = (value) => setPlayer(value);

  return (
    <div className="App">
      <Player path={path} player={player} onLoad={handleSetPlayer} />

      <AudioAnalyzer player={player} path={path} />
    </div>
  );
}

export default App;
