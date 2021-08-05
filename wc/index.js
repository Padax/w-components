import DOM from "./util/DOM.js";
import Nav from "./components/Nav.js";
import Button from "./components/Button.js";
import Dialog from "./components/Dialog.js";
import Calendar from "./components/Calendar.js";
import Heading from "./components/Heading.js";
import DisplayHeading from "./components/DisplayHeading.js";
import Quote from "./components/Quote.js";
import List from "./components/List.js";
import Code from "./components/Code.js";
import CheckBox from "./components/Checkable/Checkbox.js";
import Radio from "./components/Checkable/Radio.js";
const wc={
  init:function(prefix="wc"){
    this.initTheme();
    window.customElements.define(prefix+"-nav", Nav);
    window.customElements.define(prefix+"-button", Button);
    window.customElements.define(prefix+"-dialog", Dialog);
    window.customElements.define(prefix+"-calendar", Calendar);
    window.customElements.define(prefix+"-heading", Heading);
    window.customElements.define(prefix+"-display-heading", DisplayHeading);
    window.customElements.define(prefix+"-quote", Quote);
    window.customElements.define(prefix+"-list", List);
    window.customElements.define(prefix+"-code", Code);
    window.customElements.define(prefix+"-checkbox", CheckBox);
    window.customElements.define(prefix+"-radio", Radio);
  },
  initTheme:function(){
    DOM.create("link", {props:{
      rel:"stylesheet", type:"text/css", href:"wc/theme/light.css"
    }}, document.querySelector("head"));
  }
};
export default wc;