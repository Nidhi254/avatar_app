import React, { useState } from 'react';
import '../Styles/Avatar.css';
import Axios from 'axios';

const Avatar = () => {
  const [sprite, setSprite] = useState("micah");
  const [seed, setSeed] = useState(100000);

  // 🎨 Static styling configuration (future dynamic-ready)
  const styleURLParams = "backgroundColor=ffe0e0&backgroundType=gradientLinear&radius=50&scale=100&flip=true";

  const handleSprite = (spritetype) => {
    setSprite(spritetype);
  };

  const handleGenerate = () => {
    const randomSeed = Math.floor(Math.random() * 1000000);
    setSeed(randomSeed);
  };

  const downloadImage = () => {
    const url = `https://api.dicebear.com/7.x/${sprite}/svg?seed=${seed}&${styleURLParams}`;
    Axios({
      method: "get",
      url,
      responseType: "arraybuffer"
    })
      .then((response) => {
        const blob = new Blob([response.data], { type: "image/svg+xml" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${sprite}-${seed}.svg`;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(link.href);
          document.body.removeChild(link);
        }, 200);
      })
      .catch((error) => {
        console.error("Download failed:", error);
      });
  };

  return (
    <div className="container">
      <nav className="nav">
        <p>🎯 Random Avatar Generator</p>
      </nav>

      <div className="home">
        <div className="btns">
          <button className={sprite === "micah" ? "selected" : ""} onClick={() => handleSprite("micah")}>Cute Avatar</button>
          <button className={sprite === "bottts" ? "selected" : ""} onClick={() => handleSprite("bottts")}>Robot</button>
          <button className={sprite === "avataaars" ? "selected" : ""} onClick={() => handleSprite("avataaars")}>Illustrated Human</button>
          <button className={sprite === "identicon" ? "selected" : ""} onClick={() => handleSprite("identicon")}>Identi Pattern</button>
        </div>

        <div className="avatar">
          <img
            src={`https://api.dicebear.com/7.x/${sprite}/svg?seed=${seed}&${styleURLParams}`}
            alt={`Avatar of type ${sprite} with seed ${seed}`}
          />
        </div>

        <div className="generate">
          <button id="gen" onClick={handleGenerate}>Next</button>
          <button id="down" onClick={downloadImage}>Download</button>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
