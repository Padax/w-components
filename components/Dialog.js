import DOM from "./util/DOM.js";
class Dialog extends HTMLElement{
    static get observedAttributes(){
        return ["open"];
    }
	constructor(){
		super();
		this.attachShadow({mode:"open"});
		this.dialog=DOM.create("div", {prps:{className:"dialog"}});
		this.head=DOM.create("slot", {prps:{name:"head"}}, this.dialog);
		this.main=DOM.create("slot", {prps:{name:"main"}}, this.dialog);
		this.stylesheet=DOM.create("style", {prps:{textContent:`
			.dialog{
				width:300px;box-shadow:0px 0px 3px #888888;
				position:fixed;left:calc(50% - 150px);top:100px;
			}
			.dialog>::slotted(.head){
				background-color:#333333;color:#ffffff;padding:10px;
			}
			.dialog>::slotted(.main){
				padding:10px;
			}
		`}}, this.shadowRoot);
	}
	connectedCallback(){}
	attributeChangedCallback(name, oldValue, newValue){
		if(name==="open"){
			if(newValue==="true"){
				this.shadowRoot.appendChild(this.dialog);
			}else{
				this.shadowRoot.removeChild(this.dialog);
			}
		}
	}
}
export default Dialog;