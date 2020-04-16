import {
    LitElement, html, customElement, property, css
  } from 'lit-element';
  

  export class AncestorNames extends LitElement {
    static get styles() {
        return css`
          /*:host {
            
          }*/
          p {
              font-size: 1.10rem;
              font-family: 'Roboto', sans-serif;
          }
        `;
      }
  
    /**
     * Create an observed property. Triggers update on change.
     */
    static get properties() {
        return { 
          names: { type: Array },
        };
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
      ${this.names != []? html`
            ${this.names.map((i) => html`<p>${i}</p>`)}
        `: html `<!--No names-->`
        }
      `;
    }
  }

  customElements.define('ancestor-names', AncestorNames);

