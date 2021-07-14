import DOM from "../util/DOM.js";
const stylesheet = `
  h1 { 
    font-size: 3rem; 
    font-weight: var(--font-weight-bold);
    line-height: calc(3rem * var(--line-height-normal-ratio)); 
  }
  .heading { margin: 0; }
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
    level: 1,
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
    if(isNaN(level) || level > 1 || level < 1) {
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