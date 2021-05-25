import DOM from "./util/DOM.js";
const stylesheet=`
	.dialog{
		width:300px;
		position:fixed;left:calc(50% - 150px);top:100px;
		z-index:10;
	}
	.dialog>::slotted(.head){
		background-color:#333333;color:#ffffff;padding:10px;
	}
	.dialog>::slotted(.main){
		padding:10px;background-color:#dddddd;
	}
`;
class Dialog extends HTMLElement{
    static get observedAttributes(){
        return ["open"];
    }
	constructor(){
		super();
		this.attachShadow({mode:"open"});
		DOM.create("style", {prps:{textContent:stylesheet}}, this.shadowRoot);
		this.dialog=DOM.create("div", {prps:{className:"dialog"}});
		this.head=DOM.create("slot", {prps:{name:"head"}}, this.dialog);
		this.main=DOM.create("slot", {prps:{name:"main"}}, this.dialog);
	}
	connectedCallback(){}
	attributeChangedCallback(name, oldValue, newValue){
		if(name==="open"){
			if(newValue==="true"){
				this.shadowRoot.appendChild(this.dialog);
			}else{
				this.dialog.remove();
			}
		}
	}
}
export default Dialog;