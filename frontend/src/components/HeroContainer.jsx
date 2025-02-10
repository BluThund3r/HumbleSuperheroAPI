import React from "react";
import HeroDetails from "./HeroDetails";
import "../styles/HeroContainer.css";

function HeroContainer({ heroes }) {
  return (
    <div className="hero-container">
      {heroes.map((hero, index) => {
        return <HeroDetails key={index} hero={hero}></HeroDetails>;
      })}
    </div>
  );
}

export default HeroContainer;
