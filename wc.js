import Nav from "./components/Nav.js";
import Link from "./components/Link.js";
import Button from "./components/Button.js";
import Dialog from "./components/Dialog.js";
import Calendar from "./components/Calendar.js";
const wc={
	init:function(prefix="wc"){
		window.customElements.define(prefix+"-nav", Nav);
		window.customElements.define(prefix+"-link", Link);
		window.customElements.define(prefix+"-button", Button);
		window.customElements.define(prefix+"-dialog", Dialog);
		window.customElements.define(prefix+"-calendar", Calendar);
	}
};
export default wc;