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
  .icon { font-family: var(--icon-font-regular); }
  .icon.add:before { content: '\\f108'; }
  .icon.add-circle:before { content: '\\fcb9'; }
  .icon.arrow-down:before { content: '\\f147'; }
  .icon.arrow-left:before { content: '\\f184'; }
  .icon.arrow-right:before { content: '\\fb6d'; }
  .icon.arrow-up:before { content: '\\f1b4'; }
  .icon.arrow-sync:before { content: '\\fea5'; }
  .icon.caret-down:before { content: '\\f260'; }
  .icon.caret-left:before { content: '\\f264'; }
  .icon.caret-right:before { content: '\\f268'; }
  .icon.caret-up:before { content: '\\f94e'; }
  .icon.checkmark:before { content: '\\f96c'; }
  .icon.checkmark-circle:before { content: '\\f297'; }
  .icon.copy:before { content: '\\f32a'; }
  .icon.dismiss:before { content: '\\f368'; }
  .icon.dismiss-circle:before { content: '\\f36c'; }
  .icon.error-circle:before { content: '\\f3f0'; }
  .icon.home:before { content: '\\fa25'; }
  .icon.info:before { content: '\\f4a2'; }
  .icon.more-vertical:before { content: '\\fd4b'; }
  .icon.navigation:before { content: '\\ffa5'; }
  .icon.search:before { content: '\\fe35'; }
  .icon.settings:before { content: '\\f6a8'; }
  .icon.share:before { content: '\\fb2e'; }
  .icon.subtract:before { content: '\\fc71'; }
  .icon.subtract-circle:before { content: '\\f7a7'; }
  .icon.toggle-left:before { content: '\\faea'; }
  .icon.toggle-right:before { content: '\\f82a'; }

  .icon.leaf-one:before { content: '\\fc1b'; }
  .icon.bookmark:before { content: '\\f1f4'; }
  .icon.weather-moon:before { content: '\\fb0d'; }
  .icon.sparkle:before { content: '\\101f1'; }
  .icon.flash:before { content: '\\fe63'; }
  .icon.timer:before { content: '\\fae8'; }
  .icon.animal-rabbit:before { content: '\\fcbb'; }

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

const ICON_PRESET = [
  'add', 'add-circle', 'subtract', 'subtract-circle',
  'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-sync',
  'caret-down', 'caret-left', 'caret-right', 'caret-up',
  'checkmark', 'checkmark-circle','dismiss', 'dismiss-circle', 'error-circle',
  'copy', 'home', 'info', 'navigation', 'search', 'settings', 'share',
  'more-vertical', 'toggle-left', 'toggle-right',
  'leaf-one', 'bookmark', 'weather-moon', 'sparkle', 'flash', 'timer', 'animal-rabbit'
];
function getIconPresetRegExp() {
  return new RegExp(ICON_PRESET.map(icon => `^${icon}$`).join('|'));
}

export default IconButton;