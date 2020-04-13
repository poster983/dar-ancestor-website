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
        bar.style.setProperty("--ancestor-state-bar-background-color", state.color);


        // create ancestor section
        let section = document.createElement("ancestor-section");
        section.names = state.ancestors;
        section.background = "./src/img/testbg2.jpg";

        console.log(section.clientHeight)
        
        
        
        //push to dom
        container.appendChild(bar);
        container.appendChild(section);


        //add bar to scrollcontrol
        new ScrollMagic.Scene({
            duration: 571-64, //() => getDuration(section), 
            triggerElement: bar,
            triggerHook: 'onLeave',
        })  
            .addIndicators()
            .setPin(bar, {pushFollowers: true}) // pins the element for the the scene's duration
            .addTo(scrollControl); // assign the scene to the controller
        

    }
    
}

/**
 * Returns the Duration for a given section
 * @param {AncestorSection} section 
 * @returns {String} Pixel value
 */
function getDuration(section) {
    //console.log(section.offsetHeight)
    return section.height-64;

}
//export default {build};