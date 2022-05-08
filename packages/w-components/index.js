import DOM from "./util/DOM.js";
import DarkThemeStylesheet from "./theme/dark.css.js";
import LightThemeStylesheet from "./theme/light.css.js";
import * as wComponents from './w-components.js';

const defaultWConfig={theme:"light", spa:{basename:""}};
const wc={
  init: function(wconfig={}){
    window.wconfig=Object.assign(defaultWConfig, wconfig);
    window.wconfig.prefix='w'; // force prefix to 'w'
    
    this.initTheme(window.wconfig.theme);
    this.initComponents(window.wconfig.prefix, window.wconfig.components);
  },
  initComponents: async function(prefix = window.wconfig.prefix, components = {}) {
    if(!components || typeof components !== 'object' || Object.keys(components).length === 0) {
      // Import all
      for(let componentName in wComponents) {
        const c = wComponents[componentName];
        defineCustomElement(prefix, c.tagName, c);
      }
    } else {
      // Import assigned individuals
      // Components should be loaded in our order, not user-difeind order.
      for(let componentName in wComponents) {
        const c = wComponents[componentName];
        if(components[componentName]) {
          defineCustomElement(prefix, c.tagName, c);
        }
      }
    }
  },
  initTheme:function(name){
    const head=document.querySelector("head");
    const id="wc-theme-stylesheet";
    const themeElement=head.querySelector(`#${id}`);
    if(themeElement){
      themeElement.remove();
    }
    let stylesheet;
    if(name==="dark"){
      stylesheet=DarkThemeStylesheet;
    }else{
      stylesheet=LightThemeStylesheet;
    }
    DOM.create("style", {props:{
      id:id, textContent:stylesheet
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
export { wComponents };