import { useEffect, useState } from "react";

import * as Tone from "tone";

export function useFrequencyBands({ fft }) {
  const [frequencyBands, setFrequencyBands] = useState([]);

  function getFrequencyBands() {
    if (!fft) return [];
    const numBands = 16;
    const sampleRate = Tone.getContext().sampleRate;
    const nyquist = sampleRate / 2;

    const frequencyBands = [];

    const values = fft.getValue();

    for (let band = 0; band < numBands; band++) {
      const bandStart = Math.floor((band / numBands) * values.length);
      const bandEnd = Math.floor(((band + 1) / numBands) * values.length);

      let highestAmplitude = -Infinity;
      let highestFreqIndex = -1;

      for (let i = bandStart; i < bandEnd; i++) {
        if (values[i] > highestAmplitude) {
          highestAmplitude = values[i];
          highestFreqIndex = i;
        }
      }

      const frequency = (highestFreqIndex / values.length) * nyquist;

      frequencyBands.push({
        band: band + 1,
        frequency: frequency,
        amplitude: highestAmplitude,
      });
    }

    setFrequencyBands(frequencyBands);
  }

  function updateFrequencyBands() {
    getFrequencyBands();
    requestAnimationFrame(updateFrequencyBands);
  }

  useEffect(() => {
    Tone.loaded().then(updateFrequencyBands);
  }, [fft]);

  return frequencyBands;
}
