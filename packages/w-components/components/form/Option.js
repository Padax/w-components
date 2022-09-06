import WComponent, { DOM, AttributeParser } from "../../WComponent.js";

const stylesheet=`

`;

class Option extends WComponent{
  static title = 'Option';
  static description = 'General option component, should be wrapped in select component.';
  static tagName = 'option';
  static attributes = {
    value: {
      name: 'value', defaultValue: null, possibleValues: '[Any String]'
    },
    selected: {
      name: 'selected', defaultValue: false, 
      possibleValues: 'true|false',
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    },
    disabled: {
      name: 'disabled', defaultValue: false, 
      possibleValues: 'true|false',
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    }
  };
  static methods = null;
  static childComponents = null;
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }

  constructor() {
    super();
  }

  init(){}
  update(){
    if(typeof this.parentElement.updateOptions === 'function') {
      this.parentElement.updateOptions();
    }
  }
}
Option.prototype.stylesheet=stylesheet;

DOM.defineCustomElement(Option);

export default Option;