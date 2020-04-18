import {
    LitElement, html, customElement, property, css
  } from 'lit-element';
  
import * as common from "../common";
  /**
   * 
   */
  export class AncestorBottomBar extends LitElement {

    static get styles() {
        return css`

          :host {
            z-index: 2;
            width: 100%;
          }
          .bar {
            width: 100%;
            height: 40px;
            background-color: var(--ancestor-bottom-bar-background-color, red);

          }
          .v-center {
            display: flex;
            align-items: center;
            /*justify-content: center;*/
            height: 100%;
            position: relative;
          }
          @media (max-width: 600px) {
            .text {
              font-size: 1rem; 
            }
          } 

          @media (min-width: 600px) {
            .text {
                font-size: 0.9rem;
              }
            }
          
          #updated {
            padding-right: 25px;
            text-align: right;
            right: 0px;
            position: absolute;
          }
          .text {
            -webkit-font-smoothing: antialiased;
            font-family: 'Roboto', sans-serif;
          }
          #attribution {
            padding-left: 25px;
            text-align: left;
            
          }
          
          
        `;
      }

    constructor() {
      super();
      this.firstUpdated = () => {
        this._updateTextColor();
        /*requestAnimationFrame(() => {
          
        });*/
        //add class change observer
        let observer = new MutationObserver((mutations) => {
          mutations.forEach((mutationRecord) => {
              console.log('style changed!');
              this._updateTextColor();
          });    
        });
        observer.observe(this, { attributes : true, attributeFilter : ['style', "class"] });
      }

    }

    _updateTextColor() {
      //get color
      let bar = this.shadowRoot.getElementById("bar");
      let attribution = this.shadowRoot.getElementById("attribution");
      let bgColor = window.getComputedStyle(bar).backgroundColor;
      let textColor = common.getTextColor(common.parseRGBHEX(bgColor));//set title color
      
        console.log(textColor)
        bar.style.color = textColor;
        attribution.style.color = textColor;
    }
  
    /**
     * Create an observed property. Triggers update on change.
     */
    static get properties() {
        return { 
            lastUpdated: { type: String },
        };
      }
  
    /**
     * Implement `render` to define a template for your element.
     */
    render(){

      return html`

      <div id="bar" class="bar">
        <div class="v-center">
            <a href="https://josephhassell.com" class="text" id="attribution">Created with ❤ by Joey</a>
            <div id="updated" class="text">Last Updated: ${this.lastUpdated}</div>
          
         
        </div>
      </div>
      `;
    }
  }

  customElements.define('ancestor-bottom-bar', AncestorBottomBar);

