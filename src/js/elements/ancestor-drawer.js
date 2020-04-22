import {
    LitElement, html, customElement, property, css
  } from 'lit-element';
  

  export class AncestorDrawer extends LitElement {
    static get styles() {
        return css`
          /*:host {
            
          }*/
          #drawer.closed {
              
          }
          #drawer.open {

          }
          #drawer {
              
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
        <div id="drawer">
            
        </div>

      `;
    }
  }

  customElements.define('ancestor-drawer', AncestorDrawer);

