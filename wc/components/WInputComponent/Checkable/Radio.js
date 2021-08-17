import Checkable from "./Checkable.js";

const stylesheet=`
  .icon:before {
    content: '\\f644';
  }
  input:checked + .icon:before {
    content: '\\f64e';
  }
`;

class Radio extends Checkable{
  constructor() {
    super('radio');
  }
}
Radio.prototype.stylesheet += stylesheet;

export default Radio;