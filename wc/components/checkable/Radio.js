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

  constructor() {
    super();
    this.bindEvents();
  }
  
  clickHandler = e => {
    this.dispatchEvent(this.events.click);
    if(!this.disabled && !this.checked) {
      this.checked = !this.checked;
    }
    e.stopPropagation();
  };

}
Radio.prototype.stylesheet += stylesheet;
Radio.prototype.type = 'radio';
export default Radio;