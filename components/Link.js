import DOM from "./util/DOM.js";
const stylesheet=`
	a{
		color:#222222;text-decoration:none;
	}
	a:hover, a:active{
		color:#0077cc;
	}
`;
class Link extends HTMLElement{
	constructor(){
		super();
		const shadowRoot=this.attachShadow({mode:"closed"});
		DOM.create("style", {props:{textContent:stylesheet}}, shadowRoot);
		const attrs={};
		for(let i=0;i<this.attributes.length;i++){
			attrs[this.attributes[i].name]=this.attributes[i].value;
		}
		const props={};
		if(this.firstChild instanceof Text){
			props.textContent=this.textContent;
		}
		const anchor=DOM.create("a", {props:props, attrs:attrs}, shadowRoot);
		if(this.firstChild instanceof Element){
			anchor.appendChild(this.firstChild);
		}
	}
}
export default Link;