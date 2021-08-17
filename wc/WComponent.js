import DOM from "./util/DOM.js";

function createWBaseComponent(baseElement = HTMLElement) {
  return class WComponent extends baseElement {
    constructor(){
      super();
      this.attachShadowDOM();
      this.componentWillRender();
      this.render();
      this.componentDidRender();
      this.setStylesheet(this.stylesheet);
    }
    
    createCustomShadowRoot(shadowRoot) {
      this.customShadowRoot = shadowRoot;
      shadowRoot.attachShadow({ mode: 'open' });
    }
    getDefaultValueByName(name) {
      if(typeof name !== 'string') {
        return undefined;
      }
      return this.constructor.defaultValues[name];
    }
  
    attachShadowDOM() {
      this.attachShadow({ mode: 'open' });
    }
    componentWillRender() {}
    render() {}
    componentDidRender() {}
    setStylesheet(stylesheet){
      DOM.create('style', { props: { textContent: stylesheet } }, this.shadowRoot);
    }
  };
}

export default createWBaseComponent();
export { DOM, createWBaseComponent };
export * as AttributeParser from './util/AttributeParser.js';