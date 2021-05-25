import DOM from "./util/DOM.js";
const stylesheet=`
	.btn{
		display:inline-block;padding:5px 10px;
		background-color:#0099e0;color:#eeeeee;
		padding:6px 10px;
		cursor:pointer;transition:background-color 0.5s;
	}
	.btn:hover, .btn:active{
		background-color:#0077cc;
	}
`;
class Button extends HTMLElement{
	constructor(){
		super();
		this.attachShadow({mode:"open"});
		DOM.create("style", {prps:{textContent:stylesheet}}, this.shadowRoot);
		DOM.create("div", {prps:{className:"btn", textContent:this.textContent}}, this.shadowRoot);
	}
}
export default Button;