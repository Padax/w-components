import DOM from "./util/DOM.js";
const stylesheet=`
	button{
		font-size:1rem;
		display:inline-block;
		border-width:0px;border-color:var(--primary-color);border-style:solid;
		background-color:var(--primary-color);color:#eeeeee;
		padding:8px 10px;
		cursor:pointer;transition:background-color 0.5s;
	}
	button:hover, button:active{
		background-color:#140096;
	}
	button.success{
		background-color:#11ae11;
		border-color:#11ae11;
	}
	button.success:hover, button.success:active{
		background-color:#156715;
	}
	/* disabled */
	button:disabled{
		opacity:0.5;
	}
	button:disabled:hover, button:disabled:active{
		background-color:var(--primary-color);
	}
	button.success:disabled:hover, button.success:disabled:active{
		background-color:#11ae11;
	}
	/* outline */
	button.outline-primary{
		background-color:transparent;
		border-color:var(--primary-color);
		border-width:1px;
		color:var(--primary-color);
	}
	button.outline-primary:hover, button.outline-primary:active{
		background-color:#140096;
		color:#eeeeee;
	}
	button.outline-success{
		background-color:transparent;
		border-color:#156715;
		border-width:1px;
		color:#11ae11;
	}
	button.outline-success:hover, button.outline-success:active{
		background-color:#156715;
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
		DOM.create("style", {props:{textContent:document.querySelector("#global-for-local").textContent}}, shadowRoot);
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