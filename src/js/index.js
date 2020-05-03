import "@material/mwc-top-app-bar-fixed";
import "@material/mwc-icon-button";
import "@material/mwc-button";
import "@material/mwc-drawer";
import '@material/mwc-list/mwc-list.js';
import '@material/mwc-list/mwc-list-item.js';
import "@material/mwc-icon";
import "@material/mwc-switch";

import "./elements/ancestor-state-bar";
import "./elements/ancestor-section";
import "./elements/ancestor-bottom-bar";

import "../styles/index.css";
import "../styles/pre-loader.css"
import {default as config} from "../../ancestor-config.json";
import {build} from "./build";
import {setupHero, reduceMotion as reduceHeroMotion} from "./hero";
import {buildMasthead} from "./masthead";
import ScrollMagic from 'scrollmagic';

import * as common from "./common";


//add analytics to page
if(config.analyticsScript) {
	let analytics = document.createElement("div");
	analytics.innerHTML = config.analyticsScript;
	document.head.appendChild(analytics);
}



//setup masthead 

buildMasthead();

//let ScrollMagic = require("scrollmagic");
let scroll = new ScrollMagic.Controller();
//setup hero animations


//update last updated
let bottomBar = document.getElementById("bottom-bar");
bottomBar.lastUpdated = config.lastUpdated;
bottomBar.webmasterEmail = config.webmasterEmail;
bottomBar.disclaimer = config.disclaimer;










//open nav 
let drawerButton = document.getElementById("open-drawer");
let drawer = document.getElementById("mwc-drawer");
drawerButton.addEventListener("click", () => {
	drawer.setAttribute("open", true);
	
}, {passive: true})


//reduce motion toggle
let reduceMotionNavBar = document.getElementById("reduce-motion");
let reduceMotionDrawer = document.getElementById("reduce-motion-drawer");

//get setting
let reduceMotionSetting = localStorage.getItem('reduceMotion')

if(reduceMotionSetting == "true") {
	reduceMotionNavBar.checked = true;
	reduceMotionDrawer.checked = true;
}

function handleReduceMotion(event) {
	reduceMotionNavBar.checked = event.target.checked;
	reduceMotionDrawer.checked = event.target.checked;
	if(event.target.checked) {
		localStorage.setItem('reduceMotion', true);
		
		//disable motion
		scroll.destroy(true);
		reduceHeroMotion();

	} else {
		localStorage.setItem('reduceMotion', false);
		//enable motion 
		location.reload();
	}
}
//listen for change 
reduceMotionNavBar.addEventListener("change", handleReduceMotion);
reduceMotionDrawer.addEventListener("change", handleReduceMotion);


bottomBar.style.setProperty("--ancestor-bottom-bar-background-color", config.primaryColor);

//build document
build(document.getElementById("sections"), scroll);

//Load Animation done
function doneLoading() {
	let body = document.body;
	let main = document.getElementById("main");
	let preLoader = document.getElementById("pre-loader");
	let masthead = document.getElementById("masthead");

	preLoader.classList.add("hide");
	setTimeout(()=> {
		body.classList.remove("loading");
		main.classList.remove("loading");
		preLoader.classList.add("hide-edge");
		preLoader.innerHTML = null;
		//make color right
		if(window.scrollY >= window.innerHeight) { // if not at top
			masthead.style.setProperty("--mdc-theme-primary", config.primaryColor);
			masthead.style.setProperty("--mdc-theme-on-primary", common.getTextColor(common.parseRGBHEX(config.primaryColor)));
		} else {
			masthead.style.setProperty("--mdc-theme-primary", "rgba(0,0,0,0)");
			masthead.style.setProperty("--mdc-theme-on-primary", "rgba(255,255,255,1)");
		}
	}, 500)
	

	//let loader = 
}






customElements.whenDefined("mwc-drawer").then(() => {
	setupHero(scroll);

});

customElements.whenDefined("mwc-top-app-bar-fixed").then(() => {
	//onHeroLoad();
	if(reduceMotionSetting == "true") {
		scroll.destroy(true);
		reduceHeroMotion();
	}


	doneLoading();
});



//call on load
/*window.addEventListener('load', function () {
	
})*/