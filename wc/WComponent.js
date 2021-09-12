import DOM from "./util/DOM.js";

class WComponent extends HTMLElement{
  /**
   * Get observed attributes array by parsing attribute object
   * @param {Object} attrs - Class field attributes
   * @returns {Array<String>} Array of observed attribute names
   */
  static getObservedAttributes(attrs) {
    const observedAttrs = Object.keys(attrs)
      .filter(key => attrs[key].observed !== false) // Default observed
      .map(key => attrs[key].name);
    return Array.isArray(observedAttrs) ? observedAttrs : [];
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
   *  by parsing class field attribute object.
   */
  createGettersAndSetters() {
    if(!Array.isArray(this.constructor.observedAttributes)) {
      return;
    }
    this.constructor.observedAttributes.forEach(attrName => {
      Object.defineProperty(this, attrName, {
        get: () => {
          const parser = this.getAttributeParserByName(attrName);
          return parser(this.getAttribute(attrName), this.constructor.attributes[attrName]);
        },
        set: value => {
          value = `${value}`;
          const parser = this.getAttributeParserByName(attrName);
          this.setAttribute(attrName, parser(value, this.constructor.attributes[attrName]));
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
      return value => {
        if(typeof value === 'string') {
          return value;
        } else {
          return this.constructor.attributes[name].defaultValue;
        }
      };
    }
    return this.constructor.attributes[name].parser;
  }
  getDefaultValueByName(name) {
    if(typeof name !== 'string') {
      return undefined;
    }
    return this.constructor.attributes[name].defaultValue;
  }
  setStylesheet(stylesheet, id){ // id is optional, for style overwrite
    if(id){
      const styleElement=this.shadowRoot.querySelector("#"+id);
      if(styleElement){
        DOM.modify(styleElement, { props: { textContent: stylesheet } });
      }else{
        DOM.create('style', { props: { textContent: stylesheet, id:id } }, this.shadowRoot);
      }
    }else{
      DOM.create('style', { props: { textContent: stylesheet } }, this.shadowRoot);
    }
  }

}

export default WComponent;
export { DOM };
export * as AttributeParser from './util/AttributeParser.js';