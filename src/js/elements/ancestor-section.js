import {
    LitElement,
    html,
    customElement,
    property,
    css
} from 'lit-element';
import {unsafeHTML} from "lit-html/directives/unsafe-html";
import "./ancestor-names";







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
    _resize() {
        this.height = this.shadowRoot.getElementById('container').offsetHeight;
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
                                <img class="pictures" loading="lazy" alt="" src='${i.src}'>
                                <p class="picture-description">${unsafeHTML(i.description)}</p>
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