import { DOM, AttributeParser } from "../../WComponent.js";
import Button from "./Button.js";
const stylesheet=`
  /* icon size */
  .icon-ctn {
    display: inline-flex; align-items: center; justify-content: center;
    height: 100%; line-height: 100%;
    margin-right: 8px;
  }
  button.sm .icon-ctn,
  button.md .icon-ctn {
    font-size: var(--font-size-normal); 
    max-height: var(--font-size-normal);
  }
  button.lg .icon-ctn,
  button.xl .icon-ctn {
    font-size: calc(var(--font-size-normal) * 1.25); 
    max-height: calc(var(--font-size-normal) * 1.25); 
  }
  ::slotted(*) {  /* For icon vertical alignment center */
    height: inherit;
  }

  /* preset iconfont */
  .icon {
    font-family: var(--icon-font-filled);
  }
  .icon.menu:before {
    content: '\\f4eb';
  }

  /* icon-only button */
  button.icononly {
    padding: 10px;
  }
  button.icononly .icon-ctn {
    margin-right: 0;
  }
`;
class IconButton extends Button {
  static attributes = {
    ...Button.attributes,
    icon: {
      name: 'icon', defaultValue: '', 
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^menu$/
      )
    },
    icononly: {
      name: 'icononly', defaultValue: false, 
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
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
    
    const iconCtn = DOM.create('slot', { attrs: { name: 'icon' }, props: { className: 'icon-ctn' } }, btn);
    DOM.create('span', { props: { className: `icon ${this.icon}` } }, iconCtn);

    const ctn = DOM.create('span', { props: { className: 'slot-ctn' } }, btn);
    DOM.create("slot", {}, ctn);
  }

  // Override to render icononly property.
  renderProps({ display, size, color, outlined, icononly} = {}) {
    let props = super.renderProps({ display, size, color, outlined});
    
    if(icononly || icononly === undefined && this.icononly) {
      props.className += ' icononly';
    }
    return props;
  }
}
Button.prototype.stylesheet += stylesheet;
export default IconButton;