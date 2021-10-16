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
  .icon.alert:before { content: '\\fb21'; }
  .icon.animal-rabbit:before { content: '\\fcbb'; }
  .icon.arrow-down:before { content: '\\f147'; }
  .icon.arrow-left:before { content: '\\f184'; }
  .icon.arrow-right:before { content: '\\fb6d'; }
  .icon.arrow-up:before { content: '\\f1b4'; }
  .icon.arrow-sync:before { content: '\\fea5'; }
  .icon.bookmark:before { content: '\\f1f4'; }
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
  .icon.flash:before { content: '\\fe63'; }
  .icon.globe:before { content: '\\fa16'; }
  .icon.heart:before { content: '\\f478'; }
  .icon.home:before { content: '\\fa25'; }
  .icon.info:before { content: '\\f4a2'; }
  .icon.leaf-one:before { content: '\\fc1b'; }
  .icon.more-vertical:before { content: '\\fd4b'; }
  .icon.navigation:before { content: '\\ffa5'; }
  .icon.search:before { content: '\\fe35'; }
  .icon.settings:before { content: '\\f6a8'; }
  .icon.share:before { content: '\\fb2e'; }
  .icon.sparkle:before { content: '\\101f1'; }
  .icon.star:before { content: '\\f70e'; }
  .icon.subtract:before { content: '\\fc71'; }
  .icon.subtract-circle:before { content: '\\f7a7'; }
  .icon.text-quote:before { content: '\\f800'; }
  .icon.timer:before { content: '\\fae8'; }
  .icon.toggle-left:before { content: '\\faea'; }
  .icon.toggle-right:before { content: '\\f82a'; }
  .icon.weather-moon:before { content: '\\fb0d'; }
  .icon.weather-sunny:before { content: '\\f8a1'; }
  
  span.icon[class*="-filled"] { font-family: var(--icon-font-filled); }
  .icon.add-filled:before { content: '\\f108'; }
  .icon.add-circle-filled:before { content: '\\fcc2'; }
  .icon.alert-filled:before { content: '\\fb29'; }
  .icon.animal-rabbit-filled:before { content: '\\fcc4'; }
  .icon.arrow-down-filled:before { content: '\\f147'; }
  .icon.arrow-left-filled:before { content: '\\f184'; }
  .icon.arrow-right-filled:before { content: '\\fb75'; }
  .icon.arrow-up-filled:before { content: '\\f1b4'; }
  .icon.arrow-sync-filled:before { content: '\\fea9'; }
  .icon.bookmark-filled:before { content: '\\f1f4'; }
  .icon.caret-down-filled:before { content: '\\f260'; }
  .icon.caret-left-filled:before { content: '\\f264'; }
  .icon.caret-right-filled:before { content: '\\f268'; }
  .icon.caret-up-filled:before { content: '\\f966'; }
  .icon.checkmark-filled:before { content: '\\f984'; }
  .icon.checkmark-circle-filled:before { content: '\\f297'; }
  .icon.copy-filled:before { content: '\\f32a'; }
  .icon.dismiss-filled:before { content: '\\f368'; }
  .icon.dismiss-circle-filled:before { content: '\\f36c'; }
  .icon.error-circle-filled:before { content: '\\f3ef'; }
  .icon.flash-filled:before { content: '\\fe67'; }
  .icon.globe-filled:before { content: '\\fa27'; }
  .icon.heart-filled:before { content: '\\f47c'; }
  .icon.home-filled:before { content: '\\fa36'; }
  .icon.info-filled:before { content: '\\f4a9'; }
  .icon.leaf-one-filled:before { content: '\\fc24'; }
  .icon.more-vertical-filled:before { content: '\\fd54'; }
  .icon.navigation-filled:before { content: '\\ffa9'; }
  .icon.search-filled:before { content: '\\fe39'; }
  .icon.settings-filled:before { content: '\\fb61'; }
  .icon.share-filled:before { content: '\\fb36'; }
  .icon.sparkle-filled:before { content: '\\101fd'; }
  .icon.star-filled:before { content: '\\f717'; }
  .icon.subtract-filled:before { content: '\\fc7b'; }
  .icon.subtract-circle-filled:before { content: '\\f7bf'; }
  .icon.text-quote-filled:before { content: '\\f819'; }
  .icon.timer-filled:before { content: '\\faf0'; }
  .icon.toggle-left-filled:before { content: '\\faf2'; }
  .icon.toggle-right-filled:before { content: '\\f843'; }
  .icon.weather-moon-filled:before { content: '\\fb15'; }
  .icon.weather-sunny-filled:before { content: '\\f8b9'; }
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
  'add', 'add-circle', 'alert', 'animal-rabbit', 
  'arrow-down', 'arrow-left', 'arrow-right',  'arrow-up', 'arrow-sync',
  'bookmark', 'caret-down', 'caret-left', 'caret-right', 'caret-up',
  'checkmark', 'checkmark-circle', 'copy', 'dismiss', 'dismiss-circle',
  'error-circle', 'flash', 'globe', 'heart', 'home', 'info',
  'leaf-one', 'more-vertical', 'navigation', 'search', 'settings',
  'share', 'sparkle', 'star', 'subtract', 'subtract-circle',
  'text-quote', 'timer', 'toggle-left', 'toggle-right',
  'weather-moon', 'weather-sunny'
];
function getIconPresetRegExp() {
  return new RegExp(
    ICON_PRESET.map(icon => `^${icon}$`)
    .concat(ICON_PRESET.map(icon => `^${icon}-filled$`))
    .join('|')
  );
}

export default Icon;