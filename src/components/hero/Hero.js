import React from "react";
import "./Hero.css";
import banner_1 from "../../assets/banner_1.svg";
import banner_2 from "../../assets/banner_2.svg";

function Hero() {
  return (
    <div className="hero">
      <section className="hero-section">
          <div className="hero-text">
            <h1>
              Find the perfect drink <span>for any occasion</span>
            </h1>
          </div>
      </section>
    </div>
  );
}

export default Hero;
