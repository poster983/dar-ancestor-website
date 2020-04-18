import "@material/mwc-top-app-bar";
import "@material/mwc-icon-button";
import "./elements/ancestor-state-bar";
import "./elements/ancestor-section";
import "./elements/ancestor-bottom-bar";
import "./elements/ancestor-starfield";
import "../styles/index.css";
import "../styles/pre-loader.css"
import {default as config} from "../../ancestor-config.json";
import {build} from "./build";
import ScrollMagic from 'scrollmagic';
import * as common from "./common";


//let ScrollMagic = require("scrollmagic");
let scroll = new ScrollMagic.Controller();

//update last updated
let bottomBar = document.getElementById("bottom-bar");
bottomBar.lastUpdated = config.lastUpdated;

// hide back button on nav 
let backButton = document.getElementById("back-button");
if(window.history.length<=2) {
	backButton.style.display = "none";
	
}

//update nav colors
let masthead = document.getElementById("masthead");
masthead.style.setProperty("--mdc-theme-primary", config.primaryColor);
masthead.style.setProperty("--mdc-theme-on-primary", common.getTextColor(common.parseRGBHEX(config.primaryColor)));

bottomBar.style.setProperty("--ancestor-bottom-bar-background-color", config.primaryColor)

//build document
build(document.getElementById("sections"), scroll);


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

window.addEventListener('load', function () {
	doneLoading();
  })


  backButton.addEventListener("click", () => {
	console.log(window.history.length);
	if(window.history.length >2) {
		window.history.back();
	}
})
