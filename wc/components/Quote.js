import WComponent, { DOM } from "../WComponent.js";
const stylesheet = `
  .left { text-align: left; }
  .center { text-align: center; }
  .right { text-align: right; }
  .source {
    font-size: var(--font-size-small);
    line-height: calc(var(--font-size-small) * var(--line-height-ratio));
    color: var(--color-gray-60);
  }
  .source:before {
    content: '— '
  }
`;
class Quote extends WComponent{
  constructor(){
    super();
  }
  static defaultValues = {
    align: 'left'
  };

  getDefaultValueByName(name) {
    return this.constructor.defaultValues[name];
  }
  /**
   * Parse align attribute to a valid value
   * @param {string} align 
   * @returns {string} Alignment class name
   */
   parseAlign(align = this.getAttribute('align')) {
    if(align == 'left' || align == 'center' || align == 'right') {
      return align;
    }
    return this.getDefaultValueByName('align');
  }

  render() {
    DOM.create('style', { props: { textContent: stylesheet } }, this.shadowRoot);

    const container = DOM.create('div', { props: { className: this.parseAlign() } }, this.shadowRoot);
    
    const quoteContainer = DOM.create('div', {}, container);
    DOM.create('slot', { props: { name: 'quote' } }, quoteContainer);

    if(this.querySelector('[slot="source"]')) {
      const sourceContainer = DOM.create('div', { props: { className: 'source' } }, container);
      DOM.create('slot', { props: { name: 'source' } }, sourceContainer);
    }
  }
}
Quote.prototype.stylesheet=stylesheet;
export default Quote;