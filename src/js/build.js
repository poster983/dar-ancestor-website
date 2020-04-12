import {default as config} from "../../ancestor-config.json"
let ScrollMagic = require("scrollmagic");

export function build(container, scrollControl) {
    for(let x = 0; x < config.states.length; x++) { // loop through states
        let state = config.states[x];
        
        //create sticky header
        let bar = document.createElement("ancestor-state-bar", {
            //state: state.state, // give it the state name
            //style: `--ancestor-state-bar-background-color: ${state.color}`
        });
        bar.state = state.state;
        bar.style.setProperty("--ancestor-state-bar-background-color", state.color);


        // create ancestor section
        let section = document.createElement("ancestor-section");
        section.names = state.ancestors;
        section.background = "./src/img/testbg.jpg";

        console.log(section.clientHeight)
        
        //add bar to scrollcontrol
        /*new ScrollMagic.Scene({
            duration: "200%", 
            triggerElement: bar,
            pushFollowers: false,
            triggerHook: 'onLeave',
        })
            .setPin(bar) // pins the element for the the scene's duration
            .addTo(scrollControl); // assign the scene to the controller
        */
        //push to dom
        container.appendChild(bar);
        container.appendChild(section);


    }
    
}

//export default {build};