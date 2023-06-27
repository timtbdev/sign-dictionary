import React from "react";
import { Balancer } from "react-wrap-balancer";

const Heading = () => {
  return (
    <div className="text-center">
      <h1
        className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-3xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-5xl md:leading-[3.5rem]"
        style={{
          animationDelay: "0.15s",
          animationFillMode: "forwards",
        }}
      >
        <Balancer>Mongolian Sign Language Dictionary</Balancer>
      </h1>
    </div>
  );
};

export default Heading;
