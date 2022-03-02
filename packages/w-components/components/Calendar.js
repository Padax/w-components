import DateTime from "../util/DateTime.js";
import WComponent, { DOM } from "../WComponent.js";
const stylesheet=`
  :host {
    display: block;
  }
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
class Calendar extends WComponent{
  static NUMBER_NAMES=["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
  constructor(){
    super();
  }
  changeMonth(offset){
    this.calendarDate.setMonth(this.calendarDate.getMonth()+offset);
    this.update();
  }
  addEntry(entry){
    if(this.entries[entry.date]){
      this.entries[entry.date].push(entry);
    }else{
      this.entries[entry.date]=[entry];
    }
    this.update();
  }
  init(){
    // init fields
    this.calendar=null;
    this.calendarDate=new Date();
    this.entries={};
    // first render
    this.render();
  }
  update(){
    this.calendar.remove();
    this.render();
  }
  render(){
    // create calendar
    const calendar=DOM.create("div", {props:{
      className:"calendar"
    }});
    // create month bar
    const monthBar=DOM.create("div", {props:{
      className:"month"
    }}, calendar);
    DOM.create("div", {props:{
      className:"previous", textContent:"< 上個月"
    }, events:{
      click:()=>{
        this.changeMonth(-1)
      }
    }}, monthBar);
    DOM.create("div", {props:{
      className:"current", textContent:Calendar.NUMBER_NAMES[this.calendarDate.getMonth()]+"月 "+this.calendarDate.getFullYear()
    }}, monthBar);
    DOM.create("div", {props:{
      className:"next", textContent:"下個月 >"
    }, events:{
      click:()=>{
        this.changeMonth(1)
      }
    }}, monthBar);
    // create date cells
    const dateCells=DOM.create("div", {props:{
      className:"dates"
    }}, calendar);
    // create day names
    for(let i=0;i<7;i++){
      DOM.create("div", {props:{
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
    const element=DOM.create("div", {props:{
      className:"date"+(fade?" fade":"")
    }}, container);
    DOM.create("div", {props:{
      className:"number"+(today?" today":""), textContent:date.getDate()
    }}, element);
    const entriesContainer=DOM.create("div", {props:{
      className:"entries"
    }}, element);
    if(this.entries[DateTime.format(date)]){
      const entries=this.entries[DateTime.format(date)];
      entries.forEach((entry)=>{
        DOM.create("div", {props:{
          className:"entry", textContent:entry.content
        }}, entriesContainer);
      });
    }
    return element;
  }
}
Calendar.prototype.stylesheet=stylesheet;
export default Calendar;