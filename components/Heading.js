import DOM from "./util/DOM.js";
const stylesheet = `
  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.25rem; }
  h6 { font-size: 1rem; }
  .heading {
    margin-top: .5rem;
    margin-bottom: .5rem;
    font-weight: 500;
    line-height: 1.2;
  }
  .heading.underlined {
    border-bottom: 1px solid #DDD;
  }
`;
class Heading extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({ mode:'open' });
    this.render();
  }
  static defaultValues = {
    level: 6,
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
      className: `heading ${this.parseUnderlined() ? 'underlined' : ''}`,
      textContent: this.textContent
    };
    DOM.create(`h${level}`, { props }, this.shadowRoot);
  }
}
export default Heading;