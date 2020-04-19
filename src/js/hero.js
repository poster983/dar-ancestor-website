import "particles.js";
import {default as particlesConfig} from "./starfield.json";
console.log(particlesConfig);
import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import anime from "animejs";


let masthead = document.getElementById("masthead");


let paralaxTitles = {
    targets: '#hero-title',
    translateY: ["-20vh","15vh"],
    
    easing: 'linear',
    direction: 'normal'
}
let paralaxStarfield = {
    targets: '#starfield',
    scale: "1.2",
    translateY: "-6vh",
    
    easing: 'linear',
    direction: 'normal'
}

var heroTimeline = anime.timeline({
    autoplay: false,
    begin: function(anim) {
        console.log('began : ' + anim.began);
      },
    complete: function(anim) {
        console.log('completed : ' + anim.completed);
    }
});

heroTimeline.add(paralaxTitles).add(paralaxStarfield,0);



export function setupHero(scrollControl) {
    //starfield
    particlesJS("starfield", particlesConfig);
    new ScrollMagic.Scene({
        duration: "100%", //571-64, // 
        triggerElement: "#hero-trigger",
        triggerHook: 'onCenter',
    })  
        //.addIndicators()
        .on("progress", function (event) {
            heroTimeline.seek(heroTimeline.duration * event.progress);

        })
        .addTo(scrollControl); // assign the scene to the controller
}