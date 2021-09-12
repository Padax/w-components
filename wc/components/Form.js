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
  
  /**
   * Get form data.
   * @returns {FormData}
   */
   get data() { 
    const formData = new FormData();
    const elements = Array.from(this.querySelectorAll(FORM_ELEMENT_TYPES));
    elements.forEach(elem => {
      // Exclude elements with invalid name or value
      if(typeof elem.name !== 'string' || typeof elem.value !== 'string') { return; }
      // Exclude unchecked checkbox & radio
      if(elem.type === 'checkbox' && !elem.checked) { return; }
      if(elem.type === 'radio' && !elem.checked) { return; }

      const existingValue = formData.get(elem.name);
      if(existingValue === null) {
        formData.set(elem.name, elem.value);
      } else if(Array.isArray(existingValue)) {
        existingValue.push(elem.value);
      } else {
        formData.set(elem.name, [existingValue, elem.value]);
      }
    });
    return formData;
  }

  constructor() {
    super();
    this.bindFormAccess();
    this.bindFormElementAccess();
    this.bindEvents();
  }

  update({ name, oldValue, newValue } = {}) {
    const form = this.shadowRoot.querySelector('form');
    const value = this.getAttributeParserByName(name)(newValue, this.constructor.attributes[name]);
    form[name] = value;

    if(name === this.constructor.attributes.name.name) {
      this.bindFormAccess(oldValue);
    }
  }
  bindEvents() {
    this.events = {
      submit: new Event('submit')
    };

    // Re-bind form element access on slot change
    const slot = this.shadowRoot.querySelector('slot');
    slot.addEventListener('slotchange', () => this.bindFormElementAccess());

    // Bind submit event on submit button click
    const submitBtn = this.querySelector('input[type="submit"], button[type="submit"]');
    submitBtn.addEventListener('click', this.submitHandler);

    // Bind radio click callback for name group control
    this.querySelectorAll('w-radio').forEach(radio => {
      radio.addEventListener('change', this.radioChangeCallback);
    });
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
    this.querySelectorAll(FORM_ELEMENT_TYPES).forEach(elem => {
      // Exclude elements with invalid name
      if(typeof elem.name !== 'string') { return; }
      // Exclude elements which getters are already set
      if(Object.getOwnPropertyDescriptor(this, elem.name)) { return; }

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
    });
  }
  init() {
    const attrs = { 
      name: this.name,
      action: this.action, 
      method: this.method 
    };
    const form = DOM.create('form', { attrs }, this.shadowRoot);
    
    DOM.create('slot', {}, form);
  }

  radioChangeCallback = e => {
    const radio = e.target;
    if(typeof radio.name !== 'string' || radio.disabled) { return; }

    const radios = Array.from(this.querySelectorAll(`w-radio[name='${radio.name}']`));
    radios.forEach(r => {
      if(!r.equals(radio)) {
        r.checked = false;
      }
    });
  }
  submitHandler = e => {
    this.dispatchEvent(this.events.submit);
    this.shadowRoot.querySelector('form').submit();
  }

}
Form.prototype.stylesheet=stylesheet;

const FORM_ELEMENT_TYPES = [
  'input', 'select', 'textarea',
  'w-checkbox', 'w-radio'
];

export default Form;