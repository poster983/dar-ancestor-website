import {default as config} from "../../ancestor-config.json";


export function buildMasthead() {
    let masthead = document.getElementById("masthead");
    let drawer = document.getElementById("main");

    // loop through config for links
    for(let x = 0; x < config.mastheadLinks.length; x++) {
        let link = config.mastheadLinks[x];
        /* FIRST BUILD MASTHEAD  */
        //make button
        let button = document.createElement("mwc-button");

        //config button
        button.setAttribute("slot", "actionItems");
        //button.setAttribute("outlined", true);
        button.style.setProperty("--mdc-theme-primary", "rgb(255,255,255)");
        button.classList.add("masthead-links");

        if(link.newWindow) {
            button.setAttribute('trailingIcon', true);
            button.setAttribute("icon", "open_in_new")
        }

        //set text
        button.setAttribute("label", link.name);
        //set click action
        button.addEventListener("click", () => {
            if(link.newWindow) {
                window.open(link.href, '_blank');
            } else {
                window.location.href = link.href;
            }
            
        }, {passive: true})

        masthead.appendChild(button);

        /* THEN BUILD THE SIDE NAV */


    }

    
}