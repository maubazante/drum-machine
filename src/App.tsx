import "./App.css";
import { Drum } from "./Drum";
import { audioClips } from "./dataSource";
import { AudioClip } from "./types";
import { useState, useEffect } from "react";

function App() {
  const [audioClipsData, setAudioClips] = useState<AudioClip[]>(audioClips);
  const [displayText, setDisplayText] = useState<string>("");

  const playAudio = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const clip = audioClips.find(
      (clip) => clip.keyTrigger === e.key.toUpperCase()
    );
    
    if (!clip) return; // OTHERWISE UNDEFINED ERROR
    const audio = document.getElementById(clip?.keyTrigger) as HTMLAudioElement;
    audio.play();
    
    const key = document.getElementById(`drum-${clip.keyTrigger}`);
    key?.focus();
    setDisplayText(clip.description);
  };

  useEffect(() => {
    setAudioClips(audioClipsData);
  }, [audioClipsData]);

  return (
    <div
      className="container"
      id="drum-machine"
      onKeyDown={playAudio}
      tabIndex={0}
    >
      <h1>Simple Drum Machine</h1>
      <div className="drum-board">
        {audioClipsData.map((clip) => (
          <Drum audioClip={clip} key={clip.keyTrigger} />
        ))}
      </div>
      <div id="display">{displayText}</div>
    </div>
  );
}

export default App;
