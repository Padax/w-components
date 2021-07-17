import Heading from "./Heading.js";
const stylesheet = `
  h1 { 
    font-size: 5.5rem;
    line-height: calc(5.5rem * var(--line-height-normal-ratio)); 
  }
  h2 { 
    font-size: 5rem;
    line-height: calc(5rem * var(--line-height-normal-ratio)); 
  }
  h3 { 
    font-size: 4.5rem;
    line-height: calc(4.5rem * var(--line-height-normal-ratio)); 
  }
  h4 { 
    font-size: 4rem;
    line-height: calc(4rem * var(--line-height-normal-ratio)); 
  }
  h5 { 
    font-size: 3.5rem; 
    line-height: calc(3.5rem * var(--line-height-normal-ratio)); 
  }
  h6 { 
    font-size: 3rem; 
    line-height: calc(3rem * var(--line-height-normal-ratio)); 
  }
  .heading { 
    font-weight: var(--font-weight-light);
    margin: 0; 
  }
  .underlined { 
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--color-gray-20);
  }
`;
class DisplayHeading extends Heading{
  constructor(){
    super(stylesheet);
  }
}
export default DisplayHeading;