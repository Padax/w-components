import DOM from "../util/DOM.js";
const stylesheet=`
  button{
    display:inline-block;vertical-align:middle;box-sizing:border-box;
    font-family:var(--font-family);
    font-size:var(--font-size-normal);line-height:var(--line-height-normal);
    border-width:1px;border-color:var(--color-primary-60);border-style:solid;border-radius:4px;
    background-color:var(--color-primary-60);color:var(--color-gray-0);
    padding:4px 20px;
    cursor:pointer;
    cursor:pointer;transition:background-color 0.1s, border-color 0.1s;
  }
  button:hover{
    background-color:var(--color-primary-40);
    border-color:var(--color-primary-40);
  }
  button:active{
    background-color:var(--color-primary-70);
    border-color:var(--color-primary-70);
  }
  button.critical{
    background-color:var(--color-critical-60);
    border-color:var(--color-critical-60);
  }
  button.critical:hover{
    background-color:var(--color-critical-40);
    border-color:var(--color-critical-40);
  }
  button.critical:active{
    background-color:var(--color-critical-70);
    border-color:var(--color-critical-70);
  }
  /* outline */
  button.outline-primary{
    background-color:transparent;
    border-color:var(--color-primary-70);
    border-width:1px;
    color:var(--color-primary-70);
  }
  button.outline-primary:hover{
    background-color:var(--color-primary-10);
  }
  button.outline-primary:active{
    background-color:var(--color-primary-20);
  }
  button.outline-critical{
    background-color:transparent;
    border-color:var(--color-critical-70);
    border-width:1px;
    color:var(--color-critical-70);
  }
  button.outline-critical:hover{
    background-color:var(--color-critical-10);
  }
  button.outline-critical:active{
    background-color:var(--color-critical-20);
  }
  /* disabled */
  button:disabled{
    color:var(--color-gray-30);background-color:var(--color-gray-10);
    border-color:var(--color-gray-10);
    cursor:default;
  }
  button:disabled:hover, button:disabled:active{
    color:var(--color-gray-30);background-color:var(--color-gray-10);
    border-color:var(--color-gray-10);
  }
  /* size */
  button.xlarge{
    font-size:calc(var(--font-size-normal) * 1.5);
    line-height:calc(var(--line-height-normal) * 1.5);
    padding:6px 32px;
  }
  button.large{
    font-size:calc(var(--font-size-normal) * 1.25);
    line-height:calc(var(--line-height-normal) * 1.25);
    padding:4px 24px;
  }
  button.small{
    font-size:calc(var(--font-size-normal) * 0.875);
    line-height:calc(var(--line-height-normal) * 0.875);
    padding:4px 12px;
  }
  /* block */
  button.block{
    display:block;width:100%;
  }
`;
class Button extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:"open"});
    DOM.create("style", {props:{textContent:stylesheet}}, this.shadowRoot);
    // prepare all attributes
    const attrs={};
    for(let i=0;i<this.attributes.length;i++){
      attrs[this.attributes[i].name]=this.attributes[i].value;
    }
    DOM.create("button", {props:{textContent:this.textContent}, attrs:attrs}, this.shadowRoot);
  }
}
export default Button;