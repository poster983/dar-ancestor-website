import "@material/mwc-top-app-bar";
import "@material/mwc-icon-button";
import "@material/mwc-button";
import "@material/mwc-drawer";

import "./elements/ancestor-state-bar";
import "./elements/ancestor-section";
import "./elements/ancestor-bottom-bar";

import "../styles/index.css";
import "../styles/pre-loader.css"
import {default as config} from "../../ancestor-config.json";
import {build} from "./build";
import {setupHero} from "./hero";
import {buildMasthead} from "./masthead";
import ScrollMagic from 'scrollmagic';

import * as common from "./common";

//setup masthead 

buildMasthead();

//let ScrollMagic = require("scrollmagic");
let scroll = new ScrollMagic.Controller();
//setup hero animations


//update last updated
let bottomBar = document.getElementById("bottom-bar");
bottomBar.lastUpdated = config.lastUpdated;

// hide back button on nav 
/*let backButton = document.getElementById("back-button");
if(window.history.length<=1 && (config.home == null || config.home == "")) {
	backButton.style.display = "none";
	
}*/

//update nav colors
let masthead = document.getElementById("masthead");
masthead.style.setProperty("--mdc-theme-primary", "rgba(0,0,0,0)");
masthead.style.setProperty("--mdc-theme-on-primary", "rgba(255,255,255,1)");

//set masthead's scroll target


/*
masthead.style.setProperty("--mdc-theme-primary", config.primaryColor);
masthead.style.setProperty("--mdc-theme-on-primary", common.getTextColor(common.parseRGBHEX(config.primaryColor)));*/

bottomBar.style.setProperty("--ancestor-bottom-bar-background-color", config.primaryColor);

//build document
build(document.getElementById("sections"), scroll);

//Load Animation done
function doneLoading() {
	let body = document.body;
	let main = document.getElementById("main");
	let preLoader = document.getElementById("pre-loader");

	preLoader.classList.add("hide");
	setTimeout(()=> {
		body.classList.remove("loading");
		main.classList.remove("loading");
		preLoader.innerHTML = null;
	}, 500)
	

	//let loader = 
}



//Back button navigation 
/*backButton.addEventListener("click", () => {
	console.log(window.history.length);
	if(window.history.length >1) {
		window.history.back();
	} else {
		window.location.href = config.home;
	}
}, {passive: true})*/


customElements.whenDefined("mwc-drawer").then(() => {
	setupHero(scroll);

	
});


//call on load
window.addEventListener('load', function () {
	const appContent = document.querySelector("[slot=appContent]");
	document.getElementById("masthead").scrollTarget = appContent;
	doneLoading();
})