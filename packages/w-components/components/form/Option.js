import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
import Select from './Select.js'; // Import for custom element define dependency

const stylesheet=`

`;

class Option extends WComponent{
  static tagName = 'option';
  static attributes = {
    value: {
      name: 'value', defaultValue: null
    },
    selected: {
      name: 'selected', defaultValue: false, 
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    },
    disabled: {
      name: 'disabled', defaultValue: false, 
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    }
  };
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }

  constructor() {
    super();
  }

  init(){}
  update(){
    if(this.parentElement instanceof Select) {
      this.parentElement.updateOptions();
    }
  }
}
Option.prototype.stylesheet=stylesheet;

DOM.defineCustomElement(Option);

export default Option;