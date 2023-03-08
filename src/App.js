import { useEffect, useRef, useState } from "react";
import "./App.css";
import heat1 from "./drumSamples/Heater-1.mp3";
import heat2 from "./drumSamples/Heater-2.mp3";
import heat3 from "./drumSamples/Heater-3.mp3";
import heat4 from "./drumSamples/Heater-4_1.mp3";
import clap from "./drumSamples/clap.mp3";
import openhh from "./drumSamples/openhh.mp3";
import kickhat from "./drumSamples/Kick_n_Hat.mp3";
import kick from "./drumSamples/kick.mp3";
import closedhh from "./drumSamples/closedhh.mp3";

function App() {
  const drumButtons = {
    Q: {
      idText: "Heater-1",
      audioFile: heat1,
    },
    W: {
      idText: "Heater-2",
      audioFile: heat2,
    },
    E: {
      idText: "Heater-3",
      audioFile: heat3,
    },
    A: {
      idText: "Heater-4",
      audioFile: heat4,
    },
    S: {
      idText: "Clap",
      audioFile: clap,
    },
    D: {
      idText: "Open-HH",
      audioFile: openhh,
    },
    Z: {
      idText: "Kick-n'-Hat",
      audioFile: kickhat,
    },
    X: {
      idText: "Kick",
      audioFile: kick,
    },
    C: {
      idText: "Closed-HH",
      audioFile: closedhh,
    },
  };
  const [currentDrumPad, setCurrentDrumPad] = useState(" ");
  const itemsRef = useRef([]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => playOnkeyDown(e));
  });

  const handleOnClick = (index) => {
    if (itemsRef.current[index] !== null) {
      setCurrentDrumPad(itemsRef?.current[index]?.id);

      itemsRef?.current[index]?.children[0]?.play();
    }
  };

  const playOnkeyDown = (e) => {
    const pressedKey = e?.key?.toUpperCase();
    const drumButton = itemsRef?.current.find(
      (element) => element?.innerText === pressedKey
    );

    if (drumButton) {
      setCurrentDrumPad(drumButton?.id);
      drumButton?.children[0]?.play();
    }
  };

  return (
    <div id="drum-machine">
      <div id="display">{currentDrumPad}</div>
      {Object.keys(drumButtons).map((key, index) => (
        <div
          className="drum-pad"
          key={drumButtons[key].idText}
          id={drumButtons[key].idText}
          onClick={() => handleOnClick(index)}
          ref={(el) => (itemsRef.current[index] = el)}
        >
          {key}
          <audio
            className="clip"
            id={key}
            src={drumButtons[key].audioFile}
          ></audio>
        </div>
      ))}
    </div>
  );
}

export default App;
