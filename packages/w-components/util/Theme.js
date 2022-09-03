import DOM from './DOM.js';
import DarkThemeStylesheet from "../theme/dark.css.js";
import LightThemeStylesheet from "../theme/light.css.js";

const Theme = {
  bindChangedObserver(callback) {
    const handler = mutation => {
      const theme = this.getCurrentName();
      if(mutation[0].attributeName === ATTR_NAME && mutation[0].oldValue !== theme) {
        callback(theme);
      }
    };
    const observer = new MutationObserver(handler);
    observer.observe(document.head, { attributes: true, attributeOldValue: true });
  },
  createElement(stylesheet) {
    DOM.create("style", {props:{
      id: STYLESHEET_ID, textContent: stylesheet
    }}, document.head);
  },
  getCurrentName() {
    return document.head.getAttribute(ATTR_NAME);
  },
  getElement() {
    return document.head.querySelector(`#${STYLESHEET_ID}`);
  },
  setElement(name) {
    const element = this.getElement();
    if(element){
      element.remove();
    }

    let stylesheet = LightThemeStylesheet;
    if(name === DARK_NAME){
      stylesheet=DarkThemeStylesheet;
    }
    this.createElement(stylesheet);
    document.head.setAttribute(ATTR_NAME, name)
    window.wconfig.theme = name;
  }
};

const STYLESHEET_ID = 'w-theme-stylesheet';
const ATTR_NAME = 'theme';
const LIGHT_NAME = 'light';
const DARK_NAME = 'dark';

export default Theme;
export { 
  STYLESHEET_ID as THEME_STYLESHEET_ID, ATTR_NAME as THEME_ATTR_NAME,
  LIGHT_NAME as THEME_LIGHT_NAME, DARK_NAME as THEME_DARK_NAME
};