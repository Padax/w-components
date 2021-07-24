/******/ "use strict";
/******/ var __webpack_modules__ = ({

/***/ "./src/WComponent.js":
/*!***************************!*\
  !*** ./src/WComponent.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "DOM": () => (/* reexport safe */ _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "PropParser": () => (/* reexport module object */ _util_PropParser_js__WEBPACK_IMPORTED_MODULE_1__)
/* harmony export */ });
/* harmony import */ var _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/DOM.js */ "./src/util/DOM.js");
/* harmony import */ var _util_PropParser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/PropParser.js */ "./src/util/PropParser.js");


class WComponent extends HTMLElement{
  constructor(stylesheet){
    super();
    this.attachShadow({ mode: 'open' });
    _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create('style', { props: { textContent: stylesheet } }, this.shadowRoot);
    this.componentWillRender();
    this.render();
    this.componentDidRender();
  }

  getDefaultValueByName(name) {
    if(typeof name !== 'string') {
      return undefined;
    }
    return this.constructor.defaultValues[name];
  }

  componentWillRender() {}
  componentDidRender() {}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WComponent);



/***/ }),

/***/ "./src/components/Button.js":
/*!**********************************!*\
  !*** ./src/components/Button.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../WComponent.js */ "./src/WComponent.js");
/* harmony import */ var _WComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../WComponent.js */ "./src/util/PropParser.js");
/* harmony import */ var _WComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../WComponent.js */ "./src/util/DOM.js");

const stylesheet=`
  button{
    display:inline-block;vertical-align:middle;box-sizing:border-box;
    font-family:var(--font-family);
    font-size:var(--font-size-normal);line-height:var(--line-height-normal);
    border-width:1px;border-color:var(--color-primary-60);border-style:solid;border-radius:4px;
    background-color:var(--color-primary-60);color:var(--color-gray-0);
    padding:4px 20px;
    cursor:pointer;
    cursor:pointer;transition:background-color 0.2s, border-color 0.2s;
  }
  button:hover{
    background-color:var(--color-primary-40);
    border-color:var(--color-primary-40);
  }
  button:active{
    background-color:var(--color-primary-70);
    border-color:var(--color-primary-70);
  }
  button.critical{
    background-color:var(--color-critical-60);
    border-color:var(--color-critical-60);
  }
  button.critical:hover{
    background-color:var(--color-critical-40);
    border-color:var(--color-critical-40);
  }
  button.critical:active{
    background-color:var(--color-critical-70);
    border-color:var(--color-critical-70);
  }
  /* outline */
  button.outline-primary{
    background-color:transparent;
    border-color:var(--color-primary-60);
    border-width:1px;
    color:var(--color-primary-60);
  }
  button.outline-primary:hover{
    background-color:var(--color-primary-10);
  }
  button.outline-primary:active{
    background-color:var(--color-primary-20);
  }
  button.outline-critical{
    background-color:transparent;
    border-color:var(--color-critical-60);
    border-width:1px;
    color:var(--color-critical-60);
  }
  button.outline-critical:hover{
    background-color:var(--color-critical-10);
  }
  button.outline-critical:active{
    background-color:var(--color-critical-20);
  }
  /* disabled */
  button:disabled{
    color:var(--color-gray-30);background-color:var(--color-gray-10);
    border-color:var(--color-gray-10);
    cursor:default;
  }
  button:disabled:hover, button:disabled:active{
    color:var(--color-gray-30);background-color:var(--color-gray-10);
    border-color:var(--color-gray-10);
  }
  /* size */
  button.xlarge{
    font-size:calc(var(--font-size-normal) * 1.5);
    line-height:calc(var(--line-height-normal) * 1.5);
    padding:6px 32px;
  }
  button.large{
    font-size:calc(var(--font-size-normal) * 1.25);
    line-height:calc(var(--line-height-normal) * 1.25);
    padding:4px 24px;
  }
  button.small{
    font-size:calc(var(--font-size-normal) * 0.875);
    line-height:calc(var(--line-height-normal) * 0.875);
    padding:4px 12px;
  }
  /* block */
  button.block{
    display:block;width:100%;
  }
`;
class Button extends _WComponent_js__WEBPACK_IMPORTED_MODULE_0__.default{
  static defaultValues={
    disabled:false,
    color:"primary",
    outlined:false,
    size:"normal",
    display:"inline-block"
  };
  constructor(){
    super(stylesheet);
  }
  render(){
    const classList=[];
    const display=_WComponent_js__WEBPACK_IMPORTED_MODULE_1__.parseStringProp(
      this.getAttribute("display"),
      this.getDefaultValueByName("display"),
      /inline-block|block/
    );
    const size=_WComponent_js__WEBPACK_IMPORTED_MODULE_1__.parseStringProp(
      this.getAttribute("size"),
      this.getDefaultValueByName("size"),
      /small|normal|large|xlarge/
    );
    const outlined=_WComponent_js__WEBPACK_IMPORTED_MODULE_1__.parseBoolProp(
      this.getAttribute("outlined"),
      this.getDefaultValueByName("outlined")
    );
    const color=_WComponent_js__WEBPACK_IMPORTED_MODULE_1__.parseStringProp(
      this.getAttribute("color"),
      this.getDefaultValueByName("color"),
      /primary|critical/
    );
    classList.push(display, size, outlined?"outline-"+color:color);
    const disabled=_WComponent_js__WEBPACK_IMPORTED_MODULE_1__.parseBoolProp(
      this.getAttribute("disabled"),
      this.getDefaultValueByName("disabled")
    );
    const attrs={};
    if(disabled){
      attrs["disabled"]=true;
    }
    _WComponent_js__WEBPACK_IMPORTED_MODULE_2__.default.create("button", {props:{textContent:this.textContent, className:classList.join(" ")}, attrs:attrs}, this.shadowRoot);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),

/***/ "./src/components/Calendar.js":
/*!************************************!*\
  !*** ./src/components/Calendar.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/DOM.js */ "./src/util/DOM.js");
/* harmony import */ var _util_DateTime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/DateTime.js */ "./src/util/DateTime.js");


const stylesheet=`
  .calendar{}
  .calendar>.month{
    display:flex;
    width:100%;margin:20px 0px;
  }
  .calendar>.month>.previous{
    flex:none;width:100px;text-align:left;cursor:pointer;
  }
  .calendar>.month>.current{
    flex:auto;text-align:center;font-weight:bold;
  }
  .calendar>.month>.next{
    flex:none;width:100px;text-align:right;cursor:pointer;
  }
  .calendar>.dates{
    display:flex;flex-wrap:wrap;
    justify-content:center;
    border-right:1px solid #cccccc;
    border-bottom:1px solid #cccccc;
  }
  .calendar>.dates>.date{
    box-sizing:border-box;padding:5px;
    flex:auto;width:14%;height:150px;text-align:left;
    display:flex;flex-direction:column;
    font-size:0.8rem;
    border:1px solid #cccccc;border-right-width:0px;border-bottom-width:0px;
  }
  .calendar>.dates>.day{
    height:auto;font-weight:bold;
  }
  .calendar>.dates>.fade{
    opacity:0.5;
  }
  .calendar>.dates>.date>.number{
    flex:none;width:100%;height:25px;line-height:25px;
    font-weight:bold;
  }
  .calendar>.dates>.date>.today{
    border-radius:50%;width:25px;height:25px;
    background-color:#000000;color:#eeeeee;text-align:center;
  }
  .calendar>.dates>.date>.entries{
    flex:auto;width:100%;overflow-y:auto;
  }
  .calendar>.dates>.date>.entries>.entry{
    display:flex;
    color:#eeeeee;padding:5px;margin:5px;margin-left:0px;
    cursor:pointer;
  }
  .calendar>.dates>.date>.entries>.entry:nth-child(5n+1){
    background-color:#0099e0;
  }
  .calendar>.dates>.date>.entries>.entry:nth-child(5n+2){
    background-color:#7788cc;
  }
  .calendar>.dates>.date>.entries>.entry:nth-child(5n+3){
    background-color:#3855B8;
  }
  .calendar>.dates>.date>.entries>.entry:nth-child(5n+4){
    background-color:#A89990;
  }
  .calendar>.dates>.date>.entries>.entry:nth-child(5n){
    background-color:#223344;
  }
  .calendar>.dates>.date>.entries>.entry>.name{
    flex:auto;
  }
  .calendar>.dates>.date>.entries>.entry>.hour{
    flex:none;width:40px;text-align:right;
  }
`;
class Calendar extends HTMLElement{
  static NUMBER_NAMES=["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
  constructor(){
    super();
    this.attachShadow({mode:"open"});
    _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("style", {props:{textContent:stylesheet}}, this.shadowRoot);
    this.calendar=null;
    this.calendarDate=new Date();
    this.entries={};
    this.render();
  }
  changeMonth(offset){
    this.calendarDate.setMonth(this.calendarDate.getMonth()+offset);
    this.render();
  }
  addEntry(entry){
    if(this.entries[entry.date]){
      this.entries[entry.date].push(entry);
    }else{
      this.entries[entry.date]=[entry];
    }
    this.render();
  }
  render(){
    if(this.calendar!==null){
      this.calendar.remove();
    }
    // create calendar
    const calendar=_util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("div", {props:{
      className:"calendar"
    }});
    // create month bar
    const monthBar=_util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("div", {props:{
      className:"month"
    }}, calendar);
    _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("div", {props:{
      className:"previous", textContent:"< 上個月"
    }, events:{
      click:()=>{
        this.changeMonth(-1)
      }
    }}, monthBar);
    _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("div", {props:{
      className:"current", textContent:Calendar.NUMBER_NAMES[this.calendarDate.getMonth()]+"月 "+this.calendarDate.getFullYear()
    }}, monthBar);
    _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("div", {props:{
      className:"next", textContent:"下個月 >"
    }, events:{
      click:()=>{
        this.changeMonth(1)
      }
    }}, monthBar);
    // create date cells
    const dateCells=_util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("div", {props:{
      className:"dates"
    }}, calendar);
    // create day names
    for(let i=0;i<7;i++){
      _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("div", {props:{
        className:"date day", textContent:"週"+Calendar.NUMBER_NAMES[i]
      }}, dateCells);
    }
    // create dates
    let now=new Date();
    let year=this.calendarDate.getFullYear();
    let month=this.calendarDate.getMonth();
    let lastDate=(new Date(year, month+1, 0));
    let firstDate=new Date(year, month, 1);
    // build days of last month
    let date, dateElement;
    for(let i=-firstDate.getDay();i<0;i++){
      date=new Date(year, month, i+1);
      dateElement=this.renderDate(date, now, dateCells);
    }
    // build days
    const maxDate=lastDate.getDate();
    for(let i=1;i<=maxDate;i++){
      date=new Date(year, month, i);
      dateElement=this.renderDate(date, now, dateCells);
    }
    // build days of next month
    let dateCount=1;
    for(let i=lastDate.getDay()+1;i<=6;i++){
      date=new Date(year, month+1, dateCount);
      dateElement=this.renderDate(date, now, dateCells);
      dateCount++;
    }
    this.calendar=calendar;
    this.shadowRoot.appendChild(this.calendar);
  }
  renderDate(date, now, container){
    const fade=date.getMonth()!==this.calendarDate.getMonth();
    const today=(
      date.getFullYear()===now.getFullYear() &&
      date.getMonth()===now.getMonth() &&
      date.getDate()===now.getDate()
    );
    const element=_util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("div", {props:{
      className:"date"+(fade?" fade":"")
    }}, container);
    _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("div", {props:{
      className:"number"+(today?" today":""), textContent:date.getDate()
    }}, element);
    const entriesContainer=_util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("div", {props:{
      className:"entries"
    }}, element);
    if(this.entries[_util_DateTime_js__WEBPACK_IMPORTED_MODULE_1__.default.format(date)]){
      const entries=this.entries[_util_DateTime_js__WEBPACK_IMPORTED_MODULE_1__.default.format(date)];
      entries.forEach((entry)=>{
        _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("div", {props:{
          className:"entry", textContent:entry.content
        }}, entriesContainer);
      });
    }
    return element;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Calendar);

/***/ }),

/***/ "./src/components/Code.js":
/*!********************************!*\
  !*** ./src/components/Code.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../WComponent.js */ "./src/WComponent.js");
/* harmony import */ var _WComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../WComponent.js */ "./src/util/PropParser.js");
/* harmony import */ var _WComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../WComponent.js */ "./src/util/DOM.js");
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! highlight.js */ "./node_modules/highlight.js/es/index.js");



const stylesheet = `
`;
class Code extends _WComponent_js__WEBPACK_IMPORTED_MODULE_1__.default{
  constructor(){
    super(stylesheet);
  }
  static defaultValues = {
    lang: 'javascript'
  };

  render() {
    const block = _WComponent_js__WEBPACK_IMPORTED_MODULE_2__.parseBoolProp(
      this.getAttribute('block'), this.getDefaultValueByName('block')
    );
    const props = {
      textContent: this.textContent
    };

    let container = this.shadowRoot;
    if(block) {
      container = _WComponent_js__WEBPACK_IMPORTED_MODULE_3__.default.create('pre', {}, this.shadowRoot);
    }
    _WComponent_js__WEBPACK_IMPORTED_MODULE_3__.default.create('code', { props }, container);
  }
  componentDidRender() {
    highlight_js__WEBPACK_IMPORTED_MODULE_0__.default.highlightElement(document.querySelector('code'));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Code);

/***/ }),

/***/ "./src/components/Dialog.js":
/*!**********************************!*\
  !*** ./src/components/Dialog.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/DOM.js */ "./src/util/DOM.js");

const stylesheet=`
  .dialog{
    width:300px;
    position:fixed;left:calc(50% - 150px);top:100px;
    z-index:10;
  }
  .dialog>::slotted(.head){
    background-color:#333333;color:#ffffff;padding:10px;
  }
  .dialog>::slotted(.main){
    padding:10px;background-color:#dddddd;
  }
`;
class Dialog extends HTMLElement{
  static get observedAttributes(){
      return ["open"];
  }
  constructor(){
    super();
    this.attachShadow({mode:"open"});
    _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("style", {props:{textContent:stylesheet}}, this.shadowRoot);
    this.dialog=_util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("div", {props:{className:"dialog"}});
    this.head=_util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("slot", {props:{name:"head"}}, this.dialog);
    this.main=_util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("slot", {props:{name:"main"}}, this.dialog);
  }
  connectedCallback(){}
  attributeChangedCallback(name, oldValue, newValue){
    if(name==="open"){
      if(newValue==="true"){
        this.shadowRoot.appendChild(this.dialog);
      }else{
        this.dialog.remove();
      }
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dialog);

/***/ }),

/***/ "./src/components/DisplayHeading.js":
/*!******************************************!*\
  !*** ./src/components/DisplayHeading.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Heading_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Heading.js */ "./src/components/Heading.js");

const stylesheet = `
  h1 { 
    font-size: 5.5rem;
    line-height: calc(5.5rem * var(--line-height-normal-ratio)); 
  }
  h2 { 
    font-size: 5rem;
    line-height: calc(5rem * var(--line-height-normal-ratio)); 
  }
  h3 { 
    font-size: 4.5rem;
    line-height: calc(4.5rem * var(--line-height-normal-ratio)); 
  }
  h4 { 
    font-size: 4rem;
    line-height: calc(4rem * var(--line-height-normal-ratio)); 
  }
  h5 { 
    font-size: 3.5rem; 
    line-height: calc(3.5rem * var(--line-height-normal-ratio)); 
  }
  h6 { 
    font-size: 3rem; 
    line-height: calc(3rem * var(--line-height-normal-ratio)); 
  }
  .heading { 
    font-weight: var(--font-weight-light);
    margin: 0; 
  }
  .underlined { 
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--color-gray-20);
  }
`;
class DisplayHeading extends _Heading_js__WEBPACK_IMPORTED_MODULE_0__.default{
  constructor(){
    super(stylesheet);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisplayHeading);

/***/ }),

/***/ "./src/components/Heading.js":
/*!***********************************!*\
  !*** ./src/components/Heading.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../WComponent.js */ "./src/WComponent.js");
/* harmony import */ var _WComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../WComponent.js */ "./src/util/PropParser.js");
/* harmony import */ var _WComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../WComponent.js */ "./src/util/DOM.js");

const stylesheet = `
  h1 { 
    font-size: 2.5rem; 
    font-weight: var(--font-weight-medium);
    line-height: calc(2.5rem * var(--line-height-normal-ratio)); 
  }
  h2 { 
    font-size: 2rem; 
    font-weight: var(--font-weight-medium);
    line-height: calc(2rem * var(--line-height-normal-ratio));  
  }
  h3 { 
    font-size: 1.5rem; 
    font-weight: var(--font-weight-regular);
    line-height: calc(1.5rem * var(--line-height-normal-ratio)); 
  }
  h4 { 
    font-size: 1.25rem; 
    font-weight: var(--font-weight-regular);
    line-height: calc(1.25rem * var(--line-height-normal-ratio)); 
  }
  h5 { 
    font-size: 1rem; 
    font-weight: var(--font-weight-regular);
    line-height: calc(1rem * var(--line-height-normal-ratio)); 
  }
  h6 { 
    font-size: .875rem; 
    font-weight: var(--font-weight-regular);
    line-height: calc(.875rem * var(--line-height-normal-ratio)); 
  }
  .heading { margin: 0; }
  .underlined { 
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--color-gray-20);
  }
`;
class Heading extends _WComponent_js__WEBPACK_IMPORTED_MODULE_0__.default{
  constructor(extendStylesheet){
    super(typeof extendStylesheet === 'string' ? extendStylesheet : stylesheet);
  }
  static defaultValues = {
    level: 5,
    underlined: false
  };

  render() {
    const level = _WComponent_js__WEBPACK_IMPORTED_MODULE_1__.parseIntProp(
      this.getAttribute('level'), this.getDefaultValueByName('level'), 1, 6);
    const underlined = _WComponent_js__WEBPACK_IMPORTED_MODULE_1__.parseBoolProp(
      this.getAttribute('underlined'), this.getDefaultValueByName('underlined')
    );
    
    const props = {
      className: `heading${underlined ? ' underlined' : ''}`,
      textContent: this.textContent
    };
    _WComponent_js__WEBPACK_IMPORTED_MODULE_2__.default.create(`h${level}`, { props }, this.shadowRoot);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Heading);

/***/ }),

/***/ "./src/components/List.js":
/*!********************************!*\
  !*** ./src/components/List.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../WComponent.js */ "./src/WComponent.js");
/* harmony import */ var _WComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../WComponent.js */ "./src/util/DOM.js");
/* harmony import */ var _WComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../WComponent.js */ "./src/util/PropParser.js");

const stylesheet=`
  :host>div.list{
    border:1px solid var(--color-gray-20);
    border-radius:4px;
    margin:1rem 0px;
  }
  :host>div.list>.item{
    padding:0.5rem;
    border-bottom:1px solid var(--color-gray-20);
  }
  :host>div.list>.item:last-child{
    border-bottom-width:0px;
  }
`;
class List extends _WComponent_js__WEBPACK_IMPORTED_MODULE_0__.default{
  static defaultValues={
    mark:"none"
  };
  constructor(){
    super(stylesheet);
  }
  render(){
    const attrs={};
    for(let i=0;i<this.attributes.length;i++){
      attrs[this.attributes[i].name]=this.attributes[i].value;
    }
    const list=_WComponent_js__WEBPACK_IMPORTED_MODULE_1__.default.create("div", {props:{className:"list"}, attrs:attrs}, this.shadowRoot);
    // append all child nodes to basic components
    const mark=_WComponent_js__WEBPACK_IMPORTED_MODULE_2__.parseStringProp(
      this.getAttribute("mark"),
      this.getDefaultValueByName("mark"),
      /none|circle|number/
    );
    const items=this.querySelectorAll(".item");
    items.forEach((item, index)=>{
      let markChar="";
      switch(mark){
        case "circle":
          markChar=this.getCircleChar();
          break;
        case "number":
          markChar=this.getNumberChar(index);
          break;
      }
      item.textContent=markChar+" "+item.textContent;
      list.appendChild(item);
    });
  }
  getCircleChar(){
    return "●";
  }
  getNumberChar(index){
    return (index+1)+".";
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (List);

/***/ }),

/***/ "./src/components/Nav.js":
/*!*******************************!*\
  !*** ./src/components/Nav.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/DOM.js */ "./src/util/DOM.js");

const stylesheet=`
  :host{
    padding:15px;
    position:sticky;top:0px;left:0px;
    background-color:#ffffff;
  }
`;
class Nav extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:"open"});
    _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("style", {props:{textContent:stylesheet}}, this.shadowRoot);
    _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("slot", {props:{
      name:"left"
    }}, this.shadowRoot);
    _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("slot", {props:{
      name:"center"
    }}, this.shadowRoot);
    _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create("slot", {props:{
      name:"right"
    }}, this.shadowRoot);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Nav);

/***/ }),

/***/ "./src/components/Quote.js":
/*!*********************************!*\
  !*** ./src/components/Quote.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/DOM.js */ "./src/util/DOM.js");

const stylesheet = `
  .left { text-align: left; }
  .center { text-align: center; }
  .right { text-align: right; }
  .source {
    font-size: var(--font-size-small);
    line-height: calc(var(--font-size-small) * var(--line-height-ratio));
    color: var(--color-gray-60);
  }
  .source:before {
    content: '— '
  }
`;
class Quote extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }
  static defaultValues = {
    align: 'left'
  };

  getDefaultValueByName(name) {
    return this.constructor.defaultValues[name];
  }
  /**
   * Parse align attribute to a valid value
   * @param {string} align 
   * @returns {string} Alignment class name
   */
   parseAlign(align = this.getAttribute('align')) {
    if(align == 'left' || align == 'center' || align == 'right') {
      return align;
    }
    return this.getDefaultValueByName('align');
  }

  render() {
    _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create('style', { props: { textContent: stylesheet } }, this.shadowRoot);

    const container = _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create('div', { props: { className: this.parseAlign() } }, this.shadowRoot);
    
    const quoteContainer = _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create('div', {}, container);
    _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create('slot', { props: { name: 'quote' } }, quoteContainer);

    if(this.querySelector('[slot="source"]')) {
      const sourceContainer = _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create('div', { props: { className: 'source' } }, container);
      _util_DOM_js__WEBPACK_IMPORTED_MODULE_0__.default.create('slot', { props: { name: 'source' } }, sourceContainer);
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Quote);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_DOM_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./util/DOM.js */ "./src/util/DOM.js");
/* harmony import */ var _components_Nav_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Nav.js */ "./src/components/Nav.js");
/* harmony import */ var _components_Button_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Button.js */ "./src/components/Button.js");
/* harmony import */ var _components_Dialog_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Dialog.js */ "./src/components/Dialog.js");
/* harmony import */ var _components_Calendar_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Calendar.js */ "./src/components/Calendar.js");
/* harmony import */ var _components_Heading_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Heading.js */ "./src/components/Heading.js");
/* harmony import */ var _components_DisplayHeading_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/DisplayHeading.js */ "./src/components/DisplayHeading.js");
/* harmony import */ var _components_Quote_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Quote.js */ "./src/components/Quote.js");
/* harmony import */ var _components_List_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/List.js */ "./src/components/List.js");
/* harmony import */ var _components_Code_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/Code.js */ "./src/components/Code.js");










const wc={
  init:function(prefix="wc"){
    this.initTheme();
    window.customElements.define(prefix+"-nav", _components_Nav_js__WEBPACK_IMPORTED_MODULE_0__.default);
    window.customElements.define(prefix+"-button", _components_Button_js__WEBPACK_IMPORTED_MODULE_1__.default);
    window.customElements.define(prefix+"-dialog", _components_Dialog_js__WEBPACK_IMPORTED_MODULE_2__.default);
    window.customElements.define(prefix+"-calendar", _components_Calendar_js__WEBPACK_IMPORTED_MODULE_3__.default);
    window.customElements.define(prefix+"-heading", _components_Heading_js__WEBPACK_IMPORTED_MODULE_4__.default);
    window.customElements.define(prefix+"-display-heading", _components_DisplayHeading_js__WEBPACK_IMPORTED_MODULE_5__.default);
    window.customElements.define(prefix+"-quote", _components_Quote_js__WEBPACK_IMPORTED_MODULE_6__.default);
    window.customElements.define(prefix+"-list", _components_List_js__WEBPACK_IMPORTED_MODULE_7__.default);
    window.customElements.define(prefix+"-code", _components_Code_js__WEBPACK_IMPORTED_MODULE_8__.default);
  },
  initTheme:function(){
    _util_DOM_js__WEBPACK_IMPORTED_MODULE_9__.default.create("link", {props:{
      rel:"stylesheet", type:"text/css", href:"src/theme/light.css"
    }}, document.querySelector("head"));
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (wc);

/***/ }),

/***/ "./src/util/DOM.js":
/*!*************************!*\
  !*** ./src/util/DOM.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const DOM={
  create:function(tagName, settings, parentElement){
    const element=document.createElement(tagName);
    this.modify(element, settings);
    if(parentElement instanceof Element || parentElement instanceof DocumentFragment){
      parentElement.appendChild(element);
    }
    return element;
  },
  modify:function(selectorOrElement, settings){
    const element=(typeof selectorOrElement==="string"?this.get(selectorOrElement):selectorOrElement);
    if(settings.props){
      this.setProperties(element, settings.props);
    }
    if(settings.attrs){
      this.setAttributes(element, settings.attrs);
    }
    if(settings.styles){
      this.setStyles(element, settings.styles);
    }
    if(settings.events){
      this.addListeners(element, settings.events);
    }
    return element;
  },
  replace:function(element, parentElement){
    if(parentElement instanceof Element || parentElement instanceof DocumentFragment){
      parentElement.appendChild(element);
    }
    return element;
  },
  setProperties:function(element, properties){
    for(const name in properties){
      element[name]=properties[name];
    }
    return element;
  },
  setAttributes:function(element, attributes){
    for(const name in attributes){
      element.setAttribute(name, attributes[name]);
    }
    return element;
  },
  setStyles:function(element, styles){
    for(const name in styles){
      element.style[name]=styles[name];
    }
    return element;
  },
  addListeners:function(selectorOrElement, listeners, useCapture){
    const element=(typeof selectorOrElement==="string"?this.get(selectorOrElement):selectorOrElement);
    for(const name in listeners){
      if(listeners[name] instanceof Array){
        listeners[name].forEach((handler)=>{
          element.addEventListener(name, handler, useCapture);
        });
      }else{
        element.addEventListener(name, listeners[name], useCapture);
      }
    }
    return element;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOM);

/***/ }),

/***/ "./src/util/DateTime.js":
/*!******************************!*\
  !*** ./src/util/DateTime.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const DateTime={
  format:function(d){
    let year=d.getFullYear();
    let month=d.getMonth()+1;
    let date=d.getDate();
    return year+"-"+(month>9?month:"0"+month)+"-"+(date>9?date:"0"+date);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DateTime);

/***/ }),

/***/ "./src/util/PropParser.js":
/*!********************************!*\
  !*** ./src/util/PropParser.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseIntProp": () => (/* binding */ parseIntProp),
/* harmony export */   "parseBoolProp": () => (/* binding */ parseBoolProp),
/* harmony export */   "parseStringProp": () => (/* binding */ parseStringProp)
/* harmony export */ });
/**
 * Parse property to a valid integer value
 * @param {string} value - Property value to be parsed
 * @param {int} defaultValue - Default value to be returned if value is invalid. 
 *  Will be casted to integer before return.
 * @param {number} min - Min value
 * @param {number} max - Max value
 * @returns {int}
 */
function parseIntProp(value, defaultValue, min, max) {
  value = parseInt(value);
  if(isNaN(value)) {
    return defaultValue;
  }
  if(!isNaN(min) && value < min) {
    return defaultValue;
  }
  if(!isNaN(max) && value > max) {
    return defaultValue
  }
  return value;
}

/**
 * Parse property to a valid boolean value
 * @param {string} value - Property value to be parsed 
 * @param {boolean} defaultValue - Default value to be returned if value is invalid. 
 *  Will be casted to boolean before return.
 * @returns {boolean}
 */
function parseBoolProp(value, defaultValue) {
  if(value === 'true' || value === '') {
    return true;
  }
  if(value === 'false') {
    return false;
  }
  return !!defaultValue;
}

/**
 * Parse property to a valid string value
 * @param {string} value - Property value to be parsed 
 * @param {boolean} defaultValue - Default value to be returned if value is invalid. 
 * @param {RegExp} regExp - Regular expression
 *  Will be casted to string before return.
 * @returns {string}
 */
function parseStringProp(value, defaultValue, regExp) {
  if(typeof value !== "string"){
    return defaultValue;
  }
  if(value.match(regExp)){
    return value;
  }else{
    return defaultValue;
  }
}

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/******/ // expose the modules object (__webpack_modules__)
/******/ __webpack_require__.m = __webpack_modules__;
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/chunk loaded */
/******/ (() => {
/******/ 	var deferred = [];
/******/ 	__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 		if(chunkIds) {
/******/ 			priority = priority || 0;
/******/ 			for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 			deferred[i] = [chunkIds, fn, priority];
/******/ 			return;
/******/ 		}
/******/ 		var notFulfilled = Infinity;
/******/ 		for (var i = 0; i < deferred.length; i++) {
/******/ 			var [chunkIds, fn, priority] = deferred[i];
/******/ 			var fulfilled = true;
/******/ 			for (var j = 0; j < chunkIds.length; j++) {
/******/ 				if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 					chunkIds.splice(j--, 1);
/******/ 				} else {
/******/ 					fulfilled = false;
/******/ 					if(priority < notFulfilled) notFulfilled = priority;
/******/ 				}
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferred.splice(i--, 1)
/******/ 				var r = fn();
/******/ 				if (r !== undefined) result = r;
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/jsonp chunk loading */
/******/ (() => {
/******/ 	// no baseURI
/******/ 	
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/ 	
/******/ 	// no chunk on demand loading
/******/ 	
/******/ 	// no prefetching
/******/ 	
/******/ 	// no preloaded
/******/ 	
/******/ 	// no HMR
/******/ 	
/******/ 	// no HMR manifest
/******/ 	
/******/ 	__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 	
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 		var [chunkIds, moreModules, runtime] = data;
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0;
/******/ 		for(moduleId in moreModules) {
/******/ 			if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 				__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(runtime) var result = runtime(__webpack_require__);
/******/ 		if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				installedChunks[chunkId][0]();
/******/ 			}
/******/ 			installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return __webpack_require__.O(result);
/******/ 	}
/******/ 	
/******/ 	var chunkLoadingGlobal = self["webpackChunkw_component"] = self["webpackChunkw_component"] || [];
/******/ 	chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 	chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module depends on other loaded chunks and execution need to be delayed
/******/ var __webpack_exports__ = __webpack_require__.O(undefined, ["shared"], () => (__webpack_require__("./src/index.js")))
/******/ __webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ var __webpack_exports__default = __webpack_exports__.default;
/******/ export { __webpack_exports__default as default };
/******/ 
