import WComponent, { DOM, PropParser } from "../WComponent.js";
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';

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
    hljs.registerLanguage('javascript', javascript);

    this.shadowRoot.innerHTML = hljs.highlight(this.textContent, {language: 'javascript'}).value;
    // const block = PropParser.parseBoolProp(
    //   this.getAttribute('block'), this.getDefaultValueByName('block')
    // );
    // const props = {
    //   textContent: this.textContent,
    //   className: 'language-javascript'
    // };

    // let container = this.shadowRoot;
    // if(block) {
    //   container = DOM.create('pre', {}, this.shadowRoot);
    // }
    // DOM.create('code', { props }, container);
  }
}
export default Code;