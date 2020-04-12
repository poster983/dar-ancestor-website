import {
    LitElement,
    html,
    customElement,
    property,
    css
} from 'lit-element';
import "./ancestor-names";
import anime from "animejs";
import simpleParallax from 'simple-parallax-js';
import "./ancestor-state-bar"

let ScrollMagic = require("scrollmagic");


export class AncestorSection extends LitElement {


    static get styles() {
        return css `
          :host {
            width: 100%;
          }
          #background {
            background-size: cover;
            /*width: inherit;*/
            /*width: 100%;*/
            /*height: 100%;*/
            width: 100%;
            height: auto;
            overflow: hidden;
            z-index: -1;
          }
          ancestor-names {
            display: inline-block;
            z-index: 1;
            position: absolute;
          }
        `;
    }

    /**
     * Create an observed property. Triggers update on change.
     */
    static get properties() {
        return {
            names: {
                type: Array
            },
            pictures: {
                type: Array
            },
            background: {
                type: String
            },
            //scrollController: {type: Object},
            // state: {type: String}
        };
    }

    constructor() {
        super();

        /** Add Paralax to background */
        //this.controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});
        //Paralax animations

        window.addEventListener('resize', () => this._resize());



        this.firstUpdated = () => {
            


            let background = this.shadowRoot.getElementById('background');
            //let container = this.shadowRoot.getElementById('paralax');
            //background.style.height = 
            new simpleParallax(background, {
                scale: 3,
                //customContainer: container
            });

            requestAnimationFrame(() => {
                this._resize();
            });
            
            

        }

    }

    _resize() {
        if(this.paralaxControl) {
            this.paralaxControl.destroy();
        }
        let background = this.shadowRoot.getElementById('background');
        let names = this.shadowRoot.getElementById('names');
        console.log(names.offsetHeight);
        background.style.height = names.offsetHeight;

        /*this.paralaxControl = new simpleParallax(background, {
            scale: 2,
            //customContainer: container
        });*/
    }
    /**
     * Implement `render` to define a template for your element.
     */
    render() {
        /**
         * Use JavaScript expressions to include property values in
         * the element template.
         */
        return html `
        <div id="paralax">
            
            <ancestor-names id="names" style="color: white;" .names="${this.names}"></ancestor-names>
            <img  id="background" src="${this.background}" >
            
        </div>

        
        
      `;
    }
}

customElements.define('ancestor-section', AncestorSection);