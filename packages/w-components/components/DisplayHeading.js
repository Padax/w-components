import { DOM } from "../WComponent.js";
import Heading from "./Heading.js";

const stylesheet = `
  :host {
    display: block;
    font-weight: var(--font-weight-light);
  }
`;
const propStylesheet = {
  LEVEL1: `
    font-size: 5.5rem;
    line-height: calc(5.5rem * var(--line-height-normal-ratio)); 
    margin-top: 0.318em; margin-bottom: 0.318em;
  `,
  LEVEL2: `
    font-size: 5rem;
    line-height: calc(5rem * var(--line-height-normal-ratio)); 
    margin-top: 0.3em; margin-bottom: 0.3em;
  `,
  LEVEL3: ` 
    font-size: 4.5rem;
    line-height: calc(4.5rem * var(--line-height-normal-ratio)); 
    margin-top: 0.278em; margin-bottom: 0.278em;
  `,
  LEVEL4: `
    font-size: 4rem;
    line-height: calc(4rem * var(--line-height-normal-ratio)); 
    margin-top: 0.25em; margin-bottom: 0.25em;
  `,
  LEVEL5: `
    font-size: 3.5rem; 
    line-height: calc(3.5rem * var(--line-height-normal-ratio)); 
    margin-top: 0.214em; margin-bottom: 0.214em;
  `,
  LEVEL6: `
    font-size: 3rem; 
    line-height: calc(3rem * var(--line-height-normal-ratio)); 
    margin-top: 0.208em; margin-bottom: 0.208em;
  `,
  UNDERLINED: `
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--color-gray-20);
  `
};
class DisplayHeading extends Heading{
  static title = 'Display Heading';
  static description = 'General display heading component.';
  static tagName = 'display-heading';

  constructor(){
    super();
  }
}
DisplayHeading.prototype.stylesheet=stylesheet;
DisplayHeading.prototype.propStylesheet=propStylesheet;

DOM.defineCustomElement(DisplayHeading);

export default DisplayHeading;