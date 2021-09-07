import DOM from "./util/DOM.js";
import Nav from "./components/layout/Nav.js";
import NavPart from "./components/layout/NavPart.js";
import Grid from "./components/layout/Grid.js";
import Section from "./components/layout/Section.js";
import Button from "./components/Button.js";
import Dialog from "./components/Dialog.js";
import Calendar from "./components/Calendar.js";
import Heading from "./components/Heading.js";
import DisplayHeading from "./components/DisplayHeading.js";
import Quote from "./components/Quote.js";
import List from "./components/List.js";
import ListItem from "./components/ListItem.js";
import Code from "./components/Code.js";
import CheckBox from "./components/checkable/Checkbox.js";
import Radio from "./components/checkable/Radio.js";
import Form from "./components/Form.js";
import SPALink from "./components/spa/SPALink.js";
import SPAPage from "./components/spa/SPAPage.js";

const wc={
  init:function(prefix="w"){
    window.prefix=prefix;
    this.initTheme();

    defineCustomElement(prefix, 'nav', Nav);
    defineCustomElement(prefix, 'nav-part', NavPart);
    defineCustomElement(prefix, 'grid', Grid);
    defineCustomElement(prefix, 'section', Section);
    defineCustomElement(prefix, 'button', Button);
    defineCustomElement(prefix, 'dialog', Dialog);
    defineCustomElement(prefix, 'calendar', Calendar);
    defineCustomElement(prefix, 'heading', Heading);
    defineCustomElement(prefix, 'display-heading', DisplayHeading);
    defineCustomElement(prefix, 'quote', Quote);
    defineCustomElement(prefix, 'list', List);
    defineCustomElement(prefix, 'li', ListItem);
    defineCustomElement(prefix, 'code', Code);
    defineCustomElement(prefix, 'checkbox', CheckBox);
    defineCustomElement(prefix, 'radio', Radio);
    defineCustomElement(prefix, 'form', Form);
    defineCustomElement(prefix, 'spa-link', SPALink);
    defineCustomElement(prefix, 'spa-page', SPAPage);
  },
  initTheme:function(){
    const head=document.querySelector("head");
    DOM.create("link", {props:{
      rel:"stylesheet", type:"text/css", href:"wc/theme/light.css"
    }}, head);
  }
};

function defineCustomElement(prefix, name, element) {
  const tag = `${prefix}-${name}`;
  if(customElements.get(tag)) {
    console.error(`Custom Element ${tag} has been defined.`);
  } else {
    customElements.define(tag, element);
  }
}

export default wc;