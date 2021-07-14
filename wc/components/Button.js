import DOM from "../util/DOM.js";
const stylesheet=`
  button{
    font-family:var(--font-family);
    display:inline-block;box-sizing:border-box;
    font-size:var(--font-size-button);line-height:var(--line-height-button);
    border-width:1px;border-color:var(--color-primary-60);border-style:solid;
    background-color:var(--color-primary-60);color:var(--color-gray-0);
    padding:8px 20px;
    cursor:pointer;transition:background-color 0.5s;
  }
  button:hover{
    background-color:var(--color-primary-40);
  }
  button:active{
    background-color:var(--color-primary-70);
  }
  button.critical{
    background-color:var(--color-critical-60);
    border-color:var(--color-critical-60);
  }
  button.critical:hover{
    background-color:var(--color-critical-40);
  }
  button.critical:active{
    background-color:var(--color-critical-70);
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
  }
  button:disabled:hover, button:disabled:active{
    color:var(--color-gray-30);background-color:var(--color-gray-10);
    border-color:var(--color-gray-10);
  }
  /* size */
  button.large{
    font-size:calc(var(--font-size-button) * 1.2);
    line-height:calc(var(--line-height-button) * 1.2);
    padding:12px 30px;
  }
  button.small{
    font-size:var(--font-size-button);
    line-height:var(--line-height-button);
    padding:4px 16px;
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