import DOM from "../util/DOM.js";
const stylesheet = `
  h1 { 
    font-size: 5.5rem;
    line-height: calc(5.5rem * var(--line-height-normal-ratio)); 
  }
  h2 { 
    font-size: 5rem;
    line-height: calc(5rem * var(--line-height-normal-ratio)); 
  }
  h3 { 
    font-size: 4.5rem;
    line-height: calc(4.5rem * var(--line-height-normal-ratio)); 
  }
  h4 { 
    font-size: 4rem;
    line-height: calc(4rem * var(--line-height-normal-ratio)); 
  }
  h5 { 
    font-size: 3.5rem; 
    line-height: calc(3.5rem * var(--line-height-normal-ratio)); 
  }
  h6 { 
    font-size: 3rem; 
    line-height: calc(3rem * var(--line-height-normal-ratio)); 
  }
  .heading { 
    font-weight: var(--font-weight-light);
    margin: 0; 
  }
  .underlined { 
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--color-gray-20);
  }
`;
class DisplayHeading extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }
  static defaultValues = {
    level: 5,
    underlined: false
  };

  getDefaultValueByName(name) {
    return this.constructor.defaultValues[name];
  }
  /**
   * Parse level attribute to a valid value
   * @param {string | number} level 
   * @returns {int}
   */
  parseLevel(level = this.getAttribute('level')) {
    level = parseInt(level);
    if(isNaN(level) || level > 6 || level < 1) {
      return this.getDefaultValueByName('level');
    }
    return level;
  }
  /**
   * Parse underlined attribute to a valid value
   * @param {string} underlined 
   * @returns {boolean}
   */
  parseUnderlined(underlined = this.getAttribute('underlined')) {
    if(underlined === 'true' || underlined === '') {
      return true;
    }
    if(underlined === 'false') {
      return false;
    }
    return this.getDefaultValueByName('underlined');
  }

  render() {
    DOM.create('style', { props: { textContent: stylesheet } }, this.shadowRoot);
    
    const level = this.parseLevel();
    const props = {
      className: `heading${this.parseUnderlined() ? ' underlined' : ''}`,
      textContent: this.textContent
    };
    DOM.create(`h${level}`, { props }, this.shadowRoot);
  }
}
export default DisplayHeading;