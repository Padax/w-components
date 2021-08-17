import DOM from "./util/DOM.js";
import Nav from "./components/Nav.js";
import NavPart from "./components/NavPart.js";
import Button from "./components/Button.js";
import Dialog from "./components/Dialog.js";
import Calendar from "./components/Calendar.js";
import Heading from "./components/Heading.js";
import DisplayHeading from "./components/DisplayHeading.js";
import Quote from "./components/Quote.js";
import List from "./components/List.js";
import ListItem from "./components/ListItem.js";
import Code from "./components/Code.js";
import Checkbox from "./components/WInputComponent/Checkable/Checkbox.js";
import Radio from "./components/WInputComponent/Checkable/Radio.js";
import SPALink from "./components/spa/SPALink.js";
import SPAPage from "./components/spa/SPAPage.js";

import sharedStylesheet from "./theme/light.js";

const wc={
  init:function(prefix="w"){
    window.prefix=prefix;
    this.initTheme();

    defineCustomElement(prefix, 'nav', Nav);
    defineCustomElement(prefix, 'nav-part', NavPart);
    defineCustomElement(prefix, 'button', Button);
    defineCustomElement(prefix, 'dialog', Dialog);
    defineCustomElement(prefix, 'calendar', Calendar);
    defineCustomElement(prefix, 'heading', Heading);
    defineCustomElement(prefix, 'display-heading', DisplayHeading);
    defineCustomElement(prefix, 'quote', Quote);
    defineCustomElement(prefix, 'list', List);
    defineCustomElement(prefix, 'li', ListItem);
    defineCustomElement(prefix, 'code', Code);
    defineCustomElement(prefix, 'checkbox', Checkbox, 'input');
    defineCustomElement(prefix, 'radio', Radio, 'input');
    defineCustomElement(prefix, 'spa-link', SPALink);
    defineCustomElement(prefix, 'spa-page', SPAPage);
  },
  initTheme:function(){
    const head=document.querySelector("head");
    DOM.create("link", {props:{
      rel:"stylesheet", type:"text/css", href:"wc/theme/light.css"
    }}, head);
    DOM.create('style', { props: { textContent: sharedStylesheet } }, head);
  }
};

function defineCustomElement(prefix, name, element, extendElement) {
  const tag = `${prefix}-${name}`;
  if(customElements.get(tag)) {
    console.error(`Custom Element ${tag} has been defined.`);
  } else {
    const options = typeof extendElement === 'string' ? { extends: extendElement } : undefined;
    customElements.define(tag, element, options);
  }
}

export default wc;