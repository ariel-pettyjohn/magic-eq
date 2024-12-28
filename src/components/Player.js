import { useEffect, useState } from "react";

import * as Tone from "tone";

export default function Player({ path, player, onLoad }) {
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const setIsLoaded = () => setIsPlayerLoaded(true);

  const togglePlayback = () => {
    if (!player || !isPlayerLoaded) return;
    isPlaying ? player.stop() : player.start();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const _player = new Tone.Player(path, setIsLoaded).toDestination();
    onLoad(_player);
    return () => _player.dispose();
  }, []);

  return isPlayerLoaded ? (
    <button onClick={togglePlayback}>{isPlaying ? "Pause" : "Play"}</button>
  ) : (
    <span>Loading player...</span>
  );
}
