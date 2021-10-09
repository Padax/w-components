import { DOM } from "../../WComponent.js";
import Button from "./Button.js";
const stylesheet=`
  button .icon {
    display: inline-flex; align-items: center; justify-content: center;
    height: 100%; line-height: 100%;
    margin-right: 8px;
  }

  button.sm .icon,
  button.md .icon {
    font-size: var(--font-size-normal); 
    max-height: var(--font-size-normal);
  }
  button.lg .icon,
  button.xl .icon {
    font-size: calc(var(--font-size-normal) * 1.25); 
    max-height: calc(var(--font-size-normal) * 1.25); 
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