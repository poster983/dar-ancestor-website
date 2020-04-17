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
            background-color: var(--ancestor-state-bar-background-color, red);

          }
          .v-center {
            display: flex;
            align-items: center;
            /*justify-content: center;*/
            height: 100%;
            position: relative;
          }
          @media (max-width: 600px) {
            .title {
              font-size: 0.5rem; 
            }
          } 

          @media (min-width: 600px) {
              .title {
                font-size: 0.3rem;
              }
            }
          
          .title {
            padding-left: 25px;
            -webkit-font-smoothing: antialiased;
            font-family: 'Roboto', sans-serif;
          }
          .flag-conatiner {
            padding-left: 25px;
          }
          #flag {
            max-height: 50px;
            width: auto;
            border-radius: 10px;
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
      let bgColor = window.getComputedStyle(bar).backgroundColor;
      let textColor = common.getTextColor(common.parseRGBHEX(bgColor));//set title color
      let updated = this.shadowRoot.getElementById("updated");
      updated.style.color = textColor;
      
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
            <div>Created with ❤ by Joey</div>
            <div id="updated" class="updated">${this.lastUpdated}</div>
          
         
        </div>
      </div>
      `;
    }
  }

  customElements.define('ancestor-bottom-bar', AncestorBottomBar);

