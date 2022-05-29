import { DOM } from "../../WComponent.js";
import Dialog from "./Dialog.js";

const stylesheet=``;

class AlertDialog extends Dialog{  
  static tagName = 'alert-dialog';
  
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