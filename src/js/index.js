import "@material/mwc-top-app-bar-fixed";
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
import {setupHero, onLoad as onHeroLoad} from "./hero";
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



//update nav colors
let masthead = document.getElementById("masthead");
masthead.style.setProperty("--mdc-theme-primary", "rgba(0,0,0,0)");
masthead.style.setProperty("--mdc-theme-on-primary", "rgba(255,255,255,1)");


//open nav 
let drawerButton = document.getElementById("open-drawer");
let drawer = document.getElementById("main");
drawerButton.addEventListener("click", () => {
	drawer.setAttribute("open", true);
	
}, {passive: true})


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






customElements.whenDefined("mwc-drawer").then(() => {
	setupHero(scroll);
});


//call on load
window.addEventListener('load', function () {
	onHeroLoad();
	doneLoading();
})