import DOM from "./util/DOM.js";

class WCComponent extends HTMLElement{
  constructor(stylesheet){
    super();
    this.attachShadow({ mode: 'open' });
    DOM.create('style', { props: { textContent: stylesheet } }, this.shadowRoot);
    this.render();
  }

  getDefaultValueByName(name) {
    if(typeof name !== 'string') {
      return undefined;
    }
    return this.constructor.defaultValues[name];
  }
}

export default WCComponent;
export { DOM };
export * as PropParser from './util/PropParser.js';