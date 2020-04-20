import {
    LitElement,
    html,
    customElement,
    property,
    css
} from 'lit-element';
import "./ancestor-names";
//import anime from "animejs";
import "./ancestor-state-bar"

//let ScrollMagic = require("scrollmagic");



export class AncestorSection extends LitElement {


    static get styles() {
        return css `
          :host {
            width: 100%;
            height: auto;
            
          }
          ancestor-names {
            /*display: inline-block;*/
            
            z-index: 1;
            color: white;
          }
          #container {
              padding-left: 25px;
              padding-right: 25px;
              margin: 0px;
              background-color: #212121;
          }

          .row {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
            
          }
          
          .column {
            display: flex;
            flex-direction: column;
            flex-basis: 100%;
            flex: 1;
            justify-content: center;
            align-items: center;
          }
          .column > * {
            flex: 1;
          }

          .pictures {
              max-width: 50%;
              height: auto;
              transform: translateX(-50%);
              left: 50%;
              position: relative;
              border-radius: 10px;
              border: 10px solid white

          }
          .picture-description {
            text-align: center;
            color: white;
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
        this.height = 100;


        this.firstUpdated = () => {
            
            
            setTimeout(() => {
                this._resize();
                //this._updateParalax();
            }, 600);
            
            requestAnimationFrame(() => {
                this._resize();
                //this._updateParalax();
            });
            
            

        }

        

    }
    /*updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            if(propName == "pictures") {
                this._updateParalax();
            }
            
        });
    }
    _updateParalax() {
        let pictures = this.shadowRoot.querySelectorAll(".pictures");
        //console.log(pictures);
        for(const elem of pictures) {
            console.log(elem)
            new simpleParallax(elem, {
                //customContainer: container
            });
        }
    }*/
    _resize() {
        this.height = this.shadowRoot.getElementById('container').offsetHeight;

        /*let background = this.shadowRoot.getElementById('background');
        let names = this.shadowRoot.getElementById('names');*/
        //console.log(names.offsetHeight);

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
        
        <div id="container">
        <br>
            <div class='row'>
                    <ancestor-names id="names" class="column" .names="${this.names}"></ancestor-names>
                <div class='column'>
                    ${this.pictures != null? html`
                        ${this.pictures.map((i) => html`
                            <div>
                                <img class="pictures" alt="" src='${i.src}'>
                                <p class="picture-description">${i.description}</p>
                            </div>
                        `)}
                    `: html `<!--No Pictures-->`
                    }
                </div>
            </div>
        <br>
        </div>

        
      `;
    }
}

customElements.define('ancestor-section', AncestorSection);