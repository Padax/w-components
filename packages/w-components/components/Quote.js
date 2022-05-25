import WComponent, { DOM, AttributeParser } from "../WComponent.js";

const stylesheet = `
  :host {
    display: block;
  }
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
  static tagName = 'quote';
  static attributes = {
    align: {
      name: 'align', defaultValue: 'left', 
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^left$|^center$|^right$/
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
    const container = DOM.create('div', { props: { className: this.align } }, this.shadowRoot);
    
    const quoteContainer = DOM.create('div', {}, container);
    DOM.create('slot', { props: { name: 'quote' } }, quoteContainer);

    if(this.querySelector('[slot="source"]')) {
      const sourceContainer = DOM.create('div', { props: { className: 'source' } }, container);
      DOM.create('slot', { props: { name: 'source' } }, sourceContainer);
    }
  }
}
Quote.prototype.stylesheet=stylesheet;

DOM.defineCustomElement(Quote);

export default Quote;