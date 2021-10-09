import { DOM } from "../../WComponent.js";
import Button from "./Button.js";
const stylesheet=`
  button .icon {
    display: inline-flex; align-items: center; justify-content: center;
    height: 100%;
    margin-right: 8px;
  }

  button.md .icon {
    font-size: 14px;
  }
  button.md .icon {
    font-size: 16px;
  }
  button.md .icon {
    font-size: 20px;
  }
  button.xl .icon {
    font-size: 22px;
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