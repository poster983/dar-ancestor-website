import "particles.js";
import {default as particlesConfig} from "./starfield.json";
import ScrollMagic from 'scrollmagic';
//import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import anime from "animejs";
import {default as config} from "../../ancestor-config.json";
import * as common from "./common";


let masthead = document.getElementById("masthead");
let mastheadLinks = document.getElementsByClassName("masthead-links");


let paralaxTitles = {
    targets: '#hero-title',
    translateY: ["-20vh","15vh"],
    round: 10,
    easing: 'linear',
    direction: 'normal'
}
let paralaxStarfield = {
    targets: '#starfield',
    //scale: "1.2",
    translateY: "-6vh",
    round: 10,
    easing: 'linear',
    direction: 'normal'
}
let mastheadColorObj = common.parseRGBHEX(config.primaryColor);


let mastheadColor = { //
    targets: mastheadColorObj,
    alpha: ["0", "1"],
    easing: 'linear',
    direction: 'normal',
    round: 100,
    update: function() {
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
    round: 10,
    direction: 'normal',
    update: function() {
        //console.log(mastheadTextColorBase.toRGBA());
        masthead.style.setProperty("--mdc-theme-on-primary", mastheadTextColorBase.toRGBA());
        for (const element of mastheadLinks) {
            //console.log(element);
            element.style.setProperty("--mdc-theme-primary", mastheadTextColorBase.toRGBA());
            //console.log(element);
        }
    }
}
var heroTimeline = anime.timeline({
    autoplay: false,
});

var colorTimeline = anime.timeline({
    autoplay: false,
});

heroTimeline.add(paralaxTitles).add(paralaxStarfield,0);
colorTimeline.add(mastheadColor).add(mastheadTextColor,0)

// setup the hero titles
let heroTitle = document.getElementById("hero-title");
heroTitle.innerHTML = config.title;

let heroSub = document.getElementById("hero-sub");
heroSub.innerHTML = (config.subtitle)?config.subtitle:"";

let scene;
export function setupHero(scrollControl) {
    //starfield
    particlesJS("starfield", particlesConfig);
    scene = new ScrollMagic.Scene({
        duration: "100%", //571-64, // 
        triggerElement: "#hero-trigger",
        triggerHook: 'onCenter',
    })  
        //.addIndicators()
        .on("progress", function (event) {
            heroTimeline.seek(heroTimeline.duration * event.progress);
            colorTimeline.seek(colorTimeline.duration * event.progress);
        })
        .addTo(scrollControl); // assign the scene to the controller

    /*if (process.env.NODE_ENV == "development") { //if development add indecators
        scene.addIndicators()
    }*/
}

/**
 * Updates masthead colors when loaded
 */
export function onLoad() {
    console.log(heroTimeline.duration, colorTimeline.duration, window.scrollY)

    if(window.scrollY >= window.innerHeight) { //not at top.
        colorTimeline.play();
        heroTimeline.seek(heroTimeline.duration);
        //colorTimeline.seek(colorTimeline.duration);
    }


}

/**
 * Resets animations to 0
 */
export function reduceMotion() {
    heroTimeline.seek(1);
    console.log(colorTimeline.duration)

    colorTimeline.play();
    //set masthead to correct colors
    
}