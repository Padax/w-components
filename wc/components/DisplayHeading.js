import Heading from "./Heading.js";
const stylesheet = `
  :host {
    display: block;
  }
  h1 { 
    font-size: 5.5rem;
    line-height: calc(5.5rem * var(--line-height-normal-ratio)); 
    margin-top: 0.318em; margin-bottom: 0.318em;
  }
  h2 { 
    font-size: 5rem;
    line-height: calc(5rem * var(--line-height-normal-ratio)); 
    margin-top: 0.3em; margin-bottom: 0.3em;
  }
  h3 { 
    font-size: 4.5rem;
    line-height: calc(4.5rem * var(--line-height-normal-ratio)); 
    margin-top: 0.278em; margin-bottom: 0.278em;
  }
  h4 { 
    font-size: 4rem;
    line-height: calc(4rem * var(--line-height-normal-ratio)); 
    margin-top: 0.25em; margin-bottom: 0.25em;
  }
  h5 { 
    font-size: 3.5rem; 
    line-height: calc(3.5rem * var(--line-height-normal-ratio)); 
    margin-top: 0.214em; margin-bottom: 0.214em;
  }
  h6 { 
    font-size: 3rem; 
    line-height: calc(3rem * var(--line-height-normal-ratio)); 
    margin-top: 0.208em; margin-bottom: 0.208em;
  }
  .heading { 
    font-weight: var(--font-weight-light);
  }
  .underlined { 
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--color-gray-20);
  }
`;
class DisplayHeading extends Heading{
  constructor(){
    super();
  }
}
DisplayHeading.prototype.stylesheet=stylesheet;
export default DisplayHeading;