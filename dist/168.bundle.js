(self.webpackChunk_padax_w_components_project=self.webpackChunk_padax_w_components_project||[]).push([[168],{1835:(t,e,r)=>{r.d(e,{zu:()=>s,SO:()=>a.Z,ZP:()=>c,OE:()=>h});var s={};r.r(s),r.d(s,{parseBoolAttr:()=>n,parseIntAttr:()=>i,parseStringAttr:()=>o});var a=r(5359);function i(t,e,r,s){return t=parseInt(t),isNaN(t)||!isNaN(r)&&t<r||!isNaN(s)&&t>s?e:t}function n(t,e){return"true"===t||""===t||"false"!==t&&!!e}function o(t,e,r){return"string"!=typeof t?e:t.match(r)?t:e}class u extends HTMLElement{static getObservedAttributes(t){const e=Object.keys(t).filter((e=>!1!==t[e].observed)).map((e=>t[e].name));return Array.isArray(e)?e:[]}constructor(){super(),this.createGettersAndSetters(),this.attachShadow({mode:"open"}),this.setStylesheet(this.stylesheet),this.init(),this.key=(new Date).getTime()+Math.random()}attributeChangedCallback(t,e,r){e!==r&&this.key&&this.hasDefinedAttribute(t)&&this.update({name:t,oldValue:e,newValue:r})}createGettersAndSetters(){Array.isArray(this.constructor.observedAttributes)&&this.constructor.observedAttributes.forEach((t=>{Object.defineProperty(this,t,{get:()=>this.parseAttributeValueByName(t,this.getAttribute(t)),set:e=>{this.setAttribute(t,this.parseAttributeValueByName(t,`${e}`))}})}))}equals(t){return this.key===t.key}getAttributeParserByName(t){if("string"==typeof t)return"function"!=typeof this.constructor.attributes[t].parser?e=>"string"==typeof e?e:this.constructor.attributes[t].defaultValue:this.constructor.attributes[t].parser}getDefaultAttributeValueByName(t){if("string"==typeof t)return this.constructor.attributes[t].defaultValue}hasDefinedAttribute(t){return"string"==typeof t&&"object"==typeof this.constructor.attributes[t]}parseAttributeValueByName(t,e){return this.getAttributeParserByName(t)(e,this.constructor.attributes[t])}setStylesheet(t,e){if(e){e=`w-stylesheet-${e}`;const r=this.shadowRoot.querySelector(`#${e}`);r?a.Z.modify(r,{props:{textContent:t}}):a.Z.create("style",{props:{textContent:t,id:e}},this.shadowRoot)}else a.Z.create("style",{props:{textContent:t}},this.shadowRoot)}update(){}}function h(t){let e="w";return window.wconfig&&"string"==typeof window.wconfig.prefix&&(e=window.wconfig.prefix),`${e}-${t}`}const c=u},2168:(t,e,r)=>{r.r(e),r.d(e,{default:()=>i});var s=r(1835);class a extends s.ZP{static tagName="spa-page";static attributes={path:{name:"path",defaultValue:"",parser:(t,e)=>s.zu.parseStringAttr(t,e.defaultValue,/.*/)},exact:{name:"exact",defaultValue:!1,parser:(t,e)=>s.zu.parseBoolAttr(t,e.defaultValue)},current:{name:"current",defaultValue:!1,parser:(t,e)=>s.zu.parseBoolAttr(t,e.defaultValue)}};static get observedAttributes(){return this.getObservedAttributes(this.attributes)}constructor(){super(),window.addEventListener("popstate",(t=>{this.setCurrent(this.match(window.location.pathname))}))}init(){this.current=this.match(window.location.pathname),this.render()}update(t){this.render()}render(){if(this.current){const t=this.querySelector("template");null!==t&&(this.appendChild(t.content.cloneNode(!0)),t.remove())}const t={className:this.current?"show":"hide"};this.root?s.SO.modify(this.root,{props:t}):this.root=s.SO.create("slot",{props:t},this.shadowRoot),this.current?this.dispatchEvent(new Event("init")):this.dispatchEvent(new Event("dispose"))}match(t){return this.exact?t===window.wconfig.spa.basename+this.path:t.startsWith(window.wconfig.spa.basename+this.path)}setCurrent(t){this.current!==t&&(this.current=t)}}a.prototype.stylesheet="\n  slot.hide{\n    display:none;\n  }\n  slot.show{\n    display:block;\n  }\n";const i=a}}]);