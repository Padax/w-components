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
  .icon span { font-family: var(--icon-font-regular); }
  .icon span:before { display:inline-block; }
  .icon span.add:before { content: '\\f108'; }
  .icon span.add-circle:before { content: '\\fcb9'; }
  .icon span.alert:before { content: '\\fb21'; }
  .icon span.animal-rabbit:before { content: '\\fcbb'; }
  .icon span.arrow-down:before { content: '\\f147'; }
  .icon span.arrow-left:before { content: '\\f184'; }
  .icon span.arrow-right:before { content: '\\fb6d'; }
  .icon span.arrow-up:before { content: '\\f1b4'; }
  .icon span.arrow-sync:before { content: '\\fea5'; }
  .icon span.bookmark:before { content: '\\f1f4'; }
  .icon span.caret-down:before { content: '\\f260'; }
  .icon span.caret-left:before { content: '\\f264'; }
  .icon span.caret-right:before { content: '\\f268'; }
  .icon span.caret-up:before { content: '\\f94e'; }
  .icon span.checkmark:before { content: '\\f96c'; }
  .icon span.checkmark-circle:before { content: '\\f297'; }
  .icon span.copy:before { content: '\\f32a'; }
  .icon span.dismiss:before { content: '\\f368'; }
  .icon span.dismiss-circle:before { content: '\\f36c'; }
  .icon span.error-circle:before { content: '\\f3f0'; }
  .icon span.flash:before { content: '\\fe63'; }
  .icon span.globe:before { content: '\\fa16'; }
  .icon span.heart:before { content: '\\f478'; }
  .icon span.home:before { content: '\\fa25'; }
  .icon span.info:before { content: '\\f4a2'; }
  .icon span.leaf-one:before { content: '\\fc1b'; }
  .icon span.more-vertical:before { content: '\\fd4b'; }
  .icon span.navigation:before { content: '\\ffa5'; }
  .icon span.search:before { content: '\\fe35'; }
  .icon span.settings:before { content: '\\f6a8'; }
  .icon span.share:before { content: '\\fb2e'; }
  .icon span.star:before { content: '\\f70e'; }
  .icon span.star-emphasis:before { content: '\\fba7'; }
  .icon span.subtract:before { content: '\\fc71'; }
  .icon span.subtract-circle:before { content: '\\f7a7'; }
  .icon span.text-quote:before { content: '\\f800'; }
  .icon span.timer:before { content: '\\fae8'; }
  .icon span.toggle-left:before { content: '\\faea'; }
  .icon span.toggle-right:before { content: '\\f82a'; }
  .icon span.weather-moon:before { content: '\\fb0d'; }
  .icon span.weather-sunny:before { content: '\\f8a1'; }
  
  .icon span[class*="-filled"] { font-family: var(--icon-font-filled); }
  .icon span.add-filled:before { content: '\\f108'; }
  .icon span.add-circle-filled:before { content: '\\fcc2'; }
  .icon span.alert-filled:before { content: '\\fb29'; }
  .icon span.animal-rabbit-filled:before { content: '\\fcc4'; }
  .icon span.arrow-down-filled:before { content: '\\f147'; }
  .icon span.arrow-left-filled:before { content: '\\f184'; }
  .icon span.arrow-right-filled:before { content: '\\fb75'; }
  .icon span.arrow-up-filled:before { content: '\\f1b4'; }
  .icon span.arrow-sync-filled:before { content: '\\fea9'; }
  .icon span.bookmark-filled:before { content: '\\f1f4'; }
  .icon span.caret-down-filled:before { content: '\\f260'; }
  .icon span.caret-left-filled:before { content: '\\f264'; }
  .icon span.caret-right-filled:before { content: '\\f268'; }
  .icon span.caret-up-filled:before { content: '\\f966'; }
  .icon span.checkmark-filled:before { content: '\\f984'; }
  .icon span.checkmark-circle-filled:before { content: '\\f297'; }
  .icon span.copy-filled:before { content: '\\f32a'; }
  .icon span.dismiss-filled:before { content: '\\f368'; }
  .icon span.dismiss-circle-filled:before { content: '\\f36c'; }
  .icon span.error-circle-filled:before { content: '\\f3ef'; }
  .icon span.flash-filled:before { content: '\\fe67'; }
  .icon span.globe-filled:before { content: '\\fa27'; }
  .icon span.heart-filled:before { content: '\\f47c'; }
  .icon span.home-filled:before { content: '\\fa36'; }
  .icon span.info-filled:before { content: '\\f4a9'; }
  .icon span.leaf-one-filled:before { content: '\\fc24'; }
  .icon span.more-vertical-filled:before { content: '\\fd54'; }
  .icon span.navigation-filled:before { content: '\\ffa9'; }
  .icon span.search-filled:before { content: '\\fe39'; }
  .icon span.settings-filled:before { content: '\\f6b1'; }
  .icon span.share-filled:before { content: '\\fb36'; }
  .icon span.star-filled:before { content: '\\f717'; }
  .icon span.star-emphasis-filled:before { content: '\\fbaf'; }
  .icon span.subtract-filled:before { content: '\\fc7b'; }
  .icon span.subtract-circle-filled:before { content: '\\f7bf'; }
  .icon span.text-quote-filled:before { content: '\\f819'; }
  .icon span.timer-filled:before { content: '\\faf0'; }
  .icon span.toggle-left-filled:before { content: '\\faf2'; }
  .icon span.toggle-right-filled:before { content: '\\f843'; }
  .icon span.weather-moon-filled:before { content: '\\fb15'; }
  .icon span.weather-sunny-filled:before { content: '\\f8b9'; }
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
    const slot = DOM.create('slot', this.renderSlotSettings(), this.shadowRoot);
    DOM.create('span', this.renderPresetSettings(), slot);
    this.renderSizeStylesheet();
  }
  update({ name, newValue }){
    const value = this.parseAttributeValueByName(name, newValue);
    if(name === 'size') {
      DOM.modify(this.shadowRoot.querySelector('slot'), this.renderSlotSettings(value));
      this.renderSizeStylesheet(value);
    } else if(name === 'type') {
      DOM.modify(this.shadowRoot.querySelector('span'), this.renderPresetSettings(value));
    }
  }
  renderSlotSettings(size) {
    size = size === undefined ? this.size : size;
    return { props: { className: `icon ${size}` } };
  }
  renderPresetSettings(type) {
    type = type === undefined ? this.type : type;
    return { props: { className: `${type}` } };
  }
  renderSizeStylesheet(size) {
    size = size === undefined ? this.size : size;
    if(this.isSizeCustom()) {
      this.setStylesheet(`.icon { 
        font-size: ${size}; 
        height: ${size};
        line-height: ${size};
      }`, 'size');
    }
  }

  isSizeCustom() {
    return this.size.indexOf('px') !== -1;
  }
}
Icon.prototype.stylesheet = stylesheet;

const ICON_PRESET = [
  'add', 'add-circle', 'alert', 'animal-rabbit', 
  'arrow-down', 'arrow-left', 'arrow-right',  'arrow-up', 'arrow-sync',
  'bookmark', 'caret-down', 'caret-left', 'caret-right', 'caret-up',
  'checkmark', 'checkmark-circle', 'copy', 'dismiss', 'dismiss-circle',
  'error-circle', 'flash', 'globe', 'heart', 'home', 'info',
  'leaf-one', 'more-vertical', 'navigation', 'search', 'settings',
  'share', 'star', 'star-emphasis', 'subtract', 'subtract-circle',
  'text-quote', 'timer', 'toggle-left', 'toggle-right',
  'weather-moon', 'weather-sunny'
];
export function getIconPresetRegExp() {
  return new RegExp(
    ICON_PRESET.map(icon => `^${icon}$`)
    .concat(ICON_PRESET.map(icon => `^${icon}-filled$`))
    .join('|')
  );
}

export default Icon;