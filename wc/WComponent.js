import DOM from "./util/DOM.js";

class WComponent extends HTMLElement{
  constructor(stylesheet){
    super();
    this.attachShadow({ mode: 'open' });
    DOM.create('style', { props: { textContent: stylesheet } }, this.shadowRoot);
    this.componentWillRender();
    this.render();
    this.componentDidRender();
  }

  getDefaultValueByName(name) {
    if(typeof name !== 'string') {
      return undefined;
    }
    return this.constructor.defaultValues[name];
  }

  componentWillRender() {}
  componentDidRender() {}
}

export default WComponent;
export { DOM };
export * as AttributeParser from './util/AttributeParser.js';