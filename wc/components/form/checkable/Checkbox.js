import Checkable from "./Checkable.js";

const stylesheet=`
  .icon:before {
    content: '\\f292';
  }
  input:checked + .icon:before {
    content: '\\f28e';
    font-family: var(--icon-font-filled)
  }
`;

class Checkbox extends Checkable{

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
      if(name === checkedAttr.name && oldValue !== newValue) {
        this.dispatchEvent(this.events.change);
      }
    }
  }
  
  clickHandler = e => {
    this.dispatchEvent(this.events.click);
    if(!this.disabled) {
      this.checked = !this.checked;
    }
    e.stopPropagation();
  };

}
Checkbox.prototype.stylesheet += stylesheet;
Checkbox.prototype.type = 'checkbox';

export default Checkbox;