import {
    LitElement, html, customElement, property, css
  } from 'lit-element';
  
import * as common from "../common";
  /**
   * 
   */
  export class AncestorStateBar extends LitElement {

    static get styles() {
        return css`

          :host {
            z-index: 3;
            width: 100%;
          }
          .bar {
            width: 100%;
            height: 64px;
            background-color: var(--ancestor-state-bar-background-color, red);
            backdrop-filter: blur(10px);
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

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
              font-size: 2rem; 
            }
          } 

          @media (min-width: 600px) {
              .title {
                font-size: 1.5rem;
              }
            }
          
          .title {
            padding-left: 25px;
            -webkit-font-smoothing: antialiased;
            font-family: 'IM Fell English', serif;
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
      let title = this.shadowRoot.getElementById("title");
      title.style.color = textColor;

      //change flag outline
      let flag = this.shadowRoot.getElementById("flag");
      if(flag) {
        flag.style.setProperty("border", `3px solid ${textColor}`);
      }
      
      
    }
  
    /**
     * Create an observed property. Triggers update on change.
     */
    static get properties() {
        return { 
          state: { type: String },
          flagSrc: {type: String}
        };
      }
  
    /**
     * Implement `render` to define a template for your element.
     */
    render(){

      return html`

      <div id="bar" class="bar">
        <div class="v-center">
          ${this.flagSrc? html`
            <div class="flag-conatiner">
              <img id="flag" src="${this.flagSrc}">
            
            </div>
          `: html `<!--No Flag-->`
          }
           <div id="title" class="title">${this.state}</div>
          
         
        </div>
      </div>
      `;
    }
  }

  customElements.define('ancestor-state-bar', AncestorStateBar);

