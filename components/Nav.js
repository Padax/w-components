import DOM from "./util/DOM.js";
const stylesheet=`
	:host{
		padding:15px;
		position:sticky;top:0px;left:0px;
		background-color:#ffffff;
	}
`;
class Nav extends HTMLElement{
	constructor(){
		super();
		this.attachShadow({mode:"open"});
		DOM.create("style", {prps:{textContent:stylesheet}}, this.shadowRoot);
		DOM.create("slot", {prps:{
			name:"left"
		}}, this.shadowRoot);
		DOM.create("slot", {prps:{
			name:"center"
		}}, this.shadowRoot);
		DOM.create("slot", {prps:{
			name:"right"
		}}, this.shadowRoot);
	}
}
export default Nav;