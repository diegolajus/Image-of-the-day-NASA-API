import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particlesOptions from "../particles.json";

const ParticlesBg = () => {

    const particlesInit = useCallback(main => {
        loadFull(main);
    }, [])

  return (
    <div className="App">
        <Particles options={particlesOptions} init={particlesInit}/>
    </div>
  )
}

export default ParticlesBg;
