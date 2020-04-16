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
              font-size: 1.25rem;
            }
          }
          .title {
            padding-left: 25px;
            -webkit-font-smoothing: antialiased;
            font-family: 'IM Fell English', serif;
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
      
      <div class="bar">
        <div class="v-center">
          <div class="flag"></div>
          <div class="title">${this.state}</div>
        </div>
      </div>
      `;
    }
  }

  customElements.define('ancestor-state-bar', AncestorStateBar);

