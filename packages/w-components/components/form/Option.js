import WComponent, { DOM, AttributeParser } from "../../WComponent.js";

const stylesheet=`

`;

class Option extends WComponent{

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
    this.parentElement.updateOptions();
  }
}
Option.prototype.stylesheet=stylesheet;
export default Option;