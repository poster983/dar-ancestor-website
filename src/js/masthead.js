import {
    default as config
} from "../../ancestor-config.json";

let mastheadTitle = document.getElementById("masthead-title");

let dropdownContainer = document.getElementById("morph-dropdown");

let drawerLinks = document.getElementById("drawer-links");

let drawerTitle = document.getElementById("drawer-title");
let drawerSubtitle = document.getElementById("drawer-subtitle");

export function buildMasthead() {

    // set titles 
    drawerSubtitle.innerHTML = config.title;
    drawerTitle.innerHTML = config.organizationName;
    mastheadTitle.innerHTML = config.organizationName


    // loop through config for links
    for (let x = config.mastheadLinks.length - 1; x >= 0; x--) {
        let link = config.mastheadLinks[x];

        /* FIRST BUILD MASTHEAD  */
        /* THEN BUILD THE SIDE NAV */
        if (link.dropdown != null) {
            buildMastheadDropdown(link);
            buildSideNavDropdown(link)
        } else {
            buildMastheadButton(link);
            buildSideNavButton(link);
        }
    }


}


/*function buildSideNavDropdown(item) {

    let container = document.createElement("morph-dropdown-item");
    let list = document.createElement("mwc-list");

    let listItem = document.createElement("mwc-list-item");
    listItem.classList.add("drawer-link");

    listItem.setAttribute("slot", "button");
    list.setAttribute("slot", "dropdown");
    

    //add link name
    listItem.innerHTML = item.name;


    item.dropdown.forEach(element => {
        if(element.href == null) {
            console.error("Dropdown children must have an href property")
            throw new TypeError("Dropdown children must have an href property");
        }
        let link = document.createElement("a");
        link.href = element.href;
        
        let listItemSub = document.createElement("mwc-list-item");
        listItemSub.innerHTML = element.name;
        
        if(element.newWindow) {
            link.target = "_blank";
            listItemSub.setAttribute("hasMeta", true);
            let icon = document.createElement("mwc-icon");
            icon.setAttribute("slot", "meta");
            icon.innerHTML = "open_in_new";
            listItemSub.appendChild(icon);
        }

        link.append(listItemSub);
        list.append(link);
        
    });
    container.append(listItem);
    container.append(list);
    drawerLinks.prepend(container);

}*/
function buildSideNavDropdown(item) {


    let container = document.createElement("mwc-list-dropdown");

    container.setAttribute("label", item.name)


    item.dropdown.forEach(element => {
        if(element.href == null) {
            console.error("Dropdown children must have an href property")
            throw new TypeError("Dropdown children must have an href property");
        }
        let link = document.createElement("a");
        link.href = element.href;
        
        let listItemSub = document.createElement("mwc-list-item");
        listItemSub.innerHTML = element.name;
        
        if(element.newWindow) {
            link.target = "_blank";
            listItemSub.setAttribute("hasMeta", true);
            let icon = document.createElement("mwc-icon");
            icon.setAttribute("slot", "meta");
            icon.innerHTML = "open_in_new";
            listItemSub.appendChild(icon);
        }

        link.append(listItemSub);
        container.append(link);
        
    });
    drawerLinks.prepend(container);

}

function buildSideNavButton(link) {
    let container = document.createElement("morph-dropdown-item");
    let list = document.createElement("mwc-list");

    let listItem = document.createElement("mwc-list-item");
        listItem.classList.add("drawer-link");

        //add link name
        listItem.innerHTML = link.name;

        //add new window icon
        if (link.newWindow) {
            listItem.setAttribute("hasMeta", true);
            let icon = document.createElement("mwc-icon");
            icon.setAttribute("slot", "meta");
            icon.innerHTML = "open_in_new";
            listItem.appendChild(icon);
        }

        //set click action
        listItem.addEventListener("click", () => {
            if (link.newWindow) {
                window.open(link.href, '_blank');
            } else {
                window.location.href = link.href;
            }

        }, {
            passive: true
        })

        drawerLinks.prepend(listItem);
}



function buildMastheadButton(link) {
    //make button
    let button = document.createElement("mwc-button");

    //config button
    //button.setAttribute("slot", "actionItems");
    //button.setAttribute("outlined", true);
    button.style.setProperty("--mdc-theme-primary", "rgb(255,255,255)");
    button.classList.add("masthead-links");

    if (link.newWindow) {
        button.setAttribute('trailingIcon', true);
        button.setAttribute("icon", "open_in_new")
    }

    //set text
    button.setAttribute("label", link.name);
    //set click action
    button.addEventListener("click", () => {
        if (link.newWindow) {
            window.open(link.href, '_blank');
        } else {
            window.location.href = link.href;
        }

    }, {
        passive: true
    })

    dropdownContainer.prepend(button);
}

/**
 * 
 * @param {Object} item 
 * @param {Object[]} item.dropdown
 * @param {String} item.name
 */
function buildMastheadDropdown(item) {
    
    let container = document.createElement("morph-dropdown-item");
    let button = document.createElement("mwc-button");
    let list = document.createElement("mwc-list");

    button.setAttribute("slot", "button");
    list.setAttribute("slot", "dropdown");
    

    button.style.setProperty("--mdc-theme-primary", "rgb(255,255,255)");
    button.classList.add("masthead-links");
    list.classList.add("masthead-dropdown-links");

    button.setAttribute("label", item.name);



    item.dropdown.forEach(element => {
        if(element.href == null) {
            console.error("Dropdown children must have an href property")
            throw new TypeError("Dropdown children must have an href property");
        }
        let link = document.createElement("a");
        link.href = element.href;
        
        let listItem = document.createElement("mwc-list-item");
        listItem.innerHTML = element.name;
        
        if(element.newWindow) {
            link.target = "_blank";
            listItem.setAttribute("hasMeta", true);
            let icon = document.createElement("mwc-icon");
            icon.setAttribute("slot", "meta");
            icon.innerHTML = "open_in_new";
            listItem.appendChild(icon);
        }

        link.append(listItem);


        list.append(link);
        
    });

    container.append(button);
    container.append(list);

    dropdownContainer.prepend(container);

}