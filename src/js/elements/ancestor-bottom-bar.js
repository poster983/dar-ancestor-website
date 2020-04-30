import {
    LitElement, html, customElement, property, css
  } from 'lit-element';
  import {unsafeHTML} from "lit-html/directives/unsafe-html";
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
            overflow: hidden;
          }
          .bar {
            width: 100%;
            /*height: 100%;*/
            padding-top: 5px;
            padding-bottom: 5px;
            background-color: var(--ancestor-bottom-bar-background-color, red);

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
            /*padding-right: 25px;
            text-align: right;
            right: 0px;
            position: absolute;*/
          }
          .text {
            -webkit-font-smoothing: antialiased;
            font-family: 'Roboto', sans-serif;
            padding-left: 25px;
            padding-right: 25px;
            padding-bottom: 5px;
          }          
          a:visited {
            color: inherit;
          }
          a:link {
            color: inherit;
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
      
        //console.log(textColor)
        this.style.color = textColor;
        this.style.color = textColor;
    }
  
    /**
     * Create an observed property. Triggers update on change.
     */
    static get properties() {
        return { 
            lastUpdated: { type: String },
            webmasterEmail: {type: String},
            disclaimer: {type: String}
        };
      }
  
    /**
     * Implement `render` to define a template for your element.
     */
    render(){

      return html`

      <div id="bar" class="bar">
            <div class="text"> <a href="https://github.com/poster983" id="attribution" target="_blank">Created with &#x2764; by Joey</a></div>
            <div id="updated" class="text">Last Updated: ${this.lastUpdated}</div>
            <!--Webmaster-->
            ${!(this.webmasterEmail == null || this.webmasterEmail == undefined || this.webmasterEmail == "") ? html`
              <div class="text">For technical problems with this page, contact <a href="mailto:${this.webmasterEmail}">webmaster</a>.</div>
            ` : html`<!--No Webmaster-->`}
            <!--Disclaimer-->
            ${!(this.disclaimer == null || this.disclaimer == undefined || this.disclaimer == "") ? html`
              <div class="text">${unsafeHTML(this.disclaimer)}</div>
            ` : html`<!--No Disclaimer-->`}
            
        <!--<div class="v-center">
          
          
         
        </div>-->
      </div>
      `;
    }
  }

  customElements.define('ancestor-bottom-bar', AncestorBottomBar);

