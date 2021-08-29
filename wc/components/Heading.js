import WComponent, { DOM, AttributeParser } from "../WComponent.js";
const stylesheet = `
  h1 { 
    font-size: 2.5rem; 
    font-weight: var(--font-weight-medium);
    line-height: calc(2.5rem * var(--line-height-normal-ratio)); 
  }
  h2 { 
    font-size: 2rem; 
    font-weight: var(--font-weight-medium);
    line-height: calc(2rem * var(--line-height-normal-ratio));  
  }
  h3 { 
    font-size: 1.5rem; 
    font-weight: var(--font-weight-regular);
    line-height: calc(1.5rem * var(--line-height-normal-ratio)); 
  }
  h4 { 
    font-size: 1.25rem; 
    font-weight: var(--font-weight-regular);
    line-height: calc(1.25rem * var(--line-height-normal-ratio)); 
  }
  h5 { 
    font-size: 1rem; 
    font-weight: var(--font-weight-regular);
    line-height: calc(1rem * var(--line-height-normal-ratio)); 
  }
  h6 { 
    font-size: .875rem; 
    font-weight: var(--font-weight-regular);
    line-height: calc(.875rem * var(--line-height-normal-ratio)); 
  }
  .heading { margin: 0; }
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

  render() {
    const props = {
      className: `heading${this.underlined ? ' underlined' : ''}`
    };
    const head=DOM.create(`h${this.level}`, { props }, this.shadowRoot);
    DOM.create("slot", {}, head);
  }
}
Heading.prototype.stylesheet=stylesheet;
export default Heading;