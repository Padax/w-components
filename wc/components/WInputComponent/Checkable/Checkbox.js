import Checkable from "./Checkable.js";

const stylesheet=`
  .icon:before {
    content: '\\f292';
  }
  input:checked + .icon:before {
    content: '\\f28e';
  }
`;

class Checkbox extends Checkable{
  constructor() {
    super('checkbox');
  }
}
Checkbox.prototype.stylesheet += stylesheet;

export default Checkbox;