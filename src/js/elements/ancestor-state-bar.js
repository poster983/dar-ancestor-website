import {
    LitElement, html, customElement, property, css
  } from 'lit-element';
  
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
          div {
            width: 100%;
            height: 64px;
            background-color: var(--ancestor-state-bar-background-color, red);
          }
        `;
      }
  
    /**
     * Create an observed property. Triggers update on change.
     */
    static get properties() {
        return { 
          state: { type: String }
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
        <div>${this.state}</div>
      `;
    }
  }

  customElements.define('ancestor-state-bar', AncestorStateBar);

