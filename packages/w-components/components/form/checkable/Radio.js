import Checkable from "./Checkable.js";
const stylesheet=`
  .icon:before {
    content: '\\f644';
  }
  input:checked + .icon:before {
    content: '\\f64e';
    font-family: var(--icon-font-filled)
  }
`;
class Radio extends Checkable{
  static tagName = 'radio';
  
  constructor() {
    super();
    this.bindEvents();
  }
  
  update({ name, oldValue, newValue } = {}) {
    super.update({ name, oldValue, newValue });

    const checkedAttr = this.constructor.attributes.checked;
    const disabledAttr = this.constructor.attributes.disabled;
    if(name === checkedAttr.name || name === disabledAttr.name) {
         
      // Trigger change event
      if(name === checkedAttr.name && checkedAttr.parser(newValue, checkedAttr)) {
        this.dispatchEvent(new Event('change'));
      }
    }
  }
  
  clickHandler = e => {
    this.dispatchEvent(new Event('click', e));
    if(!this.disabled && !this.checked) {
      this.checked = !this.checked;
    }
    e.stopPropagation();
  };

}
Radio.prototype.stylesheet += stylesheet;
Radio.prototype.type = 'radio';
export default Radio;