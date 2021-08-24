import DOM from "./util/DOM.js";

class WComponent extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({ mode: 'open' });
    this.setStylesheet(this.stylesheet);
    this.componentWillRender();
    this.render();
    this.componentDidRender();
  }

  setStylesheet(stylesheet){
    DOM.create('style', { props: { textContent: stylesheet } }, this.shadowRoot);
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