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
  constructor(extendStylesheet){
    super(typeof extendStylesheet === 'string' ? extendStylesheet : stylesheet);
  }
  static defaultValues = {
    level: 5,
    underlined: false
  };

  render() {
    const level = AttributeParser.parseIntAttr(
      this.getAttribute('level'), this.getDefaultValueByName('level'), 1, 6);
    const underlined = AttributeParser.parseBoolAttr(
      this.getAttribute('underlined'), this.getDefaultValueByName('underlined')
    );
    
    const props = {
      className: `heading${underlined ? ' underlined' : ''}`,
      textContent: this.textContent
    };
    DOM.create(`h${level}`, { props }, this.shadowRoot);
  }
}
export default Heading;