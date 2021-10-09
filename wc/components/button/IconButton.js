import { DOM } from "../../WComponent.js";
import Button from "./Button.js";
const stylesheet=`
  button .icon {
    display: inline-flex; align-items: center; justify-content: center;
    width: 24px; height: 24px;
    margin-right: 8px;
  }
  button .icon > * {
    width: 100%; height: 100%;
  }
`;
class IconButton extends Button {
  static attributes = {
    ...Button.attributes,
    icon: {
      name: 'icon', defaultValue: ''
    }
  };
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }
  
  constructor(){
    super();
  }
  
  init(){
    const settings = { props: this.renderProps(), attrs: this.renderAttrs() };

    const btn = DOM.create("button", settings, this.shadowRoot);
    DOM.create('slot', { attrs: { name: 'icon' }, props: { className: 'icon' } }, btn);

    const ctn = DOM.create('span', { props: { className: 'slot-ctn' } }, btn);
    DOM.create("slot", {}, ctn);
  }
}
Button.prototype.stylesheet += stylesheet;
export default IconButton;