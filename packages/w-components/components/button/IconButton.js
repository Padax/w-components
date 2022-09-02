import { DOM, AttributeParser, getWTagName } from "../../WComponent.js";
import Button from "./Button.js";
import { getIconPresetRegExp } from "../Icon.js";
const stylesheet=`
  /* icon-only button */
  button.icononly .icon {
    margin-right: 0;
  }
  button.icononly.sm,
  button.icononly.md {
    padding: 5px;
  }
  button.icononly.lg {
    padding: 7px;
  }
  button.icononly.xl {
    padding: 11px;
  }
`;

class IconButton extends Button {
  static title = 'Icon Button';
  static description = 'General icon button component.';
  static tagName = 'icon-button';
  static attributes = {
    ...Button.attributes,
    icon: {
      name: 'icon', defaultValue: '', 
      possibleValues:'[String]',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, getIconPresetRegExp()
      )
    },
    icononly: {
      name: 'icononly', defaultValue: false, 
      possibleValues:'true|false',
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    }
  };
  static methods = null;
  static childComponents = null;
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }
  
  constructor(){
    super();
    this.setStylesheet(`
      .icon, button > ::slotted(${getWTagName('icon')}) {
        line-height: 100%; 
        margin-right: 10px;
      }
    `);
  }

  getIconSizeByButtonSize(size) {
    return size === 'xl' ? 'lg' : size;
  }

  bindEvents() {
    super.bindEvents();
    // Re-render icon
    this.shadowRoot.querySelector('slot')
      .addEventListener('slotchange', () => this.renderIcon());
  }
  
  init(){
    const settings = { props: this.renderProps(), attrs: this.renderAttrs() };
    const btn = DOM.create("button", settings, this.shadowRoot);
    this.renderIcon();
    DOM.create("slot", {}, btn);
  }

  update({ name, oldValue, newValue }){
    super.update({ name, oldValue, newValue });
    
    if(name === 'icon' || name === 'size') {
      oldValue = this.parseAttributeValueByName(name, oldValue);
      newValue = this.parseAttributeValueByName(name, newValue);
      this.renderIcon(name, oldValue, newValue);
    }
  }

  renderIcon(name, oldValue, newValue) {
    const btn = this.shadowRoot.querySelector('button');
    const icon = this.querySelector(getWTagName('icon'));
    const presetIcon = this.shadowRoot.querySelector(getWTagName('icon'));

    if(!icon) {
      const iconSettings = {
        attrs: { 
          size: name === 'size' 
            ? this.getIconSizeByButtonSize(newValue) 
            : this.getIconSizeByButtonSize(this.size), 
          type: name === 'icon' ? newValue : this.icon 
        },
        props: { className: 'icon' }
      };
      if(presetIcon) {
        DOM.modify(presetIcon, iconSettings);
      } else {
        DOM.create(getWTagName('icon'), iconSettings, btn);
      }
    } else if(!icon.getAttribute('size')) {
      // Use button size if slotted icon size unspecified.
      DOM.modify(icon, { attrs: { size: this.size } });
    } else if(name === 'size' && icon.getAttribute('size') === oldValue) {
      // Override icon size on update if slotted icon size and previous button size are the same.
      DOM.modify(icon, { attrs: { size: newValue } });
    }
  }

  // Override to render icononly property.
  renderProps({ display, size, color, outlined, icononly} = {}) {
    let props = super.renderProps({ display, size, color, outlined});
    
    if(icononly || icononly === undefined && this.icononly) {
      props.className += ' icononly';
    }
    return props;
  }

  clickHandler = this.clickHandler.bind(this);
}
IconButton.prototype.stylesheet += stylesheet;

DOM.defineCustomElement(IconButton);

export default IconButton;