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
  
  clickHandler = e => {
    if(!this.disabled) {
      this.checked = !this.checked;
    }
  };


}
Checkbox.prototype.stylesheet += stylesheet;
Checkbox.prototype.type = 'checkbox';

export default Checkbox;