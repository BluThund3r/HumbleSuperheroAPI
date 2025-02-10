import React from "react";
import "../styles/HeroDetails.css";

function HeroDetails({ hero }) {
  return (
    <div className="hero-card">
      <div>
        <p className="hero-name" title={hero.name}>
          {hero.name}
        </p>
        <p className="hero-superpower" title={hero.superpower}>
          {hero.superpower}
        </p>
      </div>
      <p className="hero-humility">{hero.humility} / 10</p>
    </div>
  );
}

export default HeroDetails;
