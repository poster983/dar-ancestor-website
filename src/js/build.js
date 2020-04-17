import {default as config} from "../../ancestor-config.json"
import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';


/**
 * Builds the Page from a json file
 * @param {HTMLElement} container 
 * @param {ScrollMagic} scrollControl - A ScrollMagic controller
 */
export function build(container, scrollControl) {
    for(let x = 0; x < config.states.length; x++) { // loop through states
        let state = config.states[x];
        
        //create sticky header
        let bar = document.createElement("ancestor-state-bar", {
            //state: state.state, // give it the state name
            //style: `--ancestor-state-bar-background-color: ${state.color}`
        });
        bar.state = state.state;
        bar.flagSrc = state.flagLink;
        bar.style.setProperty("--ancestor-state-bar-background-color", state.color);

        //create state bar container
        let barContainer = document.createElement("div");
        barContainer.appendChild(bar);
        barContainer.style.zIndex = 3;
        barContainer.style.width = "100%";
        barContainer.classList.add("fix-bar");

        // create ancestor section
        let section = document.createElement("ancestor-section");
        section.names = state.ancestors;
        section.background = "./src/img/testbg2.jpg";


        
        
        
        
        //push to dom
        container.appendChild(barContainer);
        container.appendChild(section);

        //add bar to scrollcontrol
        let scene = new ScrollMagic.Scene({
            duration: () => getDuration(section), //571-64, // 
            triggerElement: barContainer,
            triggerHook: 'onLeave',
        })  
            .addIndicators()
            .setPin(barContainer, {pushFollowers: false}) // pins the element for the the scene's duration
            .addTo(scrollControl); // assign the scene to the controller
        
        //FixScrollMagicJumpingPin(scene, bar);

        barContainer.style.setProperty("position", "relative");
    }
    //fix fixed bug
    setTimeout(()=> {
        let bars = document.getElementsByClassName("fix-bar");
    for (const element of bars) {
        //console.log(element);
        element.style.setProperty("position", "relative");
        //console.log(element);
      }
    }, 100)
    
}

/**
 * Returns the Duration for a given section
 * @param {AncestorSection} section 
 * @returns {String} Pixel value
 */
function getDuration(section) {
    //console.log(section.offsetHeight)
    return section.height;

}
//export default {build};
