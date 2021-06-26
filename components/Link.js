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
		DOM.create("style", {prps:{textContent:stylesheet}}, shadowRoot);
		const atrs={};
		for(let i=0;i<this.attributes.length;i++){
			atrs[this.attributes[i].name]=this.attributes[i].value;
		}
		const prps={};
		if(this.firstChild instanceof Text){
			prps.textContent=this.textContent;
		}
		const anchor=DOM.create("a", {prps:prps, atrs:atrs}, shadowRoot);
		if(this.firstChild instanceof Element){
			anchor.appendChild(this.firstChild);
		}
	}
}
export default Link;