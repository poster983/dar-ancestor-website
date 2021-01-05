import {
    LitElement, html, customElement, property, css
  } from 'lit-element';
  import '@material/mwc-list/mwc-list-item.js';
  import '@material/mwc-icon';

  /**
   * Use in `<mwc-list>` elements inside of `<mwc-drawer>` elements 
   * Slot: to have drop down content
   */
  export class MWCListDropdown extends LitElement {
    static get styles() {
        return css`
          /*:host {
            
          }*/
          #dropdown {
            height: 0px;
            transform: scaleY(0);
            /*opacity: 0;*/
            transition: all 0.2s;
            transform-origin: center top;
          }
          #dropdown.open {
            transform: scaleY(1);

          }

          #carrot {
            transform: rotateX(0deg);
            transition: all 0.2s;
          }

          #carrot.open {
            transform: rotateX(180deg);
          }

          @keyframes open {
            0% {
              translate: scaleY(0);
            }
            100% {
              translate: scaleY(1);
            }
          }
          
        `;
      }
    
    constructor() {
      super();
      
    }
    /**
     * Create an observed property. Triggers update on change.
     */
    static get properties() {
        return { 
          label: { type: String },
          opened: { type: Boolean, reflect: true },
        };
      }

    firstUpdated() {
      this._dropdownElm = this.shadowRoot.querySelector("#dropdown");
      this._carrotElm = this.shadowRoot.querySelector("#carrot");
    }

    updated(changedProperties) {
      changedProperties.forEach((oldValue, propName) => {
        switch(propName) {
          case "opened": 
            if(oldValue != this.opened) {
              if(this.opened) {
                this._open()
              } else {
                this._close()
              }
            }
          break;
        }
      })
    }
  

    _open() {
      console.log("opening")
      console.log(this._dropdownElm.scrollHeight)
      
      /*if ('animate' in HTMLElement.prototype) {
        this._dropdownElm.animate(
          [
            {height: this._dropdownElm.style.height},
            {height: this._dropdownElm.scrollHeight + "px"}
          ],
          {
            duration: 200,
            fill: 'forwards',
          }
        ).play()
        
      } else {
        this._dropdownElm.style.height = this._dropdownElm.scrollHeight + "px";
      }*/
      this._dropdownElm.style.height = this._dropdownElm.scrollHeight + "px";
      this._dropdownElm.classList.add("open")
      this._carrotElm.classList.add("open")
      
    }
    
    _close() {
      console.log("Closed")
      /*if ('animate' in HTMLElement.prototype) {
        this._dropdownElm.animate(
          [
            {height: this._dropdownElm.style.height},
            {height: "0px"}
          ],
          {
            duration: 200,
            fill: 'forwards',
          }
        ).play()
        
      } else {
        this._dropdownElm.style.height = "0px";
      }*/
      this._dropdownElm.style.height = "0px";
      this._dropdownElm.classList.remove("open")
      this._carrotElm.classList.remove("open")
    }
    /**
     * Implement `render` to define a template for your element.
     */
    render(){
      /**
       * Use JavaScript expressions to include property values in
       * the element template.
       */
      return html`
     
        <mwc-list-item hasMeta id="parent" @click="${(e) => {this.opened = !this.opened}}">
          <span>${this.label}</span>
          <mwc-icon id="carrot" slot="meta">keyboard_arrow_down</mwc-icon>
        </mwc-list-item>
        <div id="dropdown">
          <slot></slot>
          <br>
        </div>
        
      `;
    }
  }

  customElements.define('mwc-list-dropdown', MWCListDropdown);

