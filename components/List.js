import DOM from "./util/DOM.js";
const stylesheet=`
	:host{
		
	}
`;
class List extends HTMLElement{
	constructor(){
		super();
		const shadowRoot=this.attachShadow({mode:"closed"});
		DOM.create("style", {prps:{textContent:stylesheet}}, shadowRoot);
		const prps={
			href:this.getAttribute("href"),
			textContent:this.textContent
		};
		if(this.getAttribute("target")!==null){
			prps.target=this.getAttribute("target");
		}
		DOM.create("a", {prps:prps}, shadowRoot);
	}
}
export default Link;