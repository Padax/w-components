import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
import Dialog from "./Dialog.js";
const stylesheet=`
  .dialog>.head{
    background-color:var(--color-critical-80)
  }
  .dialog>slot{
    background-color:var(--color-critical-20)
  }
  .dialog>.footer{
    background-color:var(--color-critical-20);
  }
`;
class AlertDialog extends Dialog{
  constructor(){
    super();
  }
  init(){
    super.init();
    DOM.create("w-button", {attrs:{
      size:"sm", color:"critical"
    }, props:{
      textContent:"OK"
    }, events:{
      click:this.close.bind(this)
    }}, this.footer);
  }
  update({ name, oldValue, newValue }){
    super.update({ name, oldValue, newValue });
  }
}
AlertDialog.prototype.stylesheet+=stylesheet;
export default AlertDialog;