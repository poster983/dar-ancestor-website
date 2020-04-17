import "@material/mwc-top-app-bar";
import "./elements/ancestor-state-bar";
import "./elements/ancestor-section";
import "./elements/ancestor-bottom-bar";
import "../styles/index.css";
import "../styles/pre-loader.css"
import {default as config} from "../../ancestor-config.json";
import {build} from "./build";
import ScrollMagic from 'scrollmagic';
console.log(config)

//let ScrollMagic = require("scrollmagic");
let scroll = new ScrollMagic.Controller();

 

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