import { useEffect, useState } from "react";

import * as Tone from "tone";

import { ToneAudioBuffer } from "tone";

import { useFrequencyBands } from "./hooks";

const AudioAnalyzer = ({ player, path }) => {
  const [fft, setFft] = useState(null);
  const [isBufferLoaded, setIsBufferLoaded] = useState(false);
  const [buffer, setBuffer] = useState(null);

  useEffect(() => {
    const _fft = new Tone.FFT(2048);
    setFft(_fft);
    player?.connect(_fft);

    const _buffer = new ToneAudioBuffer(path, () => {
      setIsBufferLoaded(true);
    });

    if (isBufferLoaded) setBuffer(_buffer);
  }, [player, path, isBufferLoaded]);

  const frequencyBands = useFrequencyBands({ fft });
  const areFrequencyBandsLoaded = frequencyBands.length > 0;

  return (
    <div>
      <h3>Frequency Band Analysis:</h3>

      {isBufferLoaded ? "Buffer loaded!" : "Buffer loading..."}

      {areFrequencyBandsLoaded ? (
        <ul>
          {frequencyBands.map((band, index) => (
            <li key={index}>
              Band {band.band}: {band.frequency.toFixed(2)} Hz, Amplitude:{" "}
              {band.amplitude.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default AudioAnalyzer;
