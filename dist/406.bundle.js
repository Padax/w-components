(self.webpackChunk_padax_w_components_project=self.webpackChunk_padax_w_components_project||[]).push([[406],{1835:(t,e,r)=>{r.d(e,{zu:()=>s,SO:()=>a.Z,ZP:()=>h,OE:()=>c});var s={};r.r(s),r.d(s,{parseBoolAttr:()=>n,parseIntAttr:()=>i,parseStringAttr:()=>o});var a=r(5359);function i(t,e,r,s){return t=parseInt(t),isNaN(t)||!isNaN(r)&&t<r||!isNaN(s)&&t>s?e:t}function n(t,e){return"true"===t||""===t||"false"!==t&&!!e}function o(t,e,r){return"string"!=typeof t?e:t.match(r)?t:e}class u extends HTMLElement{static getObservedAttributes(t){const e=Object.keys(t).filter((e=>!1!==t[e].observed)).map((e=>t[e].name));return Array.isArray(e)?e:[]}constructor(){super(),this.createGettersAndSetters(),this.attachShadow({mode:"open"}),this.setStylesheet(this.stylesheet),this.init(),this.key=(new Date).getTime()+Math.random()}attributeChangedCallback(t,e,r){e!==r&&this.key&&this.hasDefinedAttribute(t)&&this.update({name:t,oldValue:e,newValue:r})}createGettersAndSetters(){Array.isArray(this.constructor.observedAttributes)&&this.constructor.observedAttributes.forEach((t=>{Object.defineProperty(this,t,{get:()=>this.parseAttributeValueByName(t,this.getAttribute(t)),set:e=>{this.setAttribute(t,this.parseAttributeValueByName(t,`${e}`))}})}))}equals(t){return this.key===t.key}getAttributeParserByName(t){if("string"==typeof t)return"function"!=typeof this.constructor.attributes[t].parser?e=>"string"==typeof e?e:this.constructor.attributes[t].defaultValue:this.constructor.attributes[t].parser}getDefaultAttributeValueByName(t){if("string"==typeof t)return this.constructor.attributes[t].defaultValue}hasDefinedAttribute(t){return"string"==typeof t&&"object"==typeof this.constructor.attributes[t]}parseAttributeValueByName(t,e){return this.getAttributeParserByName(t)(e,this.constructor.attributes[t])}setStylesheet(t,e){if(e){e=`w-stylesheet-${e}`;const r=this.shadowRoot.querySelector(`#${e}`);r?a.Z.modify(r,{props:{textContent:t}}):a.Z.create("style",{props:{textContent:t,id:e}},this.shadowRoot)}else a.Z.create("style",{props:{textContent:t}},this.shadowRoot)}update(){}}function c(t){let e="w";return window.wconfig&&"string"==typeof window.wconfig.prefix&&(e=window.wconfig.prefix),`${e}-${t}`}const h=u},9406:(t,e,r)=>{r.r(e),r.d(e,{default:()=>i});var s=r(1835);class a extends s.ZP{static tagName="spa-link";static attributes={href:{name:"href",defaultValue:"",parser:(t,e)=>s.zu.parseStringAttr(t,e.defaultValue,/.*/)}};static get observedAttributes(){return this.getObservedAttributes(this.attributes)}constructor(){super()}init(){s.SO.create("slot",{events:{click:()=>{this.changePage()}}},this.shadowRoot)}changePage(){const t=window.wconfig.spa.basename+this.href;window.history.pushState({},t,t),document.querySelectorAll((0,s.OE)("spa-page")).forEach((e=>{e.setCurrent(e.match(t))}))}}const i=a}}]);