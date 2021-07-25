import wc from './src/index.js';

wc.init();
// manipulate calendar
window.addEventListener('load', () => {
  const calendar=document.querySelector("wc-calendar");
  calendar.addEntry({date:"2021-05-27", content:"測試看看"});
  calendar.addEntry({date:"2021-05-27", content:"測試看看"});
  calendar.addEntry({date:"2021-05-20", content:"測試看看"});
});