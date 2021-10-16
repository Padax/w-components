import WComponent, { DOM, AttributeParser } from "../WComponent.js";

const stylesheet=`
  :host {
    vertical-align: middle;
  }
  
  /* icon size */
  .icon.sm { 
    font-size: var(--font-size-normal); 
    height: var(--font-size-normal);
    line-height: var(--font-size-normal);
  }
  .icon.md { 
    font-size: calc(var(--font-size-normal) * 1.25); 
    height: calc(var(--font-size-normal) * 1.25); 
    line-height: calc(var(--font-size-normal) * 1.25); 
  }
  .icon.lg { 
    font-size: calc(var(--font-size-normal) * 1.5); 
    height: calc(var(--font-size-normal) * 1.5); 
    line-height: calc(var(--font-size-normal) * 1.5); 
  }
  .icon.xl { 
    font-size: calc(var(--font-size-normal) * 2); 
    height: calc(var(--font-size-normal) * 2); 
    line-height: calc(var(--font-size-normal) * 2); 
  }
  ::slotted(*) {
    height: inherit;
    width: auto;
  }

  /* preset iconfont */
  span.icon { font-family: var(--icon-font-regular); }
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
`;

class Icon extends WComponent {
  static attributes = {
    type: {
      name: 'type', defaultValue: '', 
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, getIconPresetRegExp()
      )
    },
    size: {
      name: 'size', defaultValue: 'md', 
      parser: (value, attr) => {
        const number = AttributeParser.parseIntAttr(value, 0);
        if(number === 0) {
          return AttributeParser.parseStringAttr(
            value, attr.defaultValue, /^sm$|^md$|^lg$|^xl$|^[0-9]$/
          )
        } else {
          return `${number}px`;
        }
      }
    }
  };
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }
  
  constructor(){
    super();
  }
  
  init(){
    if(this.type === '') {
      DOM.create('slot', { props: { className: `icon ${this.size}` } }, this.shadowRoot);
    } else {
      DOM.create('span', { props: { className: `icon ${this.size} ${this.type}` } }, this.shadowRoot);  
    }
    if(this.isSizeCustom()) {
      this.setStylesheet(`.icon { 
        font-size: ${this.size}; 
        height: ${this.size};
        line-height: ${this.size};
      }`, 'size');
    }
  }

  isSizeCustom() {
    return this.size.indexOf('px') !== -1;
  }
}
Icon.prototype.stylesheet = stylesheet;

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

export default Icon;