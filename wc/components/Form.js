import WComponent, { DOM } from "../WComponent.js";

const stylesheet=`
  #elementCtn * {
    display: none !important;
  }
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
    this.getValidFormElements().forEach(elem => {
      // Exclude unchecked checkbox & radio
      if(elem.type === 'checkbox' && !elem.checked) { return; }
      if(elem.type === 'radio' && !elem.checked) { return; }

      const existingValue = formData.get(elem.name);
      // Set value if key is null, or append value as an array
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
    this.formElementTypes = getFormElementTypes();
  }

  bindEvents() {
    this.events = {
      submit: new Event('submit')
    };

    // Re-bind form element access on slot change
    this.shadowRoot.querySelector('slot')
      .addEventListener('slotchange', () => this.bindFormElementAccess());

    // Bind text input enter submit
    this.querySelector('input[type="text"]')
      .addEventListener('keypress', this.submitHandler);

    // Bind submit event on submit button click
    this.querySelector('input[type="submit"], button[type="submit"]')
      .addEventListener('click', this.submitHandler);

    // Bind radio click callback for name group control
    this.querySelectorAll(`${window.wconfig.prefix}-radio`).forEach(radio => {
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
    this.getValidFormElements().forEach(elem => {
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
  /**
   * Get valid form elements for submit, ie. has a name & is not disabled.
   * @returns [Array<Node>]
   */
  getValidFormElements() {
    return Array.from(this.querySelectorAll(this.formElementTypes))
      .filter(elem => typeof elem.name === 'string' && elem.disabled !== true);
  }
  init() {
    const attrs = { 
      name: this.name,
      action: this.action, 
      method: this.method 
    };

    const form = DOM.create('form', { attrs }, this.shadowRoot);
    DOM.create('slot', {}, form);
    // Container for form element injection for submit
    DOM.create('div', { attrs: { id: 'elementCtn' } }, form);
  }
  /**
   * Clone all valid form elements into inner form for submit.
   */
  injectFormElements() {
    const formElements = this.getValidFormElements().map(elem => {
      if(elem instanceof HTMLFormElement) { // HTML native element
        return elem.cloneNode(true);
      } else {  // W-Components
        const attrs = {
          type: elem.type,
          name: elem.name,
          value: elem.value
        };
        if(elem.checked) {
          attrs.checked = elem.checked;
        }
        return DOM.create('input', { attrs })
      }
    });

    // Replace the content with the current valid form elements
    const elementCtn = this.shadowRoot.querySelector('#elementCtn');
    elementCtn.replaceChildren(...formElements);
  }
  update({ name, oldValue, newValue } = {}) {
    const form = this.shadowRoot.querySelector('form');
    const value = this.getAttributeParserByName(name)(newValue, this.constructor.attributes[name]);
    form[name] = value;

    // Re-bind form access
    if(name === this.constructor.attributes.name.name) {
      this.bindFormAccess(oldValue);
    }
  }

  /**
   * Change event handler for w-radio name group value set.
   */
  radioChangeCallback = e => {
    const radio = e.target;
    if(typeof radio.name !== 'string' || radio.disabled) { return; }

    const radios = Array.from(this.querySelectorAll(`${window.wconfig.prefix}-radio[name='${radio.name}']`));
    // Compare each w-radio in the same group, uncheck all which are not the current event target.
    radios.forEach(r => {
      if(!r.equals(radio)) {
        r.checked = false;
      }
    });
  }
  submitHandler = e => {
    this.injectFormElements();
    this.dispatchEvent(this.events.submit);
    this.shadowRoot.querySelector('form').submit();
  }

}
Form.prototype.stylesheet=stylesheet;

function getFormElementTypes() {
  let types = [ 'input', 'select', 'textarea' ];
  if(window.wconfig && typeof window.wconfig.prefix === 'string') {
    types.push(`${window.wconfig.prefix}-checkbox`);
    types.push(`${window.wconfig.prefix}-radio`);
  }
  
  return types;
}

export default Form;