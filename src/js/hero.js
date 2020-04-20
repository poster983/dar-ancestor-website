import "particles.js";
import {default as particlesConfig} from "./starfield.json";
console.log(particlesConfig);
import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import anime from "animejs";
import {default as config} from "../../ancestor-config.json";
import * as common from "./common";


let masthead = document.getElementById("masthead");


let paralaxTitles = {
    targets: '#hero-title',
    translateY: ["-20vh","15vh"],
    
    easing: 'linear',
    direction: 'normal'
}
let paralaxStarfield = {
    targets: '#starfield',
    //scale: "1.2",
    translateY: "-6vh",
    
    easing: 'linear',
    direction: 'normal'
}
let mastheadColorObj = common.parseRGBHEX(config.primaryColor);

let mastheadColor = { //
    targets: mastheadColorObj,
    alpha: ["0", "1"],
    easing: 'linear',
    direction: 'normal',
    update: function() {
        //console.log(mastheadColorObj.toRGBA());
        masthead.style.setProperty("--mdc-theme-primary", mastheadColorObj.toRGBA());
    }
}

//set masthead text color
let mastheadTextColorBase = new common.Color(255,255,255,1);// base color 
let mastheadTextColorTo = common.parseRGBHEX(common.getTextColor(common.parseRGBHEX(config.primaryColor))); // get text color when primary;

let mastheadTextColor = {
    targets: mastheadTextColorBase,
    red: mastheadTextColorTo.red,
    green: mastheadTextColorTo.green,
    blue: mastheadTextColorTo.blue,
    easing: 'linear',
    direction: 'normal',
    update: function() {
        //console.log(mastheadTextColorBase.toRGBA());
        masthead.style.setProperty("--mdc-theme-on-primary", mastheadTextColorBase.toRGBA());
    }
}
var heroTimeline = anime.timeline({
    autoplay: false,
});

heroTimeline.add(paralaxTitles).add(paralaxStarfield,0).add(mastheadColor,0).add(mastheadTextColor,0);


// setup the hero titles
let heroTitle = document.getElementById("hero-title");
heroTitle.innerHTML = config.title;


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