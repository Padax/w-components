import { DOM } from "../../WComponent.js";
import Dialog from "./Dialog.js";

const stylesheet=``;

class AlertDialog extends Dialog{  
  static title = 'Alert Dialog';
  static description = 'Dialog for alert.';
  static tagName = 'alert';
  
  constructor(){
    super();
  }
  init(){
    super.init();
  }
  open(color){
    super.open({
      title:"",
      actions:{
        primary:{
          color
        }
      }
    })
  }
}
AlertDialog.prototype.stylesheet+=stylesheet;

DOM.defineCustomElement(AlertDialog);

export default AlertDialog;