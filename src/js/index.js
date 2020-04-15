import "@material/mwc-top-app-bar";
import "./elements/ancestor-state-bar";
import "./elements/ancestor-section"
import "../styles/index.css";
import {default as config} from "../../ancestor-config.json";
import {build} from "./build";
import ScrollMagic from 'scrollmagic';
console.log(config)

//let ScrollMagic = require("scrollmagic");
let scroll = new ScrollMagic.Controller();

build(document.getElementById("sections"), scroll);

let section1 = document.getElementById("section1");

section1.names = ["joseph", "hassell", "hello there", "jsdafkl;jklfds", "jdskfahkhfsjakldf", "djksafhjkdsfhlfhdsl", "dsfhjkahflhfsdfkj"];
//section1.scrollController = scroll;

document.getElementById("section2").names = ["jsdafkl;jklfds", "jdskfahkhfsjakldf", "djksafhjkdsfhlfhdsl", "dsfhjkahflhfsdfkj"];


new ScrollMagic.Scene({
	duration: 300, // the scene should last for a scroll distance of 100px
    offset: "-50%", // start this scene after scrolling for 50px
	triggerElement: '#hold',
	triggerHook: 'onLeave',
})
	.setPin('#hold') // pins the element for the the scene's duration
	.addTo(scroll); // assign the scene to the controller





new ScrollMagic.Scene({
	duration: "20%", // the scene should last for a scroll distance of 100px
	//offset: "-50%", // start this scene after scrolling for 50px
	triggerElement: '.sticky-container',
	triggerHook: 'onLeave',
})
	.setPin('.sticky-container', {pushFollowers: false}) // pins the element for the the scene's duration
	.addTo(scroll); // assign the scene to the controller

new ScrollMagic.Scene({
	duration: "20%", // the scene should last for a scroll distance of 100px
	//offset: "-50%", // start this scene after scrolling for 50px
	triggerElement: '#bar',
	triggerHook: 'onLeave',
})
	.setPin('#bar', {pushFollowers: false}) // pins the element for the the scene's duration
	.addTo(scroll); // assign the scene to the controller
	