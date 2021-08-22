import DOM from "./util/DOM.js";

class WComponent extends HTMLElement{
  static getObservedAttributes(attrs) {
    return Object.keys(attrs)
      .filter(key => attrs[key].observed === true)
      .map(key => attrs[key].name);
  }

  constructor(){
    super();
    this.createGettersAndSetters();
    this.attachShadow({ mode: 'open' });
    this.componentWillRender();
    this.render();
    this.componentDidRender();
    this.setStylesheet(this.stylesheet);
  }
  
  componentWillRender() {}
  componentDidRender() {}

  createGettersAndSetters() {
    this.constructor.observedAttributes.forEach(attr => {
      Object.defineProperty(this, attr, {
        get: () => {
          return this.constructor.attributes[attr].parser(this.getAttribute(attr));
        },
        set: value => {
          value = `${value}`;
          this.setAttribute(attr, this.constructor.attributes[attr].parser(value));
        }
      });
    });
  }
  getDefaultValueByName(name) {
    if(typeof name !== 'string') {
      return undefined;
    }
    return this.constructor.attributes[name].defatulValue;
  }
  setStylesheet(stylesheet){
    DOM.create('style', { props: { textContent: stylesheet } }, this.shadowRoot);
  }

}

export default WComponent;
export { DOM };
export * as AttributeParser from './util/AttributeParser.js';