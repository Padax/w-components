import WComponent, { DOM, AttributeParser } from "../WComponent.js";
//import hljs from '../../modules/highlight/highlight.min.js';

const stylesheet = `
`;
class Code extends WComponent{
  constructor(){
    super(stylesheet);
  }
  static defaultValues = {
    lang: 'javascript'
  };

  render() {
    const block = AttributeParser.parseBoolAttr(
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
  componentDidRender() {
    //hljs.highlightElement(document.querySelector('code'));
  }
}
export default Code;