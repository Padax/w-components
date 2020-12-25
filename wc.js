import Dialog from "./components/Dialog.js";
const wc={
	init:function(prefix="wc"){
		window.customElements.define(prefix+"-dialog", Dialog);
	}
};
export default wc;