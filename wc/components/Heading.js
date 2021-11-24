import WComponent, { DOM, AttributeParser } from "../WComponent.js";
const stylesheet = `
  :host {
    display: block;
  }
  h1 { 
    font-size: 2.5rem; 
    font-weight: var(--font-weight-medium);
    line-height: calc(2.5rem * var(--line-height-normal-ratio)); 
    margin-top: 0.7em; margin-bottom: 0.7em;
  }
  h2 { 
    font-size: 2rem; 
    font-weight: var(--font-weight-medium);
    line-height: calc(2rem * var(--line-height-normal-ratio));  
    margin-top: 0.75em; margin-bottom: 0.75em;
  }
  h3 { 
    font-size: 1.5rem; 
    font-weight: var(--font-weight-regular);
    line-height: calc(1.5rem * var(--line-height-normal-ratio)); 
    margin-top: 0.833em; margin-bottom: 0.833em;
  }
  h4 { 
    font-size: 1.25rem; 
    font-weight: var(--font-weight-regular);
    margin-top: 0.8em; margin-bottom: 0.8em;
  }
  h5 { 
    font-size: 1rem; 
    font-weight: var(--font-weight-regular);
    line-height: calc(1rem * var(--line-height-normal-ratio)); 
    margin-top: 0.75em; margin-bottom: 0.75em;
  }
  h6 { 
    font-size: .875rem; 
    font-weight: var(--font-weight-regular);
    line-height: calc(.875rem * var(--line-height-normal-ratio)); 
    margin-top: 1.429em; margin-bottom: 1.429em;
  }
  .underlined { 
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--color-gray-20);
  }
`;
class Heading extends WComponent{
  static attributes = {
    level: {
      name: 'level', defaultValue: 5, min: 1, max: 6,
      parser: (value, attr) => AttributeParser.parseIntAttr(
        value, attr.defaultValue, attr.min, attr.max
      )
    },
    underlined: {
      name: 'underlined', defaultValue: false,
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    }
  };
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }

  constructor(){
    super();
  }

  init() {
    const props = {
      className: `heading${this.underlined ? ' underlined' : ''}`
    };
    const head=DOM.create(`h${this.level}`, { props }, this.shadowRoot);
    DOM.create("slot", {}, head);
  }
}
Heading.prototype.stylesheet=stylesheet;
export default Heading;