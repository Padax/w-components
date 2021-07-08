import DOM from "./util/DOM.js";
const stylesheet=`
  button{
    font-size:1rem;
    display:inline-block;
    border-width:0px;border-color:var(--primary-color-60);border-style:solid;
    background-color:var(--primary-color-60);color:#eeeeee;
    padding:8px 10px;
    cursor:pointer;transition:background-color 0.5s;
  }
  button:hover, button:active{
    background-color:var(--primary-color-40);
  }
  button.critical{
    background-color:var(--critical-color-60);;
    border-color:var(--critical-color-60);;
  }
  button.critical:hover, button.critical:active{
    background-color:var(--critical-color-40);;
  }
  /* disabled */
  button:disabled{
    opacity:0.5;
  }
  button:disabled:hover, button:disabled:active{
    background-color:var(--primary-color-60);
  }
  button.critical:disabled:hover, button.critical:disabled:active{
    background-color:var(--critical-color-60);;
  }
  /* outline */
  button.outline-primary{
    background-color:transparent;
    border-color:var(--primary-color-60);
    border-width:1px;
    color:var(--primary-color-60);
  }
  button.outline-primary:hover, button.outline-primary:active{
    background-color:var(--primary-color-40);
    color:#eeeeee;
  }
  button.outline-critical{
    background-color:transparent;
    border-color:var(--critical-color-40);;
    border-width:1px;
    color:var(--critical-color-60);;
  }
  button.outline-critical:hover, button.outline-critical:active{
    background-color:var(--critical-color-40);;
    color:#eeeeee;
  }
  /* size */
  button.large{
    font-size:1.5rem;
    padding:10px 15px;
  }
  /* block */
  button.block{
    display:block;width:100%;
  }
`;
class Button extends HTMLElement{
  constructor(){
    super();
    const shadowRoot=this.attachShadow({mode:"closed"});
    DOM.create("style", {props:{textContent:stylesheet}}, shadowRoot);
    // prepare all attributes
    const attrs={};
    for(let i=0;i<this.attributes.length;i++){
      attrs[this.attributes[i].name]=this.attributes[i].value;
    }
    DOM.create("button", {props:{textContent:this.textContent}, attrs:attrs}, shadowRoot);
  }
}
export default Button;