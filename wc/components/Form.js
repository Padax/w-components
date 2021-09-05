import WComponent, { DOM, AttributeParser } from "../WComponent.js";

const stylesheet=`
`;

class Form extends WComponent{
  static attributes = {
    name: { name: 'name' },
    action: { name: 'action' },
    method: { name: 'method' }
  };
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }

  constructor() {
    super();
    this.bindFormAccess();
    this.bindFormElementAccess();
    this.bindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const form = this.shadowRoot.querySelector('form');
    const value = this.getAttributeParserByName(name)(newValue, this.constructor.attributes[name]);
    form[name] = value;

    if(name === this.constructor.attributes.name.name) {
      this.bindFormAccess(oldValue);
    }
  }
  bindEvents() {
    // Re-bind form access on slot change
    const slot = this.shadowRoot.querySelector('slot');
    slot.addEventListener('slotchange', () => this.bindFormAccess());
  }
  /**
   * Bind direct form access from document by name.
   */
  bindFormAccess(oldValue) {
    if(typeof oldValue === 'string') {  // Clean old assignment
      document[oldValue] = undefined;
    }
    if(typeof this.name === 'string') {
      document[this.name] = this;
    }
  }
  /**
   * Dynamically add getters & setters for form elements to get direct access by name.
   */
  bindFormElementAccess() {
    // Bind direct form elemnt access from form by name
    this.querySelectorAll(FORM_ELEMENT_TYPES).forEach(elem => {
      if(typeof elem.name === 'string' 
        && !Object.getOwnPropertyDescriptor(this, elem.name)) {
        // Dynamically add getter if there is none defined.
        Object.defineProperty(this, elem.name, {
          get: () => {
            const list = Array.from(this.querySelectorAll(`[name='${elem.name}']`));
            if(list.length > 1) {
              const value = list.filter(item => item.checked).map(item => item.value);
              list.value = value.length === 1 ? value[0] : value;
              return list;
            }
            return list.length === 0 ? undefined : list[0];
          }
        });
      }
    });
  }
  render() {
    const attrs = { 
      name: this.name,
      action: this.action, 
      method: this.method 
    };
    const form = DOM.create('form', { attrs }, this.shadowRoot);
    
    DOM.create('slot', {}, form);
  }

  /**
   * Get form data.
   * @returns {FormData}
   */
  get data() { 
    const formData = new FormData();
    const elements = Array.from(this.querySelectorAll(FORM_ELEMENT_TYPES));
    elements.forEach(elem => {
      if(typeof elem.name === 'string' && elem.value !== null && elem.value !== undefined) {
        if((elem.type === 'checkbox' || elem.type === 'radio') && !elem.checked) {
          // Exclude unchecked checkbox & radio
          return;
        }
        const existingValue = formData.get(elem.name);
        if(existingValue === null) {
          formData.set(elem.name, elem.value);
        } else if(Array.isArray(existingValue)) {
          existingValue.push(elem.value);
        } else {
          formData.set(elem.name, [existingValue, elem.value]);
        }
      }
    });
    return formData;
  }

}
Form.prototype.stylesheet=stylesheet;

const FORM_ELEMENT_TYPES = [
  'input', 'select', 'textarea',
  'w-checkbox', 'w-radio'
];

export default Form;