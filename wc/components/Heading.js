import WComponent, { DOM, AttributeParser } from "../WComponent.js";
const stylesheet = `
  :host {
    display: block;
  }
`;
const propStylesheet = {
  LEVEL1: `
    font-size: 2.5rem; 
    font-weight: var(--font-weight-medium);
    line-height: calc(2.5rem * var(--line-height-normal-ratio)); 
    margin-top: 0.7em; margin-bottom: 0.7em;
  `,
  LEVEL2: `
    font-size: 2rem; 
    font-weight: var(--font-weight-medium);
    line-height: calc(2rem * var(--line-height-normal-ratio));  
    margin-top: 0.75em; margin-bottom: 0.75em;
  `,
  LEVEL3: ` 
    font-size: 1.5rem; 
    font-weight: var(--font-weight-regular);
    line-height: calc(1.5rem * var(--line-height-normal-ratio)); 
    margin-top: 0.833em; margin-bottom: 0.833em;
  `,
  LEVEL4: `
    font-size: 1.25rem; 
    font-weight: var(--font-weight-regular);
    margin-top: 0.8em; margin-bottom: 0.8em;
  `,
  LEVEL5: `
    font-size: 1rem; 
    font-weight: var(--font-weight-regular);
    line-height: calc(1rem * var(--line-height-normal-ratio)); 
    margin-top: 0.75em; margin-bottom: 0.75em;
  `,
  LEVEL6: `
    font-size: .875rem; 
    font-weight: var(--font-weight-regular);
    line-height: calc(.875rem * var(--line-height-normal-ratio)); 
    margin-top: 1.429em; margin-bottom: 1.429em;
  `,
  UNDERLINED: `
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--color-gray-20);
  `
};
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
    this.setStylesheet(this.getStylesheet(), 'heading');
    DOM.create("slot", {}, this.shadowRoot);
  }
  update({ name, newValue}) {
    const value = this.parseAttributeValueByName(name, newValue);
    this.setStylesheet(this.getStylesheet({ [name]: value }), 'heading');
  }

  getStylesheet({ level, underlined } = {}) {
    level = level ? level : this.level;
    underlined = underlined === undefined ? this.underlined : underlined;
    return `
      :host {
        ${this.propStylesheet[`LEVEL${level}`]}
        ${underlined ? this.propStylesheet.UNDERLINED : ''}
      }
    `;
  }
}
Heading.prototype.stylesheet=stylesheet;
Heading.prototype.propStylesheet=propStylesheet;


export default Heading;