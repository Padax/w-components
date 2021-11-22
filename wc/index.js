import DOM from "./util/DOM.js";
import Nav from "./components/layout/nav/Nav.js";
import NavPart from "./components/layout/nav/NavPart.js";
import Grid from "./components/layout/Grid.js";
import Section from "./components/layout/Section.js";
import Hero from "./components/layout/Hero.js";
import Card from "./components/layout/Card.js";
import Button from "./components/button/Button.js";
import IconButton from "./components/button/IconButton.js";
import Dialog from "./components/Dialog.js";
import Calendar from "./components/Calendar.js";
import Heading from "./components/Heading.js";
import DisplayHeading from "./components/DisplayHeading.js";
import Quote from "./components/Quote.js";
import List from "./components/List.js";
import ListItem from "./components/ListItem.js";
import Code from "./components/Code.js";
import Form from "./components/form/Form.js";
import TextInput from "./components/form/TextInput.js";
import TextArea from "./components/form/TextArea.js";
import CheckBox from "./components/form/checkable/Checkbox.js";
import Radio from "./components/form/checkable/Radio.js";
import SPALink from "./components/spa/SPALink.js";
import SPAPage from "./components/spa/SPAPage.js";
import Icon from "./components/Icon.js";
const defaultWConfig={theme:"light", spa:{basename:""}};
const wc={
  init:function(wconfig={}){
    window.wconfig=Object.assign(defaultWConfig, wconfig);
    window.wconfig.prefix='w'; // force prefix to 'w'
    this.initTheme(window.wconfig.theme);

    const prefix=window.wconfig.prefix;
    defineCustomElement(prefix, 'nav', Nav);
    defineCustomElement(prefix, 'nav-part', NavPart);
    defineCustomElement(prefix, 'grid', Grid);
    defineCustomElement(prefix, 'section', Section);
    defineCustomElement(prefix, 'hero', Hero);
    defineCustomElement(prefix, 'card', Card);
    defineCustomElement(prefix, 'button', Button);
    defineCustomElement(prefix, 'icon-button', IconButton);
    defineCustomElement(prefix, 'dialog', Dialog);
    defineCustomElement(prefix, 'calendar', Calendar);
    defineCustomElement(prefix, 'heading', Heading);
    defineCustomElement(prefix, 'display-heading', DisplayHeading);
    defineCustomElement(prefix, 'quote', Quote);
    defineCustomElement(prefix, 'list', List);
    defineCustomElement(prefix, 'li', ListItem);
    defineCustomElement(prefix, 'code', Code);
    defineCustomElement(prefix, 'textinput', TextInput);
    defineCustomElement(prefix, 'textarea', TextArea);
    defineCustomElement(prefix, 'checkbox', CheckBox);
    defineCustomElement(prefix, 'radio', Radio);
    defineCustomElement(prefix, 'form', Form);
    defineCustomElement(prefix, 'spa-link', SPALink);
    defineCustomElement(prefix, 'spa-page', SPAPage);
    defineCustomElement(prefix, 'icon', Icon);
  },
  initTheme:function(name, host="https://padax.github.io/w-components/"){
    const head=document.querySelector("head");
    const id="wc-theme-stylesheet";
    const themeLink=head.querySelector(`#${id}`);
    if(themeLink===null){
      DOM.create("link", {props:{
        rel:"stylesheet", type:"text/css", href:`${host}wc/theme/${name}.css`, id:id
      }}, head);
    }else{
      DOM.modify(themeLink, {props:{href:`${host}wc/theme/${name}.css`}});
    }
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