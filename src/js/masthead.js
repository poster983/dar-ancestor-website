import {default as config} from "../../ancestor-config.json";


export function buildMasthead() {
    let mastheadTitle = document.getElementById("masthead-title");
    
    let drawerLinks = document.getElementById("drawer-links");

    let drawerTitle = document.getElementById("drawer-title");
    let drawerSubtitle = document.getElementById("drawer-subtitle");
    // set titles 
    drawerSubtitle.innerHTML = config.title;
    drawerTitle.innerHTML = config.darChapter;
    mastheadTitle.innerHTML = config.darChapter


    // loop through config for links
    for(let x = config.mastheadLinks.length-1; x >= 0; x--) {
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

        mastheadTitle.after(button);

        /* THEN BUILD THE SIDE NAV */

        let listItem = document.createElement("mwc-list-item");
        listItem.classList.add("drawer-link");

        //add link name
        listItem.innerHTML = link.name;

        //add new window icon
        if(link.newWindow) {
            listItem.setAttribute("hasMeta", true);
            let icon = document.createElement("mwc-icon");
            icon.setAttribute("slot", "meta");
            icon.innerHTML = "open_in_new";
            listItem.appendChild(icon);
        }

        //set click action
        listItem.addEventListener("click", () => {
            if(link.newWindow) {
                window.open(link.href, '_blank');
            } else {
                window.location.href = link.href;
            }
            
        }, {passive: true})

        drawerLinks.prepend(listItem);

    }

    
}