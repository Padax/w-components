import WCComponent, { DOM, PropParser } from "../WCComponent.js";
const stylesheet = `
`;
class Code extends WCComponent{
  constructor(extendStylesheet){
    super(typeof extendStylesheet === 'string' ? extendStylesheet : stylesheet);
  }
  static defaultValues = {
    block: false
  };

  render() {
    const block = PropParser.parseBoolProp(
      this.getAttribute('block'), this.getDefaultValueByName('block')
    );
    const props = {
      textContent: this.textContent
    };

    let container = this.shadowRoot;
    if(block) {
      container = DOM.create('pre', {}, this.shadowRoot);
    }
    DOM.create('code', { props }, container);
  }
}
export default Code;