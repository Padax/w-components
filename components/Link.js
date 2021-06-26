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
		const prps={
			href:this.getAttribute("href")
		};
		if(this.firstChild instanceof Text){
			prps.textContent=this.textContent;
		}
		if(this.getAttribute("target")!==null){
			prps.target=this.getAttribute("target");
		}
		const anchor=DOM.create("a", {prps:prps}, shadowRoot);
		if(this.firstChild instanceof Element){
			anchor.appendChild(this.firstChild);
		}
	}
}
export default Link;