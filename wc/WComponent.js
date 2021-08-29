import DOM from "./util/DOM.js";

class WComponent extends HTMLElement{
  /**
   * Get observed attributes array by parsing attribute object
   * @param {Object} attrs - Class field attributes
   * @returns {Array<String>} Array of observed attribute names
   */
  static getObservedAttributes(attrs) {
    return Object.keys(attrs)
      .filter(key => attrs[key].observed === true)
      .map(key => attrs[key].name);
  }

  constructor(){
    super();
    this.createGettersAndSetters();
    this.attachShadow({ mode: 'open' });
    this.setStylesheet(this.stylesheet);
    this.componentWillRender();
    this.render();
    this.componentDidRender();
  }
  
  componentWillRender() {}
  componentDidRender() {}

  /**
   * Dynamically create getters & setters for property-attribute sync 
   *  by parsing class field attribute object
   */
  createGettersAndSetters() {
    this.constructor.observedAttributes.forEach(attr => {
      Object.defineProperty(this, attr, {
        get: () => {
          const parser = this.getAttributeParserByName(attr);
          return parser(this.getAttribute(attr));
        },
        set: value => {
          value = `${value}`;
          const parser = this.getAttributeParserByName(attr);
          this.setAttribute(attr, parser(value));
        }
      });
    });
  }
  getAttributeParserByName(name) {
    if(typeof name !== 'string') {
      return undefined;
    }
    if(typeof this.constructor.attributes[name].parser !== 'function') {
      // Default parser: return value as is.
      return value => value;
    }
    return this.constructor.attributes[name].parser;
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