import "particles.js";
import {default as particlesConfig} from "./starfield.json";
console.log(particlesConfig);
import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import anime from "animejs";

let paralaxTitles = {
    
}


export function setupHero(scrollControl) {
    //starfield
    particlesJS("starfield", particlesConfig);
    new ScrollMagic.Scene({
        duration: "50%", //571-64, // 

        triggerElement: "#hero-title",
        triggerHook: 'onLeave',
    })  
        .addIndicators()
        .addTo(scrollControl); // assign the scene to the controller
}