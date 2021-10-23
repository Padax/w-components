import { DOM, AttributeParser } from "../../WComponent.js";
import Button from "./Button.js";
import { getIconPresetRegExp } from "../Icon.js";
const stylesheet=`
  /* icon-only button */
  button.icononly {
    padding: 10px;
  }
  button.icononly .icon {
    margin-right: 0;
  }
`;

class IconButton extends Button {
  static attributes = {
    ...Button.attributes,
    icon: {
      name: 'icon', defaultValue: '', 
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, getIconPresetRegExp()
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
    this.setStylesheet(`
      .icon, button > ::slotted(${getWIconTag()}) {
        font-family: var(--icon-font-regular);
        line-height: 100%; margin-right: 8px;
      }
    `);
  }
  
  init(){
    const settings = { props: this.renderProps(), attrs: this.renderAttrs() };

    const btn = DOM.create("button", settings, this.shadowRoot);

    const icon = this.querySelector(getWIconTag());
    if(!icon) {
      const iconSettings = {
        attrs: { size: this.size, type: this.icon },
        props: { className: 'icon' }
      };
      DOM.create(getWIconTag(), iconSettings, btn);
    } else if(!icon.getAttribute('size')) {
      DOM.modify(icon, { attrs: { size: this.size } });
    }
    DOM.create("slot", {}, btn);
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

function getWIconTag() { return `${window.wconfig.prefix}-icon`; }

export default IconButton;