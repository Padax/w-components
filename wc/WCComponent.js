import DOM from "./util/DOM.js";

class WCComponent extends HTMLElement{
  constructor(stylesheet){
    super();
    this.attachShadow({ mode: 'open' });
    DOM.create('style', { props: { textContent: stylesheet } }, this.shadowRoot);
    this.render();
  }

  getDefaultValueByName(name) {
    return this.constructor.defaultValues[name];
  }

}

export default WCComponent;
export { DOM };